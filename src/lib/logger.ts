import fs from "fs";
import path from "path";

const LOGS_DIR = path.join(process.cwd(), "logs");
const ERROR_LOG_FILE = path.join(LOGS_DIR, "app-errors.log");
const COMBINED_LOG_FILE = path.join(LOGS_DIR, "app-combined.log");

// Ensure logs directory exists
function ensureLogDir() {
  try {
    if (!fs.existsSync(LOGS_DIR)) {
      fs.mkdirSync(LOGS_DIR, { recursive: true });
    }
  } catch (err) {
    console.error("Failed to create logs directory:", err);
  }
}

export interface ErrorLogContext {
  route?: string;
  method?: string;
  action?: string;
  userId?: string;
  details?: Record<string, any> | string;
  ip?: string;
  userAgent?: string;
}

/**
 * Logs an error with detailed description, timestamp, route context, and stack trace to logs/app-errors.log
 */
export function logError(
  error: any,
  context: ErrorLogContext = {},
  category: "DATABASE_ERROR" | "API_ERROR" | "AUTH_ERROR" | "CLIENT_ERROR" | "SERVER_ERROR" = "SERVER_ERROR"
) {
  try {
    ensureLogDir();

    const timestampIso = new Date().toISOString();
    const timestampLocal = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    const errorMessage = error?.message || (typeof error === "string" ? error : JSON.stringify(error));
    const errorStack = error?.stack || "No stack trace available";
    const errorCode = error?.code || error?.status || "UNKNOWN_CODE";

    const logEntry = [
      "=".repeat(85),
      `[${timestampIso} | ${timestampLocal} IST] [${category}] [CODE: ${errorCode}]`,
      `Route / Endpoint: ${context.route || "N/A"} ${context.method ? `[${context.method}]` : ""}`,
      `Action Context:   ${context.action || "N/A"}`,
      context.userId ? `User ID:          ${context.userId}` : null,
      context.ip ? `Client IP:        ${context.ip}` : null,
      context.userAgent ? `User-Agent:       ${context.userAgent}` : null,
      "-".repeat(85),
      `DESCRIPTION / MESSAGE:`,
      `  ${errorMessage}`,
      context.details ? `ADDITIONAL CONTEXT:\n  ${typeof context.details === "object" ? JSON.stringify(context.details, null, 2) : context.details}` : null,
      `-`.repeat(85),
      `STACK TRACE:`,
      errorStack
        .split("\n")
        .map((line: string) => `  ${line}`)
        .join("\n"),
      "=".repeat(85),
      "\n",
    ]
      .filter(Boolean)
      .join("\n");

    // 1. Append to error log file
    fs.appendFileSync(ERROR_LOG_FILE, logEntry, "utf8");

    // 2. Also append to combined log file
    fs.appendFileSync(COMBINED_LOG_FILE, logEntry, "utf8");

    // 3. Print to server console
    console.error(`\x1b[31m[PIVASA ERROR LOGGED]\x1b[0m ${category}: ${errorMessage} (written to logs/app-errors.log)`);
  } catch (fsErr) {
    console.error("CRITICAL: Failed to write to log file:", fsErr, "Original error:", error);
  }
}

/**
 * Logs informational server events (e.g. startup, orders placed, uploads)
 */
export function logInfo(message: string, context: Record<string, any> = {}) {
  try {
    ensureLogDir();
    const timestampIso = new Date().toISOString();
    const timestampLocal = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    const logEntry = `[${timestampIso} | ${timestampLocal} IST] [INFO] ${message} | Context: ${JSON.stringify(context)}\n`;
    fs.appendFileSync(COMBINED_LOG_FILE, logEntry, "utf8");
    console.log(`\x1b[34m[PIVASA INFO]\x1b[0m ${message}`);
  } catch (fsErr) {
    console.error("Failed to write info log:", fsErr);
  }
}

/**
 * Reads recent error logs from file
 */
export function getRecentErrorLogs(maxLines = 100): string {
  try {
    if (!fs.existsSync(ERROR_LOG_FILE)) {
      return "No errors logged yet. System running smoothly!";
    }
    const data = fs.readFileSync(ERROR_LOG_FILE, "utf8");
    const lines = data.split("\n");
    return lines.slice(-maxLines).join("\n");
  } catch (err) {
    return "Failed to read error log file.";
  }
}
