"use client";

import React, { useState, useEffect } from "react";
import { X, Save, Loader2, Warehouse, Package, AlertCircle } from "lucide-react";

interface EditInventoryModalProps {
  item: any | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditInventoryModal({ item, isOpen, onClose, onSuccess }: EditInventoryModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    quantityAvailable: 0,
    reorderLevel: 5,
    warehouseLocation: "Varanasi Main Hub",
  });

  useEffect(() => {
    if (item) {
      setFormData({
        quantityAvailable: item.quantityAvailable ?? 0,
        reorderLevel: item.reorderLevel ?? 5,
        warehouseLocation: item.warehouseLocation || "Varanasi Main Hub",
      });
      setError(null);
    }
  }, [item, isOpen]);

  if (!isOpen || !item) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/inventory", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: item.productId,
          quantityAvailable: Number(formData.quantityAvailable),
          reorderLevel: Number(formData.reorderLevel),
          warehouseLocation: formData.warehouseLocation,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to update inventory record.");
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to update inventory");
    } finally {
      setLoading(false);
    }
  };

  const prod = item.product;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-dark/70 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase tracking-wider">
              Warehouse Ledger
            </div>
            <h2 className="text-xl font-black text-navy mt-1">
              Edit Stock: {prod?.brandName} {prod?.modelSku}
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              {prod?.capacity} • {prod?.voltage}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-navy hover:bg-slate-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium">
          
          {/* Quantity Available */}
          <div>
            <label className="block text-slate-700 font-bold mb-1">
              Available Physical Units *
            </label>
            <input
              type="number"
              min="0"
              required
              value={formData.quantityAvailable}
              onChange={(e) => setFormData({ ...formData, quantityAvailable: parseInt(e.target.value, 10) || 0 })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary font-bold text-lg font-mono text-navy"
            />
            <span className="text-[10px] text-slate-400 mt-1 block">
              Direct physical count currently present on shelves ready for dispatch.
            </span>
          </div>

          {/* Reorder Threshold */}
          <div>
            <label className="block text-slate-700 font-bold mb-1">
              Low-Stock Alert Level (Reorder Threshold) *
            </label>
            <input
              type="number"
              min="0"
              required
              value={formData.reorderLevel}
              onChange={(e) => setFormData({ ...formData, reorderLevel: parseInt(e.target.value, 10) || 0 })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary font-bold font-mono text-navy"
            />
            <span className="text-[10px] text-slate-400 mt-1 block">
              When available units drop to or below this number, a warning alert triggers.
            </span>
          </div>

          {/* Warehouse Location */}
          <div>
            <label className="block text-slate-700 font-bold mb-1">
              Warehouse Location / Storage Bay
            </label>
            <div className="relative">
              <Warehouse className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                required
                value={formData.warehouseLocation}
                onChange={(e) => setFormData({ ...formData, warehouseLocation: e.target.value })}
                placeholder="e.g. Varanasi Main Hub - Bay 4"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 font-bold text-xs transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-extrabold text-xs shadow-md shadow-primary/20 flex items-center gap-2 transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Updating Stock...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Save Inventory</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
