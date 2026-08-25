import crypto from "crypto";

const SESSION_SECRET = "pivasa_power_enterprise_secure_session_secret_key_2026";
const PBKDF2_ITERATIONS = 100000;
const KEY_LEN = 64;
const DIGEST = "sha512";

export interface SessionPayload {
  adminId: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

/**
 * Universal base64url encoding/decoding helper that works seamlessly in both Node.js and Edge Runtime
 */
function toBase64Url(str: string): string {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(str, "utf8").toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }
  return btoa(unescape(encodeURIComponent(str))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(b64: string): string {
  const normalized = b64.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "===".slice(0, (4 - (normalized.length % 4)) % 4);
  if (typeof Buffer !== "undefined") {
    return Buffer.from(padded, "base64").toString("utf8");
  }
  return decodeURIComponent(escape(atob(padded)));
}

/**
 * Generates a cryptographically secure random salt
 */
export function generateSalt(): string {
  if (typeof crypto !== "undefined" && crypto.randomBytes) {
    return crypto.randomBytes(16).toString("hex");
  }
  const bytes = new Uint8Array(16);
  globalThis.crypto.getRandomValues(bytes);
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Hashes a password using PBKDF2 with SHA-512 (100,000 iterations)
 */
export function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, PBKDF2_ITERATIONS, KEY_LEN, DIGEST).toString("hex");
}

/**
 * Constant-time password verification
 */
export function verifyPassword(password: string, salt: string, storedHash: string): boolean {
  try {
    const computedHash = hashPassword(password, salt);
    if (computedHash.length !== storedHash.length) return false;
    let result = 0;
    for (let i = 0; i < computedHash.length; i++) {
      result |= computedHash.charCodeAt(i) ^ storedHash.charCodeAt(i);
    }
    return result === 0;
  } catch {
    return false;
  }
}

/**
 * Computes HMAC-SHA256 signature using universal Web Crypto API
 */
async function computeHmac(data: string): Promise<string> {
  const webCrypto = typeof globalThis.crypto?.subtle !== "undefined" ? globalThis.crypto : crypto.webcrypto;
  const enc = new TextEncoder();
  const key = await webCrypto.subtle.importKey(
    "raw",
    enc.encode(SESSION_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sigBuffer = await webCrypto.subtle.sign("HMAC", key, enc.encode(data));
  return Array.from(new Uint8Array(sigBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Generates an HMAC-SHA256 signed session token
 */
export async function createSessionToken(
  adminId: string,
  email: string,
  role = "super_admin",
  durationDays = 7
): Promise<string> {
  const now = Date.now();
  const payload: SessionPayload = {
    adminId,
    email,
    role,
    iat: now,
    exp: now + durationDays * 24 * 60 * 60 * 1000,
  };

  const payloadStr = JSON.stringify(payload);
  const payloadB64 = toBase64Url(payloadStr);
  const signature = await computeHmac(payloadB64);

  return `${payloadB64}.${signature}`;
}

/**
 * Verifies and decodes an HMAC-SHA256 session token (100% Edge & Node compatible)
 */
export async function verifySessionToken(token: string | undefined | null): Promise<SessionPayload | null> {
  if (!token || typeof token !== "string" || !token.includes(".")) {
    return null;
  }

  const parts = token.split(".");
  if (parts.length !== 2) {
    return null;
  }

  const [payloadB64, signature] = parts;
  if (!payloadB64 || !signature) {
    return null;
  }

  try {
    const expectedSig = await computeHmac(payloadB64);

    // Constant-time signature comparison
    if (signature.length !== expectedSig.length) {
      return null;
    }
    let mismatch = 0;
    for (let i = 0; i < signature.length; i++) {
      mismatch |= signature.charCodeAt(i) ^ expectedSig.charCodeAt(i);
    }
    if (mismatch !== 0) {
      return null;
    }

    const payloadJson = fromBase64Url(payloadB64);
    const payload: SessionPayload = JSON.parse(payloadJson);

    // Check expiration
    if (!payload.exp || Date.now() > payload.exp) {
      return null;
    }

    return payload;
  } catch (err) {
    console.error("verifySessionToken caught error:", err);
    return null;
  }
}
