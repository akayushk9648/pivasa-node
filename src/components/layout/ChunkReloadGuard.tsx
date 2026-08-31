"use client";

import { useEffect } from "react";

const RELOAD_KEY = "pivasa_chunk_reload_timestamp";
const RELOAD_COOLDOWN_MS = 10000; // 10 seconds cooldown to prevent infinite reload loops

/**
 * Checks if the given error message or stack relates to Next.js dynamic chunk loading failures
 */
function isChunkLoadError(error: any): boolean {
  if (!error) return false;
  const name = String(error.name || "");
  const message = String(error.message || error || "");
  const stack = String(error.stack || "");

  return (
    name === "ChunkLoadError" ||
    message.includes("Loading chunk") ||
    message.includes("Failed to fetch dynamically imported module") ||
    message.includes("missing chunk") ||
    stack.includes("ChunkLoadError") ||
    stack.includes("webpack-")
  );
}

/**
 * Triggers an immediate browser hard refresh if not within the cooldown window
 */
function triggerSafeReload() {
  if (typeof window === "undefined") return;

  try {
    const lastReload = parseInt(sessionStorage.getItem(RELOAD_KEY) || "0", 10);
    const now = Date.now();

    if (now - lastReload > RELOAD_COOLDOWN_MS) {
      sessionStorage.setItem(RELOAD_KEY, String(now));
      // Force reload ignoring cache to fetch newly deployed build HTML and chunks
      window.location.reload();
    }
  } catch (e) {
    window.location.reload();
  }
}

export default function ChunkReloadGuard() {
  useEffect(() => {
    // 1. Intercept standard window error events (e.g. script load failures)
    const handleError = (event: ErrorEvent) => {
      if (isChunkLoadError(event.error || event.message)) {
        console.warn("Detected chunk loading mismatch after deployment. Auto-reloading to latest build...");
        triggerSafeReload();
      }
    };

    // 2. Intercept unhandled promise rejections (e.g. Next.js router dynamic import rejections)
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (isChunkLoadError(event.reason)) {
        console.warn("Detected chunk import rejection. Auto-reloading to latest build...");
        triggerSafeReload();
      }
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleUnhandledRejection);
    };
  }, []);

  return null;
}
