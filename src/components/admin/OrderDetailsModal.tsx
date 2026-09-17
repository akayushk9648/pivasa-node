"use client";

import React, { useState, useEffect } from "react";
import { 
  X, 
  ShoppingCart, 
  MapPin, 
  Phone, 
  User, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Truck, 
  AlertCircle,
  Loader2,
  Calendar,
  Pencil,
  Save,
  RotateCcw,
  CreditCard
} from "lucide-react";

interface OrderDetailsModalProps {
  order: any | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (orderId: string, newStatus: string, remarks?: string) => Promise<void>;
  onOrderUpdated?: () => void;
}

export default function OrderDetailsModal({
  order,
  isOpen,
  onClose,
  onStatusChange,
  onOrderUpdated,
}: OrderDetailsModalProps) {
  const [updating, setUpdating] = useState(false);
  const [savingEdit, setSavingEdit] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [statusRemark, setStatusRemark] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Editable fields state
  const [editFormData, setEditFormData] = useState({
    fullName: "",
    phone: "",
    addressLine1: "",
    colonyLandmark: "",
    city: "Varanasi",
    state: "Uttar Pradesh",
    pincode: "",
    paymentStatus: "unpaid",
    paymentMethod: "COD",
    status: "pending",
    remarks: "",
  });

  // Sync state whenever order opens or changes
  useEffect(() => {
    if (order) {
      const shipping = (order.shippingAddress as any) || {};
      setEditFormData({
        fullName: shipping.full_name || "",
        phone: shipping.phone || "",
        addressLine1: shipping.address_line1 || "",
        colonyLandmark: shipping.colony_landmark || "",
        city: shipping.city || "Varanasi",
        state: shipping.state || "Uttar Pradesh",
        pincode: shipping.pincode || "",
        paymentStatus: order.paymentStatus || "unpaid",
        paymentMethod: order.paymentMethod || "COD",
        status: order.status || "pending",
        remarks: "",
      });
      setIsEditing(false);
      setErrorMsg(null);
      setSuccessMsg(null);
    }
  }, [order]);

  if (!isOpen || !order) return null;

  const shipping = (order.shippingAddress as any) || {};
  const items = order.items || [];
  const history = order.statusHistory || [];

  const handleStatusSubmit = async (newStatus: string) => {
    setUpdating(true);
    try {
      await onStatusChange(order.id, newStatus, statusRemark);
      setStatusRemark("");
    } finally {
      setUpdating(false);
    }
  };

  const handleSaveOrderEdits = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingEdit(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const payload = {
        shippingAddress: {
          full_name: editFormData.fullName,
          phone: editFormData.phone,
          address_line1: editFormData.addressLine1,
          colony_landmark: editFormData.colonyLandmark,
          city: editFormData.city,
          state: editFormData.state,
          pincode: editFormData.pincode,
        },
        paymentStatus: editFormData.paymentStatus,
        paymentMethod: editFormData.paymentMethod,
        status: editFormData.status,
        remarks: editFormData.remarks || `Order & delivery details updated by admin`,
      };

      const res = await fetch(`/api/admin/orders/${order.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to update order details");
      }

      setSuccessMsg("Order information updated successfully!");
      setIsEditing(false);
      if (onOrderUpdated) {
        onOrderUpdated();
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to save order modifications.");
    } finally {
      setSavingEdit(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-dark/70 backdrop-blur-sm">
      <div className="bg-white w-full max-w-3xl rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-2">
              <span className="text-xs font-black uppercase text-primary tracking-wider">
                Order Fulfillment
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                order.status === "confirmed"
                  ? "bg-blue-100 text-blue-800"
                  : order.status === "processing"
                  ? "bg-amber-100 text-amber-800"
                  : order.status === "shipped"
                  ? "bg-indigo-100 text-indigo-800"
                  : order.status === "delivered"
                  ? "bg-emerald-100 text-emerald-800"
                  : order.status === "cancelled"
                  ? "bg-rose-100 text-rose-800"
                  : "bg-slate-100 text-slate-800"
              }`}>
                {order.status}
              </span>
            </div>
            <h2 className="text-2xl font-black text-navy mt-1">Order #{order.id}</h2>
            <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              Placed on {new Date(order.orderDate || order.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                isEditing
                  ? "bg-slate-100 text-slate-700 border-slate-300"
                  : "bg-primary/10 text-primary hover:bg-primary/20 border-primary/20"
              }`}
            >
              {isEditing ? (
                <>
                  <RotateCcw className="h-3.5 w-3.5" /> Cancel Edit
                </>
              ) : (
                <>
                  <Pencil className="h-3.5 w-3.5" /> Edit Order Details
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-navy hover:bg-slate-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Success / Error Alerts */}
        {errorMsg && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
        {successMsg && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* EDIT FORM MODE */}
        {isEditing ? (
          <form onSubmit={handleSaveOrderEdits} className="space-y-4 bg-slate-50/70 p-5 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="text-xs font-black uppercase text-navy tracking-wider flex items-center gap-1.5">
                <Pencil className="h-3.5 w-3.5 text-primary" /> Edit Customer & Payment Details
              </span>
              <span className="text-[11px] text-slate-400">Direct PostgreSQL Database Sync</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Customer Full Name</label>
                <input
                  type="text"
                  required
                  value={editFormData.fullName}
                  onChange={(e) => setEditFormData({ ...editFormData, fullName: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                  placeholder="e.g. Ramesh Chandra"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={editFormData.phone}
                  onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-mono font-semibold rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                  placeholder="e.g. +91 9876543210"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Delivery Address Line 1</label>
                <input
                  type="text"
                  required
                  value={editFormData.addressLine1}
                  onChange={(e) => setEditFormData({ ...editFormData, addressLine1: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                  placeholder="e.g. Plot No. 42, Sigra Cantt Road"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Colony / Landmark</label>
                <input
                  type="text"
                  value={editFormData.colonyLandmark}
                  onChange={(e) => setEditFormData({ ...editFormData, colonyLandmark: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                  placeholder="e.g. Near Shiv Temple"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Pincode</label>
                <input
                  type="text"
                  required
                  value={editFormData.pincode}
                  onChange={(e) => setEditFormData({ ...editFormData, pincode: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-mono font-semibold rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                  placeholder="221005"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">City</label>
                <input
                  type="text"
                  value={editFormData.city}
                  onChange={(e) => setEditFormData({ ...editFormData, city: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">State</label>
                <input
                  type="text"
                  value={editFormData.state}
                  onChange={(e) => setEditFormData({ ...editFormData, state: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Payment Status</label>
                <select
                  value={editFormData.paymentStatus}
                  onChange={(e) => setEditFormData({ ...editFormData, paymentStatus: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                >
                  <option value="unpaid">Unpaid / Pending</option>
                  <option value="paid">Paid</option>
                  <option value="refunded">Refunded</option>
                  <option value="failed">Failed</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Payment Method</label>
                <input
                  type="text"
                  value={editFormData.paymentMethod}
                  onChange={(e) => setEditFormData({ ...editFormData, paymentMethod: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                  placeholder="COD / UPI / Net Banking"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Order Status</label>
                <select
                  value={editFormData.status}
                  onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped / Out for Delivery</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Admin Change Note / Remarks</label>
                <input
                  type="text"
                  value={editFormData.remarks}
                  onChange={(e) => setEditFormData({ ...editFormData, remarks: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-medium rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                  placeholder="e.g. Corrected recipient mobile number per call"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={savingEdit}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-primary hover:bg-primary-hover text-white shadow-md flex items-center gap-1.5 transition-all disabled:opacity-50"
              >
                {savingEdit ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" /> Saving Changes...
                  </>
                ) : (
                  <>
                    <Save className="h-3.5 w-3.5" /> Save Order Updates
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          /* READ ONLY VIEW MODE */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-slate-400 tracking-wider">Customer Contact</span>
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="text-[11px] text-primary font-bold hover:underline flex items-center gap-1"
                >
                  <Pencil className="h-3 w-3" /> Edit
                </button>
              </div>
              <div className="flex items-center gap-2 text-navy font-bold text-sm">
                <User className="h-4 w-4 text-primary shrink-0" />
                <span>{shipping.full_name || "Customer"}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 text-xs font-medium">
                <Phone className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                <span className="font-mono">{shipping.phone || "No phone provided"}</span>
              </div>
              <div className="text-[11px] text-slate-500 pt-1 flex items-center gap-1.5">
                <CreditCard className="h-3.5 w-3.5 text-slate-400" />
                <span>Payment: <strong className="text-navy">{order.paymentMethod}</strong> ({order.paymentStatus})</span>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-slate-400 tracking-wider">Delivery Address</span>
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="text-[11px] text-primary font-bold hover:underline flex items-center gap-1"
                >
                  <Pencil className="h-3 w-3" /> Edit
                </button>
              </div>
              <div className="flex items-start gap-2 text-slate-700 text-xs font-medium">
                <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-navy">{shipping.address_line1 || "Varanasi Delivery Point"}</p>
                  {shipping.colony_landmark && <p className="text-slate-500">{shipping.colony_landmark}</p>}
                  <p className="text-slate-500 font-mono text-[11px]">
                    {shipping.city || "Varanasi"}, {shipping.state || "Uttar Pradesh"} - {shipping.pincode || "221005"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Items List */}
        <div className="space-y-3">
          <h3 className="font-extrabold text-navy text-sm">Ordered Products & Line Items</h3>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-400 uppercase font-extrabold border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4">Item / SKU</th>
                  <th className="py-3 px-4">Warranty</th>
                  <th className="py-3 px-4 text-center">Qty</th>
                  <th className="py-3 px-4 text-right">Unit Price</th>
                  <th className="py-3 px-4 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {items.length > 0 ? (
                  items.map((it: any, idx: number) => {
                    const price = parseFloat(it.priceAtPurchase || "0");
                    const total = price * (it.quantity || 1);
                    return (
                      <tr key={idx} className="hover:bg-slate-50/60">
                        <td className="py-3 px-4 font-bold text-navy">
                          <div>{it.product?.brandName} {it.product?.modelSku || "Custom Battery / Inverter"}</div>
                          <span className="text-[10px] text-slate-400 font-mono">{it.product?.capacity}</span>
                        </td>
                        <td className="py-3 px-4 text-slate-600 text-[11px]">{it.warrantyApplicable || "Standard Warranty"}</td>
                        <td className="py-3 px-4 text-center font-bold">{it.quantity}</td>
                        <td className="py-3 px-4 text-right font-mono">₹{price.toLocaleString("en-IN")}</td>
                        <td className="py-3 px-4 text-right font-black text-navy font-mono">₹{total.toLocaleString("en-IN")}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="py-4 text-center text-slate-400">
                      Standard Battery System Order
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot className="bg-slate-50/80 font-bold border-t border-slate-200">
                <tr>
                  <td colSpan={4} className="py-3 px-4 text-right text-slate-600">Total Invoice Amount (Incl. GST):</td>
                  <td className="py-3 px-4 text-right text-sm font-black text-navy font-mono">
                    ₹{parseFloat(order.totalAmount || "0").toLocaleString("en-IN")}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Status Transition History */}
        {history.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-extrabold text-navy text-sm">Fulfillment Audit Timeline</h3>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
              {history.map((h: any, idx: number) => (
                <div key={idx} className="flex items-start gap-3 text-xs">
                  <div className="h-6 w-6 rounded-full bg-navy/10 text-primary flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-navy uppercase text-[11px]">{h.status}</span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {new Date(h.changedAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
                      </span>
                    </div>
                    {h.remarks && <p className="text-slate-600 text-[11px] mt-0.5">{h.remarks}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Status Update Bar */}
        <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 space-y-3">
          <div className="text-xs font-bold text-navy">Quick Update Fulfillment Status:</div>
          <div className="flex flex-wrap items-center gap-2">
            {["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"].map((st) => (
              <button
                key={st}
                disabled={updating || order.status === st}
                onClick={() => handleStatusSubmit(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                  order.status === st
                    ? "bg-navy text-white shadow-sm"
                    : "bg-white text-slate-700 hover:bg-slate-200 border border-slate-300 disabled:opacity-50"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Close Window */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-navy hover:bg-navy-light text-white font-bold text-xs transition-colors"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
}
