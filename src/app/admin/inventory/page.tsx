"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Package, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  Plus, 
  Minus, 
  RefreshCw, 
  Filter, 
  Warehouse,
  ExternalLink
} from "lucide-react";

export default function AdminInventoryPage() {
  const [inventoryList, setInventoryList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterQuery, setFilterQuery] = useState("");
  const [lowStockFilter, setLowStockFilter] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const loadInventory = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/inventory");
      const data = await res.json();
      if (data.success) {
        setInventoryList(data.inventory || []);
      } else {
        showToast("Error loading inventory: " + data.error);
      }
    } catch (err: any) {
      showToast("Failed to fetch inventory from server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInventory();
  }, []);

  const handleAdjustQuantity = async (productId: string, delta: number) => {
    const item = inventoryList.find((i) => i.productId === productId);
    if (!item) return;

    const oldQty = item.quantityAvailable;
    const newQty = Math.max(0, oldQty + delta);

    // Optimistic UI Update
    setInventoryList((prev) =>
      prev.map((it) => (it.productId === productId ? { ...it, quantityAvailable: newQty } : it))
    );

    try {
      const res = await fetch("/api/admin/inventory", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          adjustmentDelta: delta,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to update inventory.");
      }

      showToast(`Quantity updated to ${newQty} units`);
    } catch (err: any) {
      // Revert optimistic update
      setInventoryList((prev) =>
        prev.map((it) => (it.productId === productId ? { ...it, quantityAvailable: oldQty } : it))
      );
      showToast("Update failed: " + err.message);
    }
  };

  const filtered = inventoryList.filter((item) => {
    const prod = item.product;
    const q = filterQuery.toLowerCase();
    const matchesSearch =
      prod?.brandName?.toLowerCase().includes(q) ||
      prod?.modelSku?.toLowerCase().includes(q) ||
      item.warehouseLocation?.toLowerCase().includes(q);
    const matchesLowStock = !lowStockFilter || item.quantityAvailable <= item.reorderLevel;

    return matchesSearch && matchesLowStock;
  });

  return (
    <main className="flex-1 flex flex-col overflow-y-auto font-sans">
      
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm shrink-0">
        <div>
          <h1 className="text-2xl font-black text-navy">Inventory & Stock Ledger</h1>
          <p className="text-xs text-slate-400 mt-0.5">Physical warehouse counts, reserved allocations & reorder alerts</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => loadInventory()}
            className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
            title="Refresh Inventory"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin text-primary" : ""}`} />
          </button>

          <button
            onClick={() => setLowStockFilter(!lowStockFilter)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              lowStockFilter
                ? "bg-rose-100 text-rose-800 border border-rose-300"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <AlertTriangle className="h-3.5 w-3.5" />
            <span>Low Stock Alerts</span>
          </button>

          <div className="relative w-60">
            <input
              type="text"
              placeholder="Search SKU or warehouse..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-primary font-medium"
            />
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
          </div>
        </div>
      </header>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-navy text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-2 text-xs font-bold animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      <div className="p-8 space-y-6 max-w-7xl">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          
          {loading ? (
            <div className="p-12 text-center text-slate-400 text-xs font-bold flex items-center justify-center gap-2">
              <RefreshCw className="h-4 w-4 animate-spin text-primary" /> Loading warehouse inventory...
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center space-y-2">
              <Package className="h-10 w-10 text-slate-300 mx-auto" />
              <div className="text-sm font-bold text-navy">No inventory records found</div>
              <p className="text-xs text-slate-400">Add products to see live warehouse stock tracking.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-400 uppercase tracking-wider font-extrabold border-b border-slate-100">
                  <tr>
                    <th className="py-3.5 px-5">Product SKU</th>
                    <th className="py-3.5 px-4">Warehouse Location</th>
                    <th className="py-3.5 px-4">Available Qty</th>
                    <th className="py-3.5 px-4">Reorder Level</th>
                    <th className="py-3.5 px-4">Stock Health</th>
                    <th className="py-3.5 px-5 text-right">Instant Stock Adjustment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filtered.map((item) => {
                    const prod = item.product;
                    const isLow = item.quantityAvailable <= item.reorderLevel;

                    return (
                      <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-5 font-bold text-navy">
                          <div className="flex items-center gap-2">
                            <span>{prod?.brandName} {prod?.modelSku}</span>
                            <Link
                              href={`/products/${prod?.link}`}
                              target="_blank"
                              className="text-slate-400 hover:text-primary"
                              title="View Storefront"
                            >
                              <ExternalLink className="h-3 w-3" />
                            </Link>
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono">{prod?.capacity} • {prod?.voltage}</span>
                        </td>

                        <td className="py-3.5 px-4 text-slate-600">
                          <div className="flex items-center gap-1.5">
                            <Warehouse className="h-3.5 w-3.5 text-slate-400" />
                            <span>{item.warehouseLocation}</span>
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className={`font-black text-sm font-mono ${isLow ? "text-rose-600" : "text-navy"}`}>
                            {item.quantityAvailable} units
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-slate-500 font-semibold font-mono">
                          {item.reorderLevel} units
                        </td>

                        <td className="py-3.5 px-4">
                          {item.quantityAvailable > item.reorderLevel ? (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                              Healthy Stock
                            </span>
                          ) : item.quantityAvailable > 0 ? (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 flex items-center gap-1 w-fit">
                              <AlertTriangle className="h-3 w-3" /> Low Stock
                            </span>
                          ) : (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">
                              Out of Stock
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-5 text-right">
                          <div className="inline-flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
                            <button
                              onClick={() => handleAdjustQuantity(item.productId, -1)}
                              disabled={item.quantityAvailable === 0}
                              className="p-1 rounded-lg text-slate-600 hover:bg-white hover:text-navy disabled:opacity-30 transition-all cursor-pointer"
                              title="Decrease 1 unit"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="font-black text-xs w-7 text-center text-navy font-mono">
                              {item.quantityAvailable}
                            </span>
                            <button
                              onClick={() => handleAdjustQuantity(item.productId, 1)}
                              className="p-1 rounded-lg text-slate-600 hover:bg-white hover:text-navy transition-all cursor-pointer"
                              title="Increase 1 unit"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>

    </main>
  );
}
