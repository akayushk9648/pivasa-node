"use client";

import React, { useState, useEffect } from "react";
import OrderDetailsModal from "@/components/admin/OrderDetailsModal";
import { 
  ShoppingCart, 
  Search, 
  Truck, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  RefreshCw,
  Eye,
  Filter,
  Layers
} from "lucide-react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterQuery, setFilterQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const loadOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders || []);
      } else {
        showToast("Error loading orders: " + data.error);
      }
    } catch (err: any) {
      showToast("Failed to connect to order server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleUpdateStatus = async (orderId: string, newStatus: string, remarks?: string) => {
    // Optimistic Update
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );

    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev: any) => ({ ...prev, status: newStatus }));
    }

    try {
      const res = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, remarks }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to update status");
      }

      showToast(`Order status updated to '${newStatus.toUpperCase()}'`);
      loadOrders(); // Refresh to update timeline
    } catch (err: any) {
      showToast("Status update failed: " + err.message);
      loadOrders();
    }
  };

  const filtered = orders.filter((o) => {
    const shipping = (o.shippingAddress as any) || {};
    const name = (shipping.full_name || "").toLowerCase();
    const phone = (shipping.phone || "").toLowerCase();
    const orderId = (o.id || "").toLowerCase();
    const q = filterQuery.toLowerCase();

    const matchesSearch = name.includes(q) || phone.includes(q) || orderId.includes(q);
    const matchesStatus = statusFilter === "all" || o.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <main className="flex-1 flex flex-col overflow-y-auto font-sans">
      
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm shrink-0">
        <div>
          <h1 className="text-2xl font-black text-navy">Order Fulfillment & Delivery Hub</h1>
          <p className="text-xs text-slate-400 mt-0.5">Manage customer confirmation, dispatch tracking & status transitions</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => loadOrders()}
            className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
            title="Refresh Orders"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin text-primary" : ""}`} />
          </button>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-navy focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="processing">Processing</option>
            <option value="shipped">Out for Delivery</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <div className="relative w-60">
            <input
              type="text"
              placeholder="Search customer, phone, ID..."
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
              <RefreshCw className="h-4 w-4 animate-spin text-primary" /> Loading live customer orders...
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center space-y-2">
              <ShoppingCart className="h-10 w-10 text-slate-300 mx-auto" />
              <div className="text-sm font-bold text-navy">No orders found</div>
              <p className="text-xs text-slate-400">Customer orders placed on storefront will appear here live.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-400 uppercase tracking-wider font-extrabold border-b border-slate-100">
                  <tr>
                    <th className="py-3.5 px-5">Order ID & Date</th>
                    <th className="py-3.5 px-4">Customer & Phone</th>
                    <th className="py-3.5 px-4">Varanasi Delivery Address</th>
                    <th className="py-3.5 px-4">Items Summary</th>
                    <th className="py-3.5 px-4">Invoice Amount</th>
                    <th className="py-3.5 px-5 text-right">Fulfillment Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filtered.map((ord) => {
                    const shipping = (ord.shippingAddress as any) || {};
                    const items = ord.items || [];
                    const itemsSummary = items.length > 0
                      ? items.map((it: any) => `${it.quantity}x ${it.product?.modelSku || "Battery/Inverter"}`).join(", ")
                      : "Standard Order Items";

                    return (
                      <tr 
                        key={ord.id} 
                        className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                        onClick={() => setSelectedOrder(ord)}
                      >
                        <td className="py-3.5 px-5 font-bold text-navy">
                          <div className="font-extrabold flex items-center gap-1.5">
                            <span className="truncate max-w-[120px] font-mono">{ord.id}</span>
                            <Eye className="h-3.5 w-3.5 text-slate-400 hover:text-primary" />
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
                            {new Date(ord.orderDate || ord.createdAt).toLocaleDateString("en-IN")}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-slate-700">
                          <span className="font-bold text-navy block">{shipping.full_name || "Customer"}</span>
                          <span className="text-[10px] text-slate-500 font-mono">{shipping.phone || "-"}</span>
                        </td>

                        <td className="py-3.5 px-4 text-slate-600 max-w-xs truncate">
                          {shipping.address_line1}, {shipping.city}
                        </td>

                        <td className="py-3.5 px-4 text-slate-700 font-semibold max-w-xs truncate">
                          {itemsSummary}
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="font-black text-navy text-sm block font-mono">
                            ₹{parseFloat(ord.totalAmount || "0").toLocaleString("en-IN")}
                          </span>
                          <span className="text-[10px] text-slate-400">{ord.paymentMethod}</span>
                        </td>

                        <td className="py-3.5 px-5 text-right" onClick={(e) => e.stopPropagation()}>
                          <select
                            value={ord.status}
                            onChange={(e) => handleUpdateStatus(ord.id, e.target.value)}
                            className={`text-xs font-bold py-1.5 px-3 rounded-xl border cursor-pointer focus:outline-none ${
                              ord.status === "confirmed"
                                ? "bg-blue-50 text-blue-800 border-blue-200"
                                : ord.status === "processing"
                                ? "bg-amber-50 text-amber-800 border-amber-200"
                                : ord.status === "shipped"
                                ? "bg-indigo-50 text-indigo-800 border-indigo-200"
                                : ord.status === "delivered"
                                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                                : "bg-slate-50 text-slate-800 border-slate-200"
                            }`}
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Out for Delivery</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
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

      {/* Order Details Drawer / Modal */}
      <OrderDetailsModal
        order={selectedOrder}
        isOpen={Boolean(selectedOrder)}
        onClose={() => setSelectedOrder(null)}
        onStatusChange={handleUpdateStatus}
      />

    </main>
  );
}
