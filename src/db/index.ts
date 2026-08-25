import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

function getConnectionString(): string {
  let rawUrl = process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/postgres";
  if (rawUrl.includes("pooler.supabase.com:5432")) {
    rawUrl = rawUrl.replace(":5432", ":6543");
  }
  return rawUrl;
}

declare global {
  // eslint-disable-next-line no-var
  var postgresClient: postgres.Sql | undefined;
  // eslint-disable-next-line no-var
  var drizzleDb: PostgresJsDatabase<typeof schema> | undefined;
}

export function getClient(): postgres.Sql {
  if (!globalThis.postgresClient) {
    const conn = getConnectionString();
    globalThis.postgresClient = postgres(conn, {
      prepare: false,
      max: 10,
      idle_timeout: 20,
      connect_timeout: 10,
      ssl: conn.includes("supabase") ? "require" : undefined,
    });
  }
  return globalThis.postgresClient;
}

export function getDb(): PostgresJsDatabase<typeof schema> {
  if (!globalThis.drizzleDb) {
    globalThis.drizzleDb = drizzle(getClient(), { schema });
  }
  return globalThis.drizzleDb;
}

// Proxied exports for backward-compatible top-level `db` and `client` usage
export const client = new Proxy({} as postgres.Sql, {
  get(_target, prop) {
    return (getClient() as any)[prop];
  },
  apply(_target, thisArg, argArray) {
    return (getClient() as any).apply(thisArg, argArray);
  },
});

export const db = new Proxy({} as PostgresJsDatabase<typeof schema>, {
  get(_target, prop) {
    return (getDb() as any)[prop];
  },
});

export * from "./schema";
