import { NextRequest, NextResponse } from "next/server";
import { db, adminUsers } from "@/db";
import { eq, or } from "drizzle-orm";
import { verifyPassword, createSessionToken, generateSalt, hashPassword } from "@/lib/auth/security";
import { ensureAdminTableAndSeed } from "@/lib/auth/admin-init";
import { logError, logInfo } from "@/lib/logger";

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const rawEmail = body.email as string;
    const password = body.password as string;

    const email = rawEmail?.trim().toLowerCase();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    // Ensure database table and default admin seed exist
    await ensureAdminTableAndSeed();

    const targetEmail = (email === "admin" || email === "admin@pivasa.com" || email === "pivasapower@gmail.com") 
      ? "admin@pivasapower.com" 
      : email;

    // 1. Query admin user from database
    let admin: typeof adminUsers.$inferSelect | undefined;

    try {
      const results = await db
        .select()
        .from(adminUsers)
        .where(or(eq(adminUsers.email, targetEmail), eq(adminUsers.email, email)))
        .limit(1);

      admin = results[0];
    } catch (queryErr: any) {
      logError(queryErr, { route: "/api/admin/login", action: "Query adminUsers" }, "DATABASE_ERROR");
    }

    if (!admin) {
      logError(
        new Error(`Failed admin login attempt: Unknown email '${email}'`),
        { route: "/api/admin/login", action: "Admin Login Failed" },
        "AUTH_ERROR"
      );
      return NextResponse.json({ error: "Invalid admin credentials." }, { status: 401 });
    }

    // 3. Check if account is locked
    if (admin.lockedUntil && new Date() < new Date(admin.lockedUntil)) {
      const remainingMinutes = Math.ceil(
        (new Date(admin.lockedUntil).getTime() - Date.now()) / (1000 * 60)
      );
      return NextResponse.json(
        { error: `Account temporarily locked due to excessive failed attempts. Please try again in ${remainingMinutes} minute(s).` },
        { status: 403 }
      );
    }

    // 4. Verify password
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
        { route: "/api/admin/login", action: "Admin Password Mismatch" },
        "AUTH_ERROR"
      );

      if (isNowLocked) {
        return NextResponse.json(
          { error: `Too many failed login attempts. Account locked for ${LOCKOUT_MINUTES} minutes.` },
          { status: 403 }
        );
      } else {
        const remaining = MAX_FAILED_ATTEMPTS - nextFailedCount;
        return NextResponse.json(
          { error: `Invalid password. ${remaining} attempt(s) remaining before lockout.` },
          { status: 401 }
        );
      }
    }

    // 5. Reset lockout and update last login + refresh salt/hash if needed
    try {
      const salt = admin.salt || generateSalt();
      const passwordHash = admin.salt ? admin.passwordHash : hashPassword(password, salt);

      await db
        .update(adminUsers)
        .set({
          failedAttempts: 0,
          lockedUntil: null,
          salt,
          passwordHash,
          lastLoginAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(adminUsers.id, admin.id));
    } catch (err) {
      // Ignore
    }

    logInfo(`Admin successfully authenticated: '${admin.email}'`);

    // 6. Issue HMAC signed session token
    const sessionToken = await createSessionToken(admin.id, admin.email, admin.role, 7);

    const response = NextResponse.json({
      success: true,
      redirect: "/admin/dashboard",
      user: {
        email: admin.email,
        fullName: admin.fullName,
        role: admin.role,
      },
    });

    response.cookies.set("pivasa_admin_session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: any) {
    logError(error, { route: "/api/admin/login", action: "POST" }, "AUTH_ERROR");
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
