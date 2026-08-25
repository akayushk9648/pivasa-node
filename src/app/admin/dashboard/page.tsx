"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import BulkUploadModal from "@/components/admin/BulkUploadModal";
import AddProductModal from "@/components/admin/AddProductModal";
import { 
  TrendingUp, 
  ShoppingCart, 
  Package, 
  Users, 
  Upload, 
  Plus, 
  Search, 
  Sparkles, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  Trash2, 
  ExternalLink,
  Layers
} from "lucide-react";

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isBulkOpen, setIsBulkOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [filterQuery, setFilterQuery] = useState("");
  const [brandFilter, setBrandFilter] = useState("all");
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [prodRes, ordRes] = await Promise.all([
        fetch("/api/admin/products"),
        fetch("/api/admin/orders"),
      ]);
      const prodData = await prodRes.json();
      const ordData = await ordRes.json();

      if (prodData.success) {
        setProducts(prodData.products || []);
      }
      if (ordData.success) {
        setOrders(ordData.orders || []);
      }
    } catch (err: any) {
      showToast("Error loading catalog data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const toggleProductStock = async (id: string, currentStockState: boolean) => {
    const nextState = !currentStockState;
    // Optimistic update
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isInStock: nextState } : p))
    );

    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isInStock: nextState }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to update stock");
      }
      showToast(`Stock status updated to ${nextState ? "IN STOCK" : "OUT OF STOCK"}`);
    } catch (err: any) {
      // Revert optimistic update
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, isInStock: currentStockState } : p))
      );
      showToast("Failed to save stock toggle: " + err.message);
    }
  };

  const handleDeleteProduct = async (id: string, sku: string) => {
    if (!confirm(`Are you sure you want to delete product SKU '${sku}'?`)) return;

    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        showToast(`Product ${sku} deleted.`);
        loadData();
      } else {
        showToast("Error deleting: " + data.error);
      }
    } catch (err: any) {
      showToast("Error deleting product.");
    }
  };

  const inStockCount = products.filter((p) => p.isInStock).length;
  const outOfStockCount = products.length - inStockCount;
  const activeOrdersCount = orders.filter((o) => o.status !== "delivered" && o.status !== "cancelled").length;

  const brands = Array.from(new Set(products.map((p) => p.brandName).filter(Boolean)));

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.brandName?.toLowerCase().includes(filterQuery.toLowerCase()) ||
      p.modelSku?.toLowerCase().includes(filterQuery.toLowerCase()) ||
      p.link?.toLowerCase().includes(filterQuery.toLowerCase());
    const matchesBrand = brandFilter === "all" || p.brandName === brandFilter;
    return matchesSearch && matchesBrand;
  });

  return (
    <main className="flex-1 flex flex-col overflow-y-auto font-sans">
      
      {/* Top Action Bar */}
      <header className="bg-white border-b border-slate-200 px-8 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm shrink-0">
        <div>
          <h1 className="text-2xl font-black text-navy">Operations & Inventory Control Hub</h1>
          <p className="text-xs text-slate-400 mt-0.5">Varanasi Central Warehouse • Real-Time Database Management</p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => loadData()}
            className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
            title="Refresh Data"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin text-primary" : ""}`} />
          </button>

          <button
            onClick={() => setIsAddOpen(true)}
            className="bg-navy hover:bg-navy-light text-white font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-sm transition-all"
          >
            <Plus className="h-4 w-4" /> Add Product
          </button>

          <button
            onClick={() => setIsBulkOpen(true)}
            className="bg-primary hover:bg-primary-hover text-white font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-md shadow-primary/20 hover:shadow-primary/40 transition-all"
          >
            <Upload className="h-4 w-4" /> Bulk Upload XLSX
          </button>
        </div>
      </header>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-navy text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-2 text-xs font-bold animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      <div className="p-8 space-y-8 max-w-7xl">
        
        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1.5">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Products</span>
            <div className="text-2xl font-black text-navy">{products.length}</div>
            <span className="text-[11px] text-slate-500 font-semibold">Live in catalog</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1.5">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">In Stock Ready</span>
            <div className="text-2xl font-black text-emerald-600">{inStockCount}</div>
            <span className="text-[11px] text-emerald-700 font-semibold">Available for storefront purchase</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1.5">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Stock Alerts</span>
            <div className="text-2xl font-black text-primary">{outOfStockCount}</div>
            <span className="text-[11px] text-rose-600 font-semibold">Needs restock attention</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1.5">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Orders</span>
            <div className="text-2xl font-black text-navy">{activeOrdersCount}</div>
            <span className="text-[11px] text-amber-600 font-semibold">Fulfillment pending</span>
          </div>
        </div>

        {/* Product Catalog & Live Stock Toggle Panel */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          
          {/* Table Header & Controls */}
          <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="font-extrabold text-base text-navy">Live Product Catalog & Stock Toggles</h3>
              <p className="text-xs text-slate-400">
                Toggling storefront stock status saves immediately to the PostgreSQL database.
              </p>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <select
                value={brandFilter}
                onChange={(e) => setBrandFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-navy focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Brands</option>
                {brands.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>

              <div className="relative flex-1 md:w-60">
                <input
                  type="text"
                  placeholder="Filter by SKU or brand..."
                  value={filterQuery}
                  onChange={(e) => setFilterQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                />
                <Search className="absolute left-3 top-2 h-3.5 w-3.5 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Table Content */}
          {loading ? (
            <div className="p-12 text-center text-slate-400 text-xs font-bold flex items-center justify-center gap-2">
              <RefreshCw className="h-4 w-4 animate-spin text-primary" /> Loading products from database...
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <Layers className="h-10 w-10 text-slate-300 mx-auto" />
              <div className="text-sm font-bold text-navy">No products found</div>
              <p className="text-xs text-slate-400">Add a product or seed default inventory to get started.</p>
              <button
                onClick={() => setIsAddOpen(true)}
                className="inline-flex items-center gap-1.5 bg-primary text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm"
              >
                <Plus className="h-4 w-4" /> Add Product Now
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-400 uppercase tracking-wider font-extrabold border-b border-slate-100">
                  <tr>
                    <th className="py-3.5 px-5">Product / Model SKU</th>
                    <th className="py-3.5 px-4">Brand & Series</th>
                    <th className="py-3.5 px-4">Capacity & Voltage</th>
                    <th className="py-3.5 px-4">Warranty</th>
                    <th className="py-3.5 px-4">Approx MRP</th>
                    <th className="py-3.5 px-5 text-right">Storefront Stock Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredProducts.map((prod) => (
                    <tr key={prod.id} className="hover:bg-slate-50/70 transition-colors">
                      
                      {/* SKU & Image */}
                      <td className="py-3.5 px-5 font-bold text-navy flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg bg-slate-100 p-1 shrink-0 flex items-center justify-center overflow-hidden border border-slate-200">
                          {prod.imageUrl ? (
                            <img src={prod.imageUrl} alt="" className="h-full w-full object-contain" />
                          ) : (
                            <span className="text-sm">⚡</span>
                          )}
                        </div>
                        <div>
                          <div className="font-extrabold">{prod.modelSku}</div>
                          <Link 
                            href={`/products/${prod.link}`} 
                            target="_blank"
                            className="text-[10px] text-slate-400 hover:text-primary font-mono flex items-center gap-1"
                          >
                            <span>/{prod.link}</span>
                            <ExternalLink className="h-2.5 w-2.5" />
                          </Link>
                        </div>
                      </td>

                      {/* Brand & Series */}
                      <td className="py-3.5 px-4 text-slate-700">
                        <span className="font-bold text-navy">{prod.brandName}</span>
                        <div className="text-[10px] text-slate-400">{prod.brandSeries || "-"}</div>
                      </td>

                      {/* Capacity & Voltage */}
                      <td className="py-3.5 px-4 text-slate-700">
                        <span className="font-bold">{prod.capacity || "N/A"}</span>
                        <span className="text-[10px] text-slate-400 block">{prod.voltage || "12V"}</span>
                      </td>

                      {/* Warranty */}
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-navy">{prod.totalWarrantyMonths}M</span>
                        <span className="text-[10px] text-slate-400 block">({prod.focMonths}F + {prod.proRataMonths}P)</span>
                      </td>

                      {/* MRP */}
                      <td className="py-3.5 px-4 font-extrabold text-navy font-mono">
                        ₹{parseFloat(prod.approxMrp || "0").toLocaleString("en-IN")}
                      </td>

                      {/* Live Stock Toggle & Delete */}
                      <td className="py-3.5 px-5 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => toggleProductStock(prod.id, prod.isInStock)}
                            className={`px-3 py-1.5 rounded-xl font-extrabold text-xs shadow-xs transition-all cursor-pointer ${
                              prod.isInStock
                                ? "bg-emerald-100 hover:bg-emerald-200 text-emerald-800 border border-emerald-300"
                                : "bg-rose-100 hover:bg-rose-200 text-rose-800 border border-rose-300"
                            }`}
                          >
                            {prod.isInStock ? "✓ In Stock" : "✗ Out of Stock"}
                          </button>

                          <button
                            onClick={() => handleDeleteProduct(prod.id, prod.modelSku)}
                            className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>

      </div>

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSuccess={() => {
          showToast("Product successfully created in database!");
          loadData();
        }}
      />

      {/* Bulk Upload Modal */}
      <BulkUploadModal
        isOpen={isBulkOpen}
        onClose={() => setIsBulkOpen(false)}
        onSuccess={() => {
          showToast("Bulk Excel ingestion complete!");
          loadData();
        }}
      />

    </main>
  );
}
