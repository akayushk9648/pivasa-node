"use client";

import React, { useState } from "react";
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
  Calendar
} from "lucide-react";

interface OrderDetailsModalProps {
  order: any | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (orderId: string, newStatus: string, remarks?: string) => Promise<void>;
}

export default function OrderDetailsModal({
  order,
  isOpen,
  onClose,
  onStatusChange,
}: OrderDetailsModalProps) {
  const [updating, setUpdating] = useState(false);
  const [statusRemark, setStatusRemark] = useState("");

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

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-navy hover:bg-slate-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Customer & Delivery Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
            <span className="text-xs font-black uppercase text-slate-400 tracking-wider">Customer Contact</span>
            <div className="flex items-center gap-2 text-navy font-bold text-sm">
              <User className="h-4 w-4 text-primary shrink-0" />
              <span>{shipping.full_name || "Customer"}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 text-xs font-medium">
              <Phone className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              <span className="font-mono">{shipping.phone || "No phone provided"}</span>
            </div>
            <div className="text-[11px] text-slate-500 pt-1">
              Payment: <strong className="text-navy">{order.paymentMethod}</strong> ({order.paymentStatus})
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
            <span className="text-xs font-black uppercase text-slate-400 tracking-wider">Varanasi Delivery Address</span>
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

        {/* Change Status Action Bar */}
        <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 space-y-3">
          <div className="text-xs font-bold text-navy">Update Fulfillment Status:</div>
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

        {/* Close */}
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
