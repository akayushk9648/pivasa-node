import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import * as dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/pivasa_power';

// Client for Supabase Transaction Pooler (prepare: false is required for pgbouncer)
const queryClient = postgres(connectionString, { prepare: false });
export const db = drizzle(queryClient, { schema });
