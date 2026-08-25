import { NextRequest, NextResponse } from "next/server";
import { logError } from "@/lib/logger";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { error, stack, url, componentStack, additionalInfo } = body;

    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "localhost";
    const userAgent = req.headers.get("user-agent") || "unknown";

    logError(
      { message: error, stack: stack || componentStack },
      {
        route: url || "Client UI",
        action: "Client Error Catch Boundary",
        ip,
        userAgent,
        details: additionalInfo,
      },
      "CLIENT_ERROR"
    );

    return NextResponse.json({ success: true, logged: true });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to record error log" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: "Logger active", file: "logs/app-errors.log" });
}
