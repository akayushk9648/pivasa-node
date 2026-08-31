"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db, adminUsers } from "@/db";
import { eq, or } from "drizzle-orm";
import { verifyPassword, createSessionToken } from "@/lib/auth/security";
import { ensureAdminTableAndSeed } from "@/lib/auth/admin-init";
import { logError, logInfo } from "@/lib/logger";

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;

export async function login(formData: FormData) {
  const rawEmail = formData.get("email") as string;
  const password = formData.get("password") as string;

  const email = rawEmail?.trim().toLowerCase();

  if (!email || !password) {
    redirect("/login?message=Email and password are required");
  }

  // Ensure table & seed exist
  await ensureAdminTableAndSeed();

  const targetEmail = (email === "admin" || email === "admin@pivasa.com" || email === "pivasapower@gmail.com") 
    ? "admin@pivasapower.com" 
    : email;

  // 1. Query admin user from PostgreSQL database using direct select
  let admin: typeof adminUsers.$inferSelect | undefined;

  try {
    const results = await db
      .select()
      .from(adminUsers)
      .where(or(eq(adminUsers.email, targetEmail), eq(adminUsers.email, email)))
      .limit(1);

    admin = results[0];
  } catch (queryErr: any) {
    logError(queryErr, { route: "/login", action: "Query adminUsers table" }, "DATABASE_ERROR");
  }

  if (!admin) {
    logError(
      new Error(`Failed admin login attempt: Unknown email '${email}'`),
      { route: "/login", action: "Admin Login Failed" },
      "AUTH_ERROR"
    );
    redirect("/login?message=Invalid admin credentials");
  }

  // 3. Check if account is locked
  if (admin.lockedUntil && new Date() < new Date(admin.lockedUntil)) {
    const remainingMinutes = Math.ceil(
      (new Date(admin.lockedUntil).getTime() - Date.now()) / (1000 * 60)
    );
    redirect(
      `/login?message=Account temporarily locked due to excessive failed attempts. Please try again in ${remainingMinutes} minute(s).`
    );
  }

  // 4. Cryptographically verify password hash
  const isValid = verifyPassword(password, admin.salt, admin.passwordHash);

  if (!isValid) {
    const nextFailedCount = (admin.failedAttempts || 0) + 1;
    const isNowLocked = nextFailedCount >= MAX_FAILED_ATTEMPTS;
    const lockedUntil = isNowLocked ? new Date(Date.now() + LOCKOUT_MINUTES * 60 * 1000) : null;

    try {
      await db
        .update(adminUsers)
        .set({
          failedAttempts: nextFailedCount,
          lockedUntil,
          updatedAt: new Date(),
        })
        .where(eq(adminUsers.id, admin.id));
    } catch (err) {
      // Ignore
    }

    logError(
      new Error(`Failed password attempt for admin: '${email}'. Attempt ${nextFailedCount}/${MAX_FAILED_ATTEMPTS}`),
      { route: "/login", action: "Admin Password Mismatch" },
      "AUTH_ERROR"
    );

    if (isNowLocked) {
      redirect(
        `/login?message=Too many failed login attempts. Account locked for ${LOCKOUT_MINUTES} minutes.`
      );
    } else {
      const remaining = MAX_FAILED_ATTEMPTS - nextFailedCount;
      redirect(
        `/login?message=Invalid password. ${remaining} attempt(s) remaining before lockout.`
      );
    }
  }

  // 5. Reset lock/failed attempts and record login timestamp
  try {
    await db
      .update(adminUsers)
      .set({
        failedAttempts: 0,
        lockedUntil: null,
        lastLoginAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(adminUsers.id, admin.id));
  } catch (err) {
    // Ignore
  }

  logInfo(`Admin successfully authenticated: '${admin.email}'`);

  // 6. Generate tamper-proof cryptographically signed HMAC-SHA256 session token
  const sessionToken = await createSessionToken(admin.id, admin.email, admin.role, 7);

  const cookieStore = cookies();
  cookieStore.set("pivasa_admin_session", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  revalidatePath("/", "layout");
  redirect("/admin/dashboard");
}

export async function signout() {
  const cookieStore = cookies();
  cookieStore.delete("pivasa_admin_session");
  revalidatePath("/", "layout");
  redirect("/login");
}
