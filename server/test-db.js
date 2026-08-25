const postgres = require('postgres');

const passEncoded = 'Arsh3nanhi%23%23';
const passRaw = 'Arsh3nanhi##';

const urls = [
  { name: 'Pooler with project ref user (%23)', url: `postgres://postgres.achhykegkkpyojwgpwbh:${passEncoded}@aws-0-ap-south-1.pooler.supabase.com:6543/postgres` },
  { name: 'Pooler with plain postgres user (%23)', url: `postgres://postgres:${passEncoded}@aws-0-ap-south-1.pooler.supabase.com:6543/postgres` },
  { name: 'Direct DB host (5432) plain user (%23)', url: `postgres://postgres:${passEncoded}@db.achhykegkkpyojwgpwbh.supabase.co:5432/postgres` },
  { name: 'Direct DB host (5432) project ref user (%23)', url: `postgres://postgres.achhykegkkpyojwgpwbh:${passEncoded}@db.achhykegkkpyojwgpwbh.supabase.co:5432/postgres` },
];

async function run() {
  for (const item of urls) {
    console.log(`\nTesting: ${item.name}...`);
    try {
      const sql = postgres(item.url, { prepare: false, connect_timeout: 5 });
      const res = await sql`SELECT 1 as connected, count(*)::int as product_count FROM products`;
      console.log(`✅ SUCCESS! ${item.name} connected!`);
      console.log('Query Result:', res);
      await sql.end();
      return;
    } catch (err) {
      console.error(`❌ Failed (${item.name}):`, err.message);
    }
  }
}

run();
