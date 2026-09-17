import { getClient } from "@/db";
import { generateSalt, hashPassword } from "./security";
import { logInfo, logError } from "@/lib/logger";

declare global {
  // eslint-disable-next-line no-var
  var __adminTableInitialized: boolean | undefined;
}

/**
 * Idempotently ensures the public.admin_users table, columns, and default super-admin user exist.
 * This guarantees that schema drifts or fresh deployments never crash admin authentication.
 */
export async function ensureAdminTableAndSeed(): Promise<void> {
  if (globalThis.__adminTableInitialized) {
    return;
  }

  const sql = getClient();

  try {
    // 1. Ensure required PostgreSQL extensions exist
    await sql`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`;
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;

    // 2. Create admin_users table if missing
    await sql`
      CREATE TABLE IF NOT EXISTS public.admin_users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email TEXT UNIQUE NOT NULL,
        full_name TEXT NOT NULL DEFAULT 'Administrator',
        password_hash TEXT NOT NULL,
        salt TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'super_admin',
        failed_attempts INTEGER NOT NULL DEFAULT 0,
        locked_until TIMESTAMPTZ,
        last_login_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
      );
    `;

    // 3. Guarantee all columns exist if the table was created previously with an older/partial schema
    await sql`ALTER TABLE public.admin_users ADD COLUMN IF NOT EXISTS full_name TEXT NOT NULL DEFAULT 'Administrator';`;
    await sql`ALTER TABLE public.admin_users ADD COLUMN IF NOT EXISTS salt TEXT DEFAULT '';`;
    await sql`ALTER TABLE public.admin_users ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'super_admin';`;
    await sql`ALTER TABLE public.admin_users ADD COLUMN IF NOT EXISTS failed_attempts INTEGER NOT NULL DEFAULT 0;`;
    await sql`ALTER TABLE public.admin_users ADD COLUMN IF NOT EXISTS locked_until TIMESTAMPTZ;`;
    await sql`ALTER TABLE public.admin_users ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMPTZ;`;
    await sql`ALTER TABLE public.admin_users ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now());`;
    await sql`ALTER TABLE public.admin_users ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now());`;

    // 4. Seed or sync default super-admin
    const defaultEmail = (process.env.ADMIN_EMAIL || "admin@pivasapower.com").trim().toLowerCase();
    const defaultPassword = process.env.ADMIN_PASSWORD || "pivasa@admin2026";

    const existing = await sql`SELECT id, salt, password_hash FROM public.admin_users WHERE lower(email) = ${defaultEmail} LIMIT 1`;

    if (existing.length === 0) {
      const salt = generateSalt();
      const passwordHash = hashPassword(defaultPassword, salt);

      await sql`
        INSERT INTO public.admin_users (
          email,
          full_name,
          password_hash,
          salt,
          role,
          failed_attempts
        ) VALUES (
          ${defaultEmail},
          'Pivasa Super Admin',
          ${passwordHash},
          ${salt},
          'super_admin',
          0
        )
        ON CONFLICT (email) DO NOTHING;
      `;
      logInfo("Successfully auto-seeded default admin user: " + defaultEmail);
    } else {
      // If user exists, ensure salt and valid hash are in place for the default password
      const user = existing[0];
      if (!user.salt || !user.password_hash) {
        const salt = generateSalt();
        const passwordHash = hashPassword(defaultPassword, salt);
        await sql`
          UPDATE public.admin_users
          SET salt = ${salt}, password_hash = ${passwordHash}, failed_attempts = 0, locked_until = NULL, updated_at = now()
          WHERE id = ${user.id};
        `;
        logInfo("Successfully synchronized salt and hash for admin user: " + defaultEmail);
      }
    }

    globalThis.__adminTableInitialized = true;
  } catch (err: any) {
    // Gracefully catch database offline / timeout errors without crashing the request
    logError(err, { route: "admin-init", action: "ensureAdminTableAndSeed" }, "DATABASE_ERROR");
    console.warn("Notice: PostgreSQL not reachable during ensureAdminTableAndSeed (fallback mode active):", err.message || err);
  }
}
