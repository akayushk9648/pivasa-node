"use client";

import React, { useState } from "react";
import { X, Plus, Loader2, Package, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddProductModal({ isOpen, onClose, onSuccess }: AddProductModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    brandName: "Exide",
    modelSku: "",
    brandSeries: "",
    approxMrp: "",
    capacity: "150 Ah",
    voltage: "12V",
    plateTechnology: "Tall Tubular Technology",
    totalWarrantyMonths: "60",
    focMonths: "36",
    proRataMonths: "24",
    initialQuantity: "15",
    imageUrl: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80",
    features: "High pressure cast spine;Factory charged;Ceramic water level indicators",
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to create product.");
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-dark/70 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-black uppercase text-primary tracking-wider">
              Catalog Management
            </span>
            <h2 className="text-2xl font-black text-navy">Add New Product & SKU</h2>
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
          
          {/* Row 1: Brand & SKU */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Brand Name *</label>
              <input
                type="text"
                required
                value={formData.brandName}
                onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                placeholder="e.g. Exide, Luminous, Amaron"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Model SKU / Code *</label>
              <input
                type="text"
                required
                value={formData.modelSku}
                onChange={(e) => setFormData({ ...formData, modelSku: e.target.value })}
                placeholder="e.g. EX-IT500-150AH"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary uppercase font-mono"
              />
            </div>
          </div>

          {/* Row 2: Series & MRP */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Brand Series</label>
              <input
                type="text"
                value={formData.brandSeries}
                onChange={(e) => setFormData({ ...formData, brandSeries: e.target.value })}
                placeholder="e.g. Inva Tubular Heavy Duty"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Approx MRP (₹) *</label>
              <input
                type="number"
                required
                value={formData.approxMrp}
                onChange={(e) => setFormData({ ...formData, approxMrp: e.target.value })}
                placeholder="18500"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary font-bold text-navy"
              />
            </div>
          </div>

          {/* Row 3: Capacity, Voltage, Initial Qty */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Capacity</label>
              <input
                type="text"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                placeholder="150 Ah or 1100 VA"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Voltage</label>
              <input
                type="text"
                value={formData.voltage}
                onChange={(e) => setFormData({ ...formData, voltage: e.target.value })}
                placeholder="12V"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Initial Stock Qty</label>
              <input
                type="number"
                value={formData.initialQuantity}
                onChange={(e) => setFormData({ ...formData, initialQuantity: e.target.value })}
                placeholder="10"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary font-bold text-navy"
              />
            </div>
          </div>

          {/* Row 4: Warranty terms */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Total Warranty (Months)</label>
              <input
                type="number"
                value={formData.totalWarrantyMonths}
                onChange={(e) => setFormData({ ...formData, totalWarrantyMonths: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Free Replacement (FOC)</label>
              <input
                type="number"
                value={formData.focMonths}
                onChange={(e) => setFormData({ ...formData, focMonths: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Pro-Rata Warranty</label>
              <input
                type="number"
                value={formData.proRataMonths}
                onChange={(e) => setFormData({ ...formData, proRataMonths: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Technology & Image URL */}
          <div>
            <label className="block text-slate-700 font-bold mb-1">Plate / Circuit Technology</label>
            <input
              type="text"
              value={formData.plateTechnology}
              onChange={(e) => setFormData({ ...formData, plateTechnology: e.target.value })}
              placeholder="e.g. Tall Tubular Technology, Pure Sine Wave"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">Image URL</label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="https://..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary text-slate-500 font-mono text-[11px]"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">Bullet Features (Separated by Semicolons)</label>
            <input
              type="text"
              value={formData.features}
              onChange={(e) => setFormData({ ...formData, features: e.target.value })}
              placeholder="Feature 1; Feature 2; Feature 3"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-primary hover:bg-primary-hover disabled:bg-slate-300 text-white font-extrabold px-6 py-2.5 rounded-xl shadow-md shadow-primary/20 transition-all flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Saving to Database...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" /> Add Product
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
