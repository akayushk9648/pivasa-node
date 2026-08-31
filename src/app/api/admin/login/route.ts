import { NextRequest, NextResponse } from "next/server";
import { db, adminUsers, getClient } from "@/db";
import { eq, or } from "drizzle-orm";
import { verifyPassword, createSessionToken } from "@/lib/auth/security";
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

    // 1. Ensure table and initial schema are in sync
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
      logError(sqlErr, { route: "/api/admin/login", action: "Query admin_users via SQL" }, "DATABASE_ERROR");
    }

    // Fallback to Drizzle ORM query if direct SQL missed
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
        logError(drizzleErr, { route: "/api/admin/login", action: "Query admin_users via Drizzle" }, "DATABASE_ERROR");
      }
    }

    if (!admin) {
      logError(
        new Error(`Failed admin login attempt: Unknown email '${email}'`),
        { route: "/api/admin/login", action: "Admin Login Failed" },
        "AUTH_ERROR"
      );
      return NextResponse.json({ error: "Invalid admin credentials." }, { status: 401 });
    }

    // 3. Check account lockout
    if (admin.lockedUntil && new Date() < new Date(admin.lockedUntil)) {
      const remainingMinutes = Math.ceil(
        (new Date(admin.lockedUntil).getTime() - Date.now()) / (1000 * 60)
      );
      return NextResponse.json(
        { error: `Account temporarily locked due to excessive failed attempts. Please try again in ${remainingMinutes} minute(s).` },
        { status: 403 }
      );
    }

    // 4. Verify password against the cryptographic salt and password_hash from the database
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
        // Ignore update error on failed attempt
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

    // 5. Authentication successful: reset failed attempts and update last_login_at in database
    try {
      const sql = getClient();
      await sql`
        UPDATE public.admin_users
        SET failed_attempts = 0, locked_until = NULL, last_login_at = now(), updated_at = now()
        WHERE id = ${admin.id};
      `;
    } catch (err) {
      // Ignore timestamp update error
    }

    logInfo(`Admin successfully authenticated from DB: '${admin.email}'`);

    // 6. Issue HMAC signed session token
    const sessionToken = await createSessionToken(admin.id, admin.email, admin.role || "super_admin", 7);

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
