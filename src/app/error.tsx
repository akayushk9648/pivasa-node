"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Send error details to server log file automatically
    try {
      fetch("/api/log-error", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          error: error.message,
          stack: error.stack,
          url: typeof window !== "undefined" ? window.location.href : "SSR",
          additionalInfo: { digest: error.digest },
        }),
      }).catch((e) => console.error("Logging error failed:", e));
    } catch (e) {
      console.error(e);
    }
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4 bg-slate-50 font-sans">
      <div className="bg-white max-w-lg w-full p-8 rounded-3xl border border-slate-200 shadow-xl text-center space-y-6">
        <div className="h-16 w-16 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto">
          <AlertTriangle className="h-8 w-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-black uppercase text-primary tracking-wider">
            System Notice (Auto-Logged)
          </span>
          <h2 className="text-2xl font-black text-navy">An Unexpected Error Occurred</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            The error description and stack trace have been automatically captured and written to <code className="bg-slate-100 px-1.5 py-0.5 rounded text-navy font-mono">logs/app-errors.log</code>.
          </p>
        </div>

        {error.message && (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Error Message:</span>
            <div className="text-xs font-mono text-rose-700 font-bold mt-1 break-all">
              {error.message}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="flex-1 bg-primary hover:bg-primary-hover text-white font-extrabold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
          >
            <RefreshCw className="h-4 w-4" /> Try Again
          </button>
          <Link
            href="/"
            className="flex-1 bg-navy hover:bg-navy-light text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <Home className="h-4 w-4" /> Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
