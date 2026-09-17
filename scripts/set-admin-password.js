/**
 * CLI utility to set/reset admin credentials directly in the PostgreSQL database.
 * Usage:
 *   node scripts/set-admin-password.js [email] [newPassword]
 * If arguments are omitted, defaults to ADMIN_EMAIL and ADMIN_PASSWORD from .env.local.
 */
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env.local") });
const postgres = require("postgres");
const crypto = require("crypto");

const email = (process.argv[2] || process.env.ADMIN_EMAIL || "admin@pivasapower.com").trim().toLowerCase();
const password = process.argv[3] || process.env.ADMIN_PASSWORD || "pivasa@admin2026";
const rawUrl = process.env.DATABASE_URL;

if (!rawUrl) {
  console.error("❌ Error: DATABASE_URL is missing in .env.local");
  process.exit(1);
}

function hashPassword(pass, salt) {
  return crypto.pbkdf2Sync(pass, salt, 100000, 64, "sha512").toString("hex");
}

function generateSalt() {
  return crypto.randomBytes(16).toString("hex");
}

async function run() {
  console.log(`\n🔑 Setting admin credentials in PostgreSQL for: ${email}`);
  const sql = postgres(rawUrl, { ssl: "require", prepare: false, connect_timeout: 10 });

  try {
    const salt = generateSalt();
    const passwordHash = hashPassword(password, salt);

    await sql`
      INSERT INTO public.admin_users (
        email,
        full_name,
        password_hash,
        salt,
        role,
        failed_attempts,
        locked_until,
        updated_at
      ) VALUES (
        ${email},
        'Pivasa Super Admin',
        ${passwordHash},
        ${salt},
        'super_admin',
        0,
        NULL,
        now()
      )
      ON CONFLICT (email) DO UPDATE
      SET password_hash = ${passwordHash},
          salt = ${salt},
          failed_attempts = 0,
          locked_until = NULL,
          updated_at = now();
    `;

    console.log("✅ SUCCESS! Admin user credentials successfully updated in database.");
    console.log(`   Email:    ${email}`);
    console.log(`   Salt:     ${salt}`);
    console.log(`   Hash:     ${passwordHash.slice(0, 16)}... (128 hex chars)`);
    console.log(`   Lockout:  Cleared`);
  } catch (err) {
    console.error("❌ Failed to update database:", err.message);
    if (err.message.includes("not found")) {
      console.error("\n💡 Hint: Your Supabase project may be paused. Log into https://supabase.com/dashboard and restore the project.");
    }
  } finally {
    await sql.end();
  }
}

run();
