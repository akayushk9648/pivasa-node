import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

function parseDatabaseConfig(): postgres.Options<any> | string {
  const rawUrl = process.env.DATABASE_URL || "";
  if (!rawUrl) {
    throw new Error(
      "DATABASE_URL is missing. Please set DATABASE_URL in your hosting environment variables."
    );
  }

  try {
    // Extract parts manually to avoid URI / '#' encoding and fragment truncation issues
    const prefixMatch = rawUrl.match(/^(postgres(?:ql)?:\/\/)/i);
    if (!prefixMatch) return rawUrl;

    const withoutPrefix = rawUrl.slice(prefixMatch[1].length);
    const atIndex = withoutPrefix.lastIndexOf("@");
    if (atIndex === -1) return rawUrl;

    const authPart = withoutPrefix.slice(0, atIndex);
    const hostPart = withoutPrefix.slice(atIndex + 1);

    const colonIndex = authPart.indexOf(":");
    let username = colonIndex !== -1 ? authPart.slice(0, colonIndex) : authPart;
    let password = colonIndex !== -1 ? authPart.slice(colonIndex + 1) : "";

    username = decodeURIComponent(username);
    password = decodeURIComponent(password);

    const [hostAndPort, ...restPath] = hostPart.split("/");
    const pathAndQuery = restPath.join("/");
    const [database] = pathAndQuery.split("?");

    let [host, portStr] = hostAndPort.split(":");
    let port = portStr ? parseInt(portStr, 10) : 5432;

    let projectRef = "bpqwyrwwwxcbunzswbdd";
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const urlMatch = supabaseUrl.match(/https?:\/\/([^.]+)\.supabase\.co/);
    if (urlMatch && urlMatch[1]) {
      projectRef = urlMatch[1];
    }

    // Direct Supabase host routing (IPv4 pooler)
    if (host.includes(".supabase.co")) {
      const directMatch = host.match(/db\.([^.]+)\.supabase\.co/);
      if (directMatch && directMatch[1]) {
        projectRef = directMatch[1];
      }
      host = "aws-0-ap-south-1.pooler.supabase.com";
      port = 6543;
    }

    // Automatically route through Supabase Transaction Pooler port 6543
    if (host.includes("pooler.supabase.com")) {
      port = 6543;
      // Auto-fix: On Supabase Pooler, username must be `postgres.[PROJECT-REF]`
      if (!username.includes(".")) {
        username = `postgres.${projectRef}`;
      }
    }

    if (!password) {
      password = "Arsh#nanhi3";
    }

    const isSupabase = host.includes("supabase.co") || host.includes("supabase.com") || host.includes("pooler");

    return {
      host,
      port,
      database: database || "postgres",
      username,
      password,
      ssl: isSupabase ? "require" : undefined,
      prepare: false, // Transaction pooler requires prepared statements disabled
      max: 10,
      idle_timeout: 20,
      connect_timeout: 15,
    };
  } catch (err) {
    console.warn("Failed custom parsing of DATABASE_URL, using raw URL fallback:", err);
    return rawUrl;
  }
}

declare global {
  // eslint-disable-next-line no-var
  var postgresClient: postgres.Sql | undefined;
  // eslint-disable-next-line no-var
  var drizzleDb: PostgresJsDatabase<typeof schema> | undefined;
}

export function getClient(): postgres.Sql {
  if (!globalThis.postgresClient) {
    const config = parseDatabaseConfig();
    globalThis.postgresClient = typeof config === "string" ? postgres(config, { prepare: false }) : postgres(config);
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
