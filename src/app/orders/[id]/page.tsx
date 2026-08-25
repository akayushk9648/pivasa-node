"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  CheckCircle2, 
  Clock, 
  Truck, 
  Wrench, 
  ShieldCheck, 
  PhoneCall, 
  Sparkles, 
  ArrowRight,
  PackageCheck
} from "lucide-react";

export default function OrderTrackingPage() {
  const params = useParams();
  const orderId = (params?.id as string) || "ORD-000000";

  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cached = sessionStorage.getItem(`order_${orderId}`);
      if (cached) {
        setOrder(JSON.parse(cached));
      } else {
        // Fallback demo order
        setOrder({
          id: orderId,
          order_date: new Date().toISOString(),
          status: "confirmed",
          payment_status: "unpaid",
          payment_method: "COD (Pay on Installation)",
          customer_name: "Customer",
          phone: "+91 98393 00000",
          address: "Varanasi, Uttar Pradesh",
          total_amount: 18500,
          exchange_discount: 2500,
          items: [
            {
              product_name: "Exide Inva Tubular IT500 150Ah",
              quantity: 1,
              price: 18500,
              exchange: true,
              warranty: "60 Months",
            },
          ],
        });
      }
    }
  }, [orderId]);

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Success Banner */}
        <div className="bg-navy text-white p-8 sm:p-10 rounded-3xl shadow-xl border border-navy-light text-center space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-primary/20 rounded-full blur-2xl pointer-events-none" />

          <div className="h-16 w-16 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="h-10 w-10" />
          </div>

          <div>
            <span className="text-xs font-black uppercase tracking-widest text-emerald-400">Order Confirmed</span>
            <h1 className="text-3xl sm:text-4xl font-black text-white mt-1">Thank You For Your Order!</h1>
            <p className="text-sm text-slate-300 mt-2 max-w-md mx-auto">
              Our battery installation team in Varanasi has received your order and will dispatch shortly.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 bg-navy-light/80 px-4 py-2 rounded-xl text-xs font-mono text-slate-300 border border-white/10">
            Order Reference: <strong className="text-white font-bold">{orderId}</strong>
          </div>
        </div>

        {/* Live Order Timeline Stepper */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h2 className="font-extrabold text-base text-navy tracking-tight">Delivery & Installation Progress</h2>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
            
            {/* Step 1 */}
            <div className="flex sm:flex-col items-center sm:text-center gap-3">
              <div className="h-10 w-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-md">
                ✓
              </div>
              <div>
                <span className="font-bold text-xs text-navy block">Order Placed</span>
                <span className="text-[10px] text-slate-400">Verified by Store</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex sm:flex-col items-center sm:text-center gap-3">
              <div className="h-10 w-10 rounded-full bg-navy text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-md">
                <Clock className="h-4 w-4 text-primary" />
              </div>
              <div>
                <span className="font-bold text-xs text-navy block">Allocated to Engineer</span>
                <span className="text-[10px] text-emerald-600 font-semibold">In Progress</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex sm:flex-col items-center sm:text-center gap-3 opacity-60">
              <div className="h-10 w-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-bold text-xs shrink-0 border border-slate-200">
                <Truck className="h-4 w-4" />
              </div>
              <div>
                <span className="font-bold text-xs text-slate-700 block">Out for Delivery</span>
                <span className="text-[10px] text-slate-400">Varanasi Local Hub</span>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex sm:flex-col items-center sm:text-center gap-3 opacity-60">
              <div className="h-10 w-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-bold text-xs shrink-0 border border-slate-200">
                <Wrench className="h-4 w-4" />
              </div>
              <div>
                <span className="font-bold text-xs text-slate-700 block">Installed & Tested</span>
                <span className="text-[10px] text-slate-400">Warranty Card Stamped</span>
              </div>
            </div>

          </div>
        </div>

        {/* Order Details & Summary Card */}
        {order && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="font-extrabold text-base text-navy">Order Summary Details</h2>
              <span className="text-xs font-bold text-slate-500">
                Payment: <strong className="text-navy">{order.payment_method}</strong>
              </span>
            </div>

            <div className="space-y-3">
              {order.items?.map((it: any, index: number) => (
                <div key={index} className="flex items-center justify-between text-xs py-2 border-b border-slate-100">
                  <div>
                    <span className="font-bold text-navy text-sm block">{it.product_name}</span>
                    <span className="text-slate-500">
                      Qty: {it.quantity} • Warranty: {it.warranty} {it.exchange ? "• (Old Scrap Deducted)" : ""}
                    </span>
                  </div>
                  <span className="font-black text-navy text-sm">
                    ₹{(it.price * it.quantity).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-between items-baseline text-sm">
              <span className="font-bold text-slate-600">Total Payable Amount:</span>
              <span className="text-2xl font-black text-navy">₹{order.total_amount?.toLocaleString("en-IN")}</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-xs text-slate-600">
                <PhoneCall className="h-5 w-5 text-primary shrink-0" />
                <span>Need urgent delivery status? Call our Varanasi Store Manager</span>
              </div>
              <a
                href="tel:+919839302493"
                className="bg-navy hover:bg-navy-light text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors shrink-0"
              >
                +91 98393 02493
              </a>
            </div>
          </div>
        )}

        <div className="text-center pt-4">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs font-bold text-navy hover:text-primary transition-colors"
          >
            Continue Browsing Catalog <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
