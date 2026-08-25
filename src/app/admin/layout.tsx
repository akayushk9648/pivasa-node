"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";
import { 
  TrendingUp, 
  Package, 
  ShoppingCart, 
  Terminal, 
  ArrowUpRight, 
  LogOut, 
  ShieldCheck,
  Database,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [seeding, setSeeding] = useState(false);
  const [seedMessage, setSeedMessage] = useState<string | null>(null);

  const handleSeedData = async () => {
    if (!confirm("This will seed standard products, inventory, and sample orders into PostgreSQL. Proceed?")) {
      return;
    }
    setSeeding(true);
    setSeedMessage(null);
    try {
      const res = await fetch("/api/admin/seed", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setSeedMessage("Database successfully synced!");
        window.location.reload();
      } else {
        setSeedMessage("Seed failed: " + data.error);
      }
    } catch (err: any) {
      setSeedMessage("Error connecting to server.");
    } finally {
      setSeeding(false);
    }
  };

  const navLinks = [
    {
      label: "Live Dashboard",
      href: "/admin/dashboard",
      icon: TrendingUp,
    },
    {
      label: "Inventory & Stock",
      href: "/admin/inventory",
      icon: Package,
    },
    {
      label: "Customer Orders",
      href: "/admin/orders",
      icon: ShoppingCart,
    },
    {
      label: "Error Log Monitor",
      href: "/admin/logs",
      icon: Terminal,
    },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Persistent Sidebar */}
      <aside className="w-64 bg-navy text-white flex flex-col border-r border-navy-light shrink-0 z-20">
        
        {/* Brand & Hub Info */}
        <div className="p-6 border-b border-navy-light/60">
          <Logo light={true} />
          <div className="mt-3 flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-navy-light text-[10px] font-bold text-slate-300">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Admin Control Hub
            </div>
            <div className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/50">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Live DB
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-1.5 text-xs font-bold overflow-y-auto">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                  isActive
                    ? "bg-primary text-white shadow-md shadow-primary/30 font-extrabold"
                    : "text-slate-300 hover:text-white hover:bg-navy-light"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}

          <div className="pt-3 border-t border-navy-light/40 mt-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-3 text-slate-400 hover:text-white hover:bg-navy-light px-3.5 py-2.5 rounded-xl transition-colors text-xs font-bold"
            >
              <ArrowUpRight className="h-4 w-4 text-slate-400" /> View Storefront
            </Link>
          </div>
        </nav>

        {/* Database Quick Seed & User Actions */}
        <div className="p-4 border-t border-navy-light/60 space-y-2">
          
          <button
            onClick={handleSeedData}
            disabled={seeding}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-navy-light hover:bg-slate-700/70 text-slate-200 rounded-xl text-[11px] font-bold transition-colors border border-navy-light/80 disabled:opacity-50"
            title="Seed/Sync sample products, categories and orders into PostgreSQL"
          >
            <RefreshCw className={`h-3.5 w-3.5 text-amber-400 ${seeding ? "animate-spin" : ""}`} />
            <span>{seeding ? "Syncing DB..." : "Seed Sample Data"}</span>
          </button>

          {seedMessage && (
            <div className="text-[10px] text-center text-amber-300 bg-amber-950/40 p-1.5 rounded-lg border border-amber-800/40 font-semibold">
              {seedMessage}
            </div>
          )}

          <form action="/auth/signout" method="post">
            <button className="flex items-center gap-3 px-3.5 py-2 w-full rounded-xl text-slate-400 hover:text-rose-400 hover:bg-navy-light transition-colors text-xs font-bold text-left">
              <LogOut className="h-4 w-4" /> Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main App Work Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
}
