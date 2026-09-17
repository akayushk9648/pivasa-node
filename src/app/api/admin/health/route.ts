import { NextResponse } from "next/server";
import { getClient } from "@/db";

export async function GET() {
  try {
    const sql = getClient();
    
    // Quick query with 3-second timeout protection
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Database ping timed out (3s)")), 3000)
    );

    const queryPromise = sql`SELECT 1 as connected;`;

    await Promise.race([queryPromise, timeoutPromise]);

    return NextResponse.json({
      success: true,
      connected: true,
      provider: "PostgreSQL / Supabase",
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json({
      success: true,
      connected: false,
      error: err?.message || "PostgreSQL connection failed",
      suggestion: "Supabase project may be paused or offline. Check .env.local and restore project in Supabase dashboard.",
      timestamp: new Date().toISOString(),
    });
  }
}
