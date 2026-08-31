"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db, adminUsers, getClient } from "@/db";
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

  // 1. Ensure table & seed exist
  await ensureAdminTableAndSeed();

  const targetEmail = (email === "admin" || email === "admin@pivasa.com" || email === "pivasapower@gmail.com")
    ? "admin@pivasapower.com"
    : email;

  // 2. Fetch admin user directly from Supabase PostgreSQL database
  let admin: any = null;

  try {
    const sql = getClient();
    const rows = await sql`
      SELECT id, email, full_name, password_hash, salt, role, failed_attempts, locked_until, last_login_at
      FROM public.admin_users
      WHERE lower(email) = ${targetEmail} OR lower(email) = ${email}
      LIMIT 1;
    `;

    if (rows && rows.length > 0) {
      admin = {
        id: rows[0].id,
        email: rows[0].email,
        fullName: rows[0].full_name,
        passwordHash: rows[0].password_hash,
        salt: rows[0].salt,
        role: rows[0].role,
        failedAttempts: rows[0].failed_attempts,
        lockedUntil: rows[0].locked_until,
        lastLoginAt: rows[0].last_login_at,
      };
    }
  } catch (sqlErr: any) {
    logError(sqlErr, { route: "/login", action: "Query admin_users via SQL" }, "DATABASE_ERROR");
  }

  // Fallback to Drizzle ORM query
  if (!admin) {
    try {
      const results = await db
        .select()
        .from(adminUsers)
        .where(or(eq(adminUsers.email, targetEmail), eq(adminUsers.email, email)))
        .limit(1);

      if (results && results.length > 0) {
        const r = results[0];
        admin = {
          id: r.id,
          email: r.email,
          fullName: r.fullName,
          passwordHash: r.passwordHash,
          salt: r.salt,
          role: r.role,
          failedAttempts: r.failedAttempts,
          lockedUntil: r.lockedUntil,
          lastLoginAt: r.lastLoginAt,
        };
      }
    } catch (drizzleErr: any) {
      logError(drizzleErr, { route: "/login", action: "Query admin_users via Drizzle" }, "DATABASE_ERROR");
    }
  }

  if (!admin) {
    logError(
      new Error(`Failed admin login attempt: Unknown email '${email}'`),
      { route: "/login", action: "Admin Login Failed" },
      "AUTH_ERROR"
    );
    redirect("/login?message=Invalid admin credentials");
  }

  // 3. Check account lockout
  if (admin.lockedUntil && new Date() < new Date(admin.lockedUntil)) {
    const remainingMinutes = Math.ceil(
      (new Date(admin.lockedUntil).getTime() - Date.now()) / (1000 * 60)
    );
    redirect(
      `/login?message=Account temporarily locked due to excessive failed attempts. Please try again in ${remainingMinutes} minute(s).`
    );
  }

  // 4. Cryptographically verify password against salt and hash in the database
  const isValid = verifyPassword(password, admin.salt, admin.passwordHash);

  if (!isValid) {
    const nextFailedCount = (admin.failedAttempts || 0) + 1;
    const isNowLocked = nextFailedCount >= MAX_FAILED_ATTEMPTS;
    const lockedUntil = isNowLocked ? new Date(Date.now() + LOCKOUT_MINUTES * 60 * 1000) : null;

    try {
      const sql = getClient();
      await sql`
        UPDATE public.admin_users
        SET failed_attempts = ${nextFailedCount}, locked_until = ${lockedUntil}, updated_at = now()
        WHERE id = ${admin.id};
      `;
    } catch (err) {
      // Ignore update error
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

  // 5. Authentication successful: reset lock/failed attempts and record login timestamp
  try {
    const sql = getClient();
    await sql`
      UPDATE public.admin_users
      SET failed_attempts = 0, locked_until = NULL, last_login_at = now(), updated_at = now()
      WHERE id = ${admin.id};
    `;
  } catch (err) {
    // Ignore update error
  }

  logInfo(`Admin successfully authenticated from DB: '${admin.email}'`);

  // 6. Generate tamper-proof cryptographically signed HMAC-SHA256 session token
  const sessionToken = await createSessionToken(admin.id, admin.email, admin.role || "super_admin", 7);

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
