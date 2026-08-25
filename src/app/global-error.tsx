"use client";

import React, { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    try {
      fetch("/api/log-error", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          error: error.message,
          stack: error.stack,
          url: typeof window !== "undefined" ? window.location.href : "Global Root",
        }),
      }).catch((e) => console.error(e));
    } catch (e) {
      console.error(e);
    }
  }, [error]);

  return (
    <html lang="en">
      <body style={{ fontFamily: "sans-serif", backgroundColor: "#f8fafc", padding: "2rem", textAlign: "center" }}>
        <div style={{ maxWidth: "500px", margin: "4rem auto", backgroundColor: "#ffffff", padding: "2rem", borderRadius: "1.5rem", border: "1px solid #e2e8f0", boxShadow: "0 10px 25px rgba(0,0,0,0.05)" }}>
          <h2 style={{ color: "#0A192F", fontSize: "1.5rem", fontWeight: "900" }}>Application Error</h2>
          <p style={{ color: "#64748b", fontSize: "0.875rem", margin: "1rem 0" }}>
            The error has been written to <code>logs/app-errors.log</code>.
          </p>
          <button
            onClick={() => reset()}
            style={{ backgroundColor: "#DC2626", color: "#ffffff", border: "none", padding: "0.75rem 1.5rem", borderRadius: "0.75rem", fontWeight: "bold", cursor: "pointer" }}
          >
            Reload Page
          </button>
        </div>
      </body>
    </html>
  );
}
