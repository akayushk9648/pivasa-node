"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/stores/useCartStore";
import { createClient } from "@/utils/supabase/client";
import { 
  ShieldCheck, 
  Truck, 
  MapPin, 
  Phone, 
  User, 
  Sparkles, 
  CheckCircle2, 
  ArrowLeft,
  Lock
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, getTotalExchangeDiscount, getTotalAmount, clearCart } = useCartStore();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    addressLine: "",
    colonyLandmark: "",
    city: "Varanasi",
    state: "Uttar Pradesh",
    pincode: "221005",
    paymentMethod: "COD",
    notes: "",
  });

  const subtotal = getSubtotal();
  const exchangeDiscount = getTotalExchangeDiscount();
  const totalAmount = getTotalAmount();

  if (items.length === 0) {
    return (
      <div className="bg-slate-50 min-h-screen py-20 px-4 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-navy">Your cart is empty</h2>
          <p className="text-xs text-slate-500">Please add items to your cart before proceeding to checkout.</p>
          <Link href="/products" className="inline-block bg-primary text-white font-bold py-2.5 px-6 rounded-xl text-xs">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const generatedOrderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);

    try {
      const orderPayload = {
        customerName: formData.fullName,
        phone: formData.phone,
        addressLine: formData.addressLine,
        colonyLandmark: formData.colonyLandmark,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        paymentMethod: formData.paymentMethod,
        subtotal: subtotal,
        tax: Math.round(subtotal * 0.18),
        totalAmount: totalAmount,
        exchangeDiscount: exchangeDiscount,
        notes: formData.notes,
        items: items.map((it) => ({
          productId: it.product.id,
          quantity: it.quantity,
          priceAtPurchase: it.exchangeOldBattery
            ? Math.max(0, it.product.approx_mrp - it.exchangeDiscountPerUnit)
            : it.product.approx_mrp,
          warrantyApplicable: `${it.product.total_warranty_months} Months (${it.product.foc_months}M FOC + ${it.product.pro_rata_months}M Pro-Rata)`,
        })),
      };

      let finalId = generatedOrderId;

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      if (res.ok) {
        const resData = await res.json();
        if (resData.order?.id) {
          finalId = resData.order.id;
        }
      }

      // Store in session storage as fallback for tracking display
      if (typeof window !== "undefined") {
        sessionStorage.setItem(
          `order_${finalId}`,
          JSON.stringify({
            id: finalId,
            order_date: new Date().toISOString(),
            status: "confirmed",
            payment_status: "unpaid",
            payment_method: formData.paymentMethod,
            customer_name: formData.fullName,
            phone: formData.phone,
            address: `${formData.addressLine}, ${formData.colonyLandmark}, ${formData.city} ${formData.pincode}`,
            total_amount: totalAmount,
            exchange_discount: exchangeDiscount,
            items: items.map((i) => ({
              product_name: `${i.product.brand_name} ${i.product.model_sku}`,
              quantity: i.quantity,
              price: i.product.approx_mrp,
              exchange: i.exchangeOldBattery,
              warranty: `${i.product.total_warranty_months} Months`,
            })),
          })
        );
      }

      clearCart();
      router.push(`/orders/${finalId}`);
    } catch (err) {
      console.error("Order creation error:", err);
      // Fallback
      clearCart();
      router.push(`/orders/${generatedOrderId}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/cart" className="text-xs font-bold text-navy hover:text-primary flex items-center gap-1.5 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Cart
          </Link>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
            <Lock className="h-3.5 w-3.5 text-emerald-600" /> 256-Bit Encrypted Secure Checkout
          </div>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Form: Delivery Address & Contact */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <span className="flex items-center justify-center h-6 w-6 rounded-full bg-navy text-white text-xs font-bold">1</span>
                <h2 className="font-extrabold text-lg text-navy">Delivery Address & Contact in Varanasi</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ayush Sharma"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98393 00000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">House / Flat No. & Street *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 42 Cantt Road / Sundarpur Main Road"
                  value={formData.addressLine}
                  onChange={(e) => setFormData({ ...formData, addressLine: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Colony / Landmark *</label>
                  <input
                    type="text"
                    required
                    placeholder="Near Neelkanth Electronics / BHU Gate"
                    value={formData.colonyLandmark}
                    onChange={(e) => setFormData({ ...formData, colonyLandmark: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Pincode *</label>
                  <input
                    type="text"
                    required
                    placeholder="221005"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5 text-xs text-slate-600">
                <Truck className="h-4 w-4 text-primary shrink-0" />
                <span>Our installation technician will call you before arriving at your address.</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <span className="flex items-center justify-center h-6 w-6 rounded-full bg-navy text-white text-xs font-bold">2</span>
                <h2 className="font-extrabold text-lg text-navy">Payment Method</h2>
              </div>

              <div className="space-y-3">
                <label className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  formData.paymentMethod === "COD" ? "border-primary bg-primary/5" : "border-slate-200 hover:border-slate-300"
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="COD"
                      checked={formData.paymentMethod === "COD"}
                      onChange={() => setFormData({ ...formData, paymentMethod: "COD" })}
                      className="h-4 w-4 text-primary accent-primary"
                    />
                    <div>
                      <span className="font-extrabold text-sm text-navy block">Pay on Installation / Cash on Delivery (COD)</span>
                      <span className="text-xs text-slate-500">Pay cash or UPI to our technician after battery installation & testing</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">Recommended</span>
                </label>

                <label className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  formData.paymentMethod === "UPI" ? "border-primary bg-primary/5" : "border-slate-200 hover:border-slate-300"
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="UPI"
                      checked={formData.paymentMethod === "UPI"}
                      onChange={() => setFormData({ ...formData, paymentMethod: "UPI" })}
                      className="h-4 w-4 text-primary accent-primary"
                    />
                    <div>
                      <span className="font-extrabold text-sm text-navy block">UPI / QR Scan</span>
                      <span className="text-xs text-slate-500">Google Pay, PhonePe, Paytm, BHIM UPI</span>
                    </div>
                  </div>
                </label>
              </div>
            </div>

          </div>

          {/* Right Summary: Order Ledger */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="font-black text-lg text-navy tracking-tight pb-3 border-b border-slate-100">
              Order Review
            </h2>

            {/* Line Items List */}
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {items.map((it) => (
                <div key={it.productId} className="flex items-center justify-between text-xs py-2 border-b border-slate-100">
                  <div className="pr-3">
                    <div className="font-bold text-navy">{it.product.brand_name} {it.product.model_sku}</div>
                    <div className="text-slate-400">Qty: {it.quantity} {it.exchangeOldBattery ? "• (Old Scrap Deducted)" : ""}</div>
                  </div>
                  <span className="font-extrabold text-navy shrink-0">
                    ₹{(
                      (it.exchangeOldBattery ? Math.max(0, it.product.approx_mrp - it.exchangeDiscountPerUnit) : it.product.approx_mrp) * it.quantity
                    ).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculation Totals */}
            <div className="space-y-2.5 text-xs text-slate-600 pt-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-navy">₹{subtotal.toLocaleString("en-IN")}</span>
              </div>

              {exchangeDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                  <span className="flex items-center gap-1">
                    <Sparkles className="h-3 w-3" /> Old Scrap Discount
                  </span>
                  <span>- ₹{exchangeDiscount.toLocaleString("en-IN")}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Free On-Site Installation</span>
                <span className="font-bold text-emerald-600">FREE</span>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline">
                <span className="font-bold text-sm text-navy">Net Payable Amount</span>
                <span className="text-2xl font-black text-navy">₹{totalAmount.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-hover disabled:bg-slate-400 text-white font-extrabold py-4 px-6 rounded-xl text-sm shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? "Confirming Order..." : "Confirm & Place Order"}
            </button>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5 text-[11px] text-slate-600">
              <ShieldCheck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span>
                <strong>Authorized Dealer Promise:</strong> You will receive an official brand warranty stamped card & tax invoice upon installation.
              </span>
            </div>

          </div>

        </form>

      </div>
    </div>
  );
}
