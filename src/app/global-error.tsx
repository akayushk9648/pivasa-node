"use client";

import React, { useEffect, useState } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [isChunkError, setIsChunkError] = useState(false);

  useEffect(() => {
    const errorMsg = String(error?.message || "");
    const errorName = String(error?.name || "");
    const isChunk =
      errorName === "ChunkLoadError" ||
      errorMsg.includes("Loading chunk") ||
      errorMsg.includes("Failed to fetch dynamically imported module") ||
      errorMsg.includes("missing chunk");

    if (isChunk) {
      setIsChunkError(true);
      const lastReload = parseInt(sessionStorage.getItem("pivasa_chunk_reload_timestamp") || "0", 10);
      const now = Date.now();

      if (now - lastReload > 10000) {
        sessionStorage.setItem("pivasa_chunk_reload_timestamp", String(now));
        window.location.reload();
        return;
      }
    }

    try {
      fetch("/api/log-error", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          error: error.message,
          stack: error.stack,
          url: typeof window !== "undefined" ? window.location.href : "Global Root",
          additionalInfo: { digest: error.digest, isChunkError: isChunk },
        }),
      }).catch((e) => console.error(e));
    } catch (e) {
      console.error(e);
    }
  }, [error]);

  return (
    <html lang="en">
      <body style={{ fontFamily: "sans-serif", backgroundColor: "#f8fafc", padding: "2rem", textAlign: "center" }}>
        <div style={{ maxWidth: "500px", margin: "4rem auto", backgroundColor: "#ffffff", padding: "2.5rem", borderRadius: "1.5rem", border: "1px solid #e2e8f0", boxShadow: "0 10px 25px rgba(0,0,0,0.05)" }}>
          <h2 style={{ color: "#0A192F", fontSize: "1.5rem", fontWeight: "900" }}>
            {isChunkError ? "Updating Application..." : "Application Error"}
          </h2>
          <p style={{ color: "#64748b", fontSize: "0.875rem", margin: "1rem 0" }}>
            {isChunkError
              ? "A new version of Pivasa Power was deployed. Updating to latest build..."
              : "An unexpected error occurred. You can reload the page to continue."}
          </p>
          <button
            onClick={() => {
              sessionStorage.removeItem("pivasa_chunk_reload_timestamp");
              window.location.reload();
            }}
            style={{ backgroundColor: "#F7931E", color: "#ffffff", border: "none", padding: "0.75rem 1.75rem", borderRadius: "0.75rem", fontWeight: "bold", cursor: "pointer", fontSize: "0.875rem" }}
          >
            Reload Page
          </button>
        </div>
      </body>
    </html>
  );
}
