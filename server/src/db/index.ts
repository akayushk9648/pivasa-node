import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import * as dotenv from 'dotenv';

dotenv.config();

function getConnectionString(): string {
  let rawUrl = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/pivasa_power';
  const match = rawUrl.match(/^(postgres(?:ql)?:\/\/)([^:]+):(.*)@([^/?#]+)(.*)$/);
  if (match) {
    const [, protocol, username, password, hostPort, rest] = match;
    try {
      const safeUser = encodeURIComponent(decodeURIComponent(username));
      const safePassword = encodeURIComponent(decodeURIComponent(password));
      rawUrl = `${protocol}${safeUser}:${safePassword}@${hostPort}${rest}`;
    } catch {
      // fallback
    }
  }
  return rawUrl;
}

// Client for Supabase Transaction Pooler (prepare: false is required for pgbouncer)
const queryClient = postgres(getConnectionString(), { prepare: false });
export const db = drizzle(queryClient, { schema });
