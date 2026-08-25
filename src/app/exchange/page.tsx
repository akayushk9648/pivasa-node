import React from "react";
import Link from "next/link";
import { Sparkles, RotateCcw, CheckCircle2, ShieldCheck, ArrowRight, Truck } from "lucide-react";

export default function ExchangePage() {
  const scrapRates = [
    { capacity: "200Ah - 240Ah Tubular Battery", scrapDiscount: "₹3,000" },
    { capacity: "150Ah - 160Ah Tubular Battery", scrapDiscount: "₹2,500" },
    { capacity: "100Ah - 135Ah Inverter Battery", scrapDiscount: "₹1,800" },
    { capacity: "50Ah - 80Ah Automotive Battery", scrapDiscount: "₹1,200" },
    { capacity: "35Ah - 45Ah Small Car Battery", scrapDiscount: "₹800" },
    { capacity: "Two-Wheeler Bike Battery", scrapDiscount: "₹200 - ₹300" },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Header */}
      <section className="bg-navy text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-navy-light/60">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-primary">Recycle & Save</span>
          <h1 className="text-3xl sm:text-4xl font-black text-white">Old Battery Scrap Trade-in Value</h1>
          <p className="text-slate-300 text-sm">Trade in your old damaged/dead batteries of any brand for an instant cash discount on new orders.</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        
        {/* Valuation Table */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-navy">Scrap Trade-in Valuation Chart</h2>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
              Accepts Any Brand
            </span>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-400 uppercase tracking-wider font-extrabold border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-5">Old Scrap Battery Type / Capacity</th>
                  <th className="py-3.5 px-5 text-right">Instant Scrap Discount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {scrapRates.map((r, i) => (
                  <tr key={i} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-5 font-bold text-navy">{r.capacity}</td>
                    <td className="py-3.5 px-5 text-right font-black text-emerald-700 text-sm">
                      {r.scrapDiscount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-[11px] text-slate-500 leading-relaxed">
            * Discounts are applied instantly on the product detail page and cart when you select <strong>&quot;Exchange Old Scrap Battery&quot;</strong>. Our delivery technician will collect the scrap unit during installation in Varanasi.
          </p>
        </div>

        {/* How It Works */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-xl font-black text-navy">How Doorstep Scrap Exchange Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="h-8 w-8 rounded-lg bg-navy text-white flex items-center justify-center font-bold">1</div>
              <h3 className="font-bold text-navy text-sm">Order with Scrap Option</h3>
              <p className="text-slate-500">Check the scrap exchange box on product or cart page to deduct the discount from your bill.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="h-8 w-8 rounded-lg bg-navy text-white flex items-center justify-center font-bold">2</div>
              <h3 className="font-bold text-navy text-sm">Technician Doorstep Delivery</h3>
              <p className="text-slate-500">Our technician delivers the fresh battery and inspects the physical casing of your old battery.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="h-8 w-8 rounded-lg bg-navy text-white flex items-center justify-center font-bold">3</div>
              <h3 className="font-bold text-navy text-sm">Collection & Net Payment</h3>
              <p className="text-slate-500">Hand over the old scrap battery and pay only the discounted net balance via cash or UPI.</p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center pt-4">
          <Link
            href="/products?category=inverter-batteries"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-extrabold py-4 px-8 rounded-xl text-sm shadow-md shadow-primary/20 transition-all"
          >
            Shop Inverter Batteries with Scrap Discount <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>

    </div>
  );
}
