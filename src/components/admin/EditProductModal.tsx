"use client";

import React, { useState, useEffect } from "react";
import { X, Save, Loader2, Package, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";

interface EditProductModalProps {
  product: any | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditProductModal({ product, isOpen, onClose, onSuccess }: EditProductModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    brandName: "",
    modelSku: "",
    brandSeries: "",
    approxMrp: "",
    capacity: "",
    voltage: "",
    plateTechnology: "",
    totalWarrantyMonths: "",
    focMonths: "",
    proRataMonths: "",
    isInStock: true,
    imageUrl: "",
    status: "active",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        brandName: product.brandName || "",
        modelSku: product.modelSku || "",
        brandSeries: product.brandSeries || "",
        approxMrp: product.approxMrp !== undefined ? String(product.approxMrp) : "",
        capacity: product.capacity || "",
        voltage: product.voltage || "12V",
        plateTechnology: product.plateTechnology || "",
        totalWarrantyMonths: product.totalWarrantyMonths !== undefined ? String(product.totalWarrantyMonths) : "60",
        focMonths: product.focMonths !== undefined ? String(product.focMonths) : "36",
        proRataMonths: product.proRataMonths !== undefined ? String(product.proRataMonths) : "24",
        isInStock: product.isInStock !== undefined ? Boolean(product.isInStock) : true,
        imageUrl: product.imageUrl || "",
        status: product.status || "active",
      });
      setError(null);
    }
  }, [product, isOpen]);

  if (!isOpen || !product) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brandName: formData.brandName,
          modelSku: formData.modelSku,
          brandSeries: formData.brandSeries,
          approxMrp: Number(formData.approxMrp) || 0,
          capacity: formData.capacity,
          voltage: formData.voltage,
          plateTechnology: formData.plateTechnology,
          totalWarrantyMonths: Number(formData.totalWarrantyMonths) || 0,
          focMonths: Number(formData.focMonths) || 0,
          proRataMonths: Number(formData.proRataMonths) || 0,
          isInStock: Boolean(formData.isInStock),
          imageUrl: formData.imageUrl,
          status: formData.status,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to update product.");
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to update product");
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
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-extrabold uppercase tracking-wider">
              Edit Catalog SKU
            </div>
            <h2 className="text-2xl font-black text-navy mt-1">
              Edit Product: {formData.modelSku || product.modelSku}
            </h2>
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

          {/* Row 3: Capacity, Voltage, Stock Status */}
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
                placeholder="12V or 24V"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Stock Availability</label>
              <select
                value={formData.isInStock ? "true" : "false"}
                onChange={(e) => setFormData({ ...formData, isInStock: e.target.value === "true" })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary font-semibold"
              >
                <option value="true">In Stock (Available)</option>
                <option value="false">Out of Stock</option>
              </select>
            </div>
          </div>

          {/* Row 4: Plate Technology */}
          <div>
            <label className="block text-slate-700 font-bold mb-1">Plate Technology</label>
            <input
              type="text"
              value={formData.plateTechnology}
              onChange={(e) => setFormData({ ...formData, plateTechnology: e.target.value })}
              placeholder="Tall Tubular Technology, Pure Sine Wave, Flat Plate, etc."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Row 5: Warranty Months Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Total Warranty (M)</label>
              <input
                type="number"
                value={formData.totalWarrantyMonths}
                onChange={(e) => setFormData({ ...formData, totalWarrantyMonths: e.target.value })}
                placeholder="60"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1">Free-of-Cost (FOC)</label>
              <input
                type="number"
                value={formData.focMonths}
                onChange={(e) => setFormData({ ...formData, focMonths: e.target.value })}
                placeholder="36"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1">Pro-Rata Months</label>
              <input
                type="number"
                value={formData.proRataMonths}
                onChange={(e) => setFormData({ ...formData, proRataMonths: e.target.value })}
                placeholder="24"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white"
              />
            </div>
          </div>

          {/* Row 6: Image URL */}
          <div>
            <label className="block text-slate-700 font-bold mb-1">Product Image URL</label>
            <input
              type="text"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="/products/name.jpg or https://..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary font-mono text-[11px]"
            />
          </div>

          {/* Footer Actions */}
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
                  <span>Saving Changes...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
