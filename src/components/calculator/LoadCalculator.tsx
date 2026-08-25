"use client";

import React, { useState } from "react";
import { useLoadCalculatorStore } from "@/lib/stores/useLoadCalculatorStore";
import { useCartStore } from "@/lib/stores/useCartStore";
import { SAMPLE_PRODUCTS } from "@/lib/constants/sample-products";
import { 
  Zap, 
  Clock, 
  Plus, 
  Minus, 
  ShoppingCart, 
  RotateCcw, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles,
  Fan,
  Lightbulb,
  Tv,
  Refrigerator,
  Laptop,
  Wind
} from "lucide-react";

export default function LoadCalculator() {
  const {
    appliances,
    backupHours,
    updateApplianceQuantity,
    setBackupHours,
    resetCalculator,
    getTotalWattage,
    getRecommendedInverterVA,
    getRecommendedBatteryAh,
    getSuggestedComboName,
  } = useLoadCalculatorStore();

  const addItem = useCartStore((state) => state.addItem);
  const [comboAdded, setComboAdded] = useState(false);

  const totalWatts = getTotalWattage();
  const recommendedVA = getRecommendedInverterVA();
  const recommendedAh = getRecommendedBatteryAh();

  // Find matching sample battery and inverter
  const matchedBattery = SAMPLE_PRODUCTS.find((p) => {
    const num = parseInt(p.capacity?.replace(/\D/g, "") || "0", 10);
    return p.plate_technology?.includes("Tubular") && num >= recommendedAh;
  }) || SAMPLE_PRODUCTS[0];

  const matchedInverter = SAMPLE_PRODUCTS.find((p) => {
    return p.plate_technology?.includes("Sine Wave") && p.capacity?.includes("VA");
  }) || SAMPLE_PRODUCTS[1];

  const comboTotalMRP = (matchedBattery?.approx_mrp || 18500) + (matchedInverter?.approx_mrp || 7200);
  const comboDiscountedPrice = comboTotalMRP - 1200; // Combo pack discount

  const handleAddComboToCart = () => {
    if (matchedBattery) addItem(matchedBattery, 1, false);
    if (matchedInverter) addItem(matchedInverter, 1, false);
    setComboAdded(true);
    setTimeout(() => setComboAdded(false), 2200);
  };

  const getApplianceIcon = (iconName: string) => {
    switch (iconName) {
      case "Fan": return <Fan className="h-5 w-5 text-primary" />;
      case "Lightbulb": return <Lightbulb className="h-5 w-5 text-amber-500" />;
      case "Tv": return <Tv className="h-5 w-5 text-blue-500" />;
      case "Refrigerator": return <Refrigerator className="h-5 w-5 text-cyan-500" />;
      case "Laptop": return <Laptop className="h-5 w-5 text-indigo-500" />;
      case "Wind": return <Wind className="h-5 w-5 text-teal-500" />;
      default: return <Zap className="h-5 w-5 text-primary" />;
    }
  };

  return (
    <section id="calculator" className="py-16 bg-gradient-to-b from-slate-50 to-white border-y border-slate-200 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-wider mb-3">
            <Zap className="h-3.5 w-3.5" /> Smart Recommendation Engine
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
            Calculate Your Home & Office Power Backup
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Select the appliances you want to run during power cuts in Varanasi. We&apos;ll automatically calculate the required Inverter capacity (VA) and Battery size (Ah).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Appliance & Duration Selectors */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-8">
            
            {/* Step 1: Appliances */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-navy flex items-center gap-2">
                  <span className="flex items-center justify-center h-6 w-6 rounded-full bg-navy text-white text-xs font-bold">1</span>
                  Select Your Appliances
                </h3>
                <button
                  onClick={resetCalculator}
                  className="text-xs font-semibold text-slate-400 hover:text-primary flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="h-3 w-3" /> Reset
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {appliances.map((app) => (
                  <div
                    key={app.id}
                    className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                      app.quantity > 0
                        ? "bg-slate-50 border-navy/30 shadow-sm"
                        : "bg-white border-slate-200 opacity-80"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-white shadow-sm border border-slate-100">
                        {getApplianceIcon(app.iconName)}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-navy">{app.name}</div>
                        <div className="text-xs text-slate-500">{app.wattage}W each</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 bg-white rounded-lg border border-slate-200 p-1 shadow-sm">
                      <button
                        onClick={() => updateApplianceQuantity(app.id, app.quantity - 1)}
                        disabled={app.quantity === 0}
                        className="p-1 rounded text-slate-600 hover:bg-slate-100 disabled:opacity-30"
                        aria-label={`Decrease ${app.name}`}
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="font-extrabold text-sm w-5 text-center text-navy">
                        {app.quantity}
                      </span>
                      <button
                        onClick={() => updateApplianceQuantity(app.id, app.quantity + 1)}
                        className="p-1 rounded text-slate-600 hover:bg-slate-100"
                        aria-label={`Increase ${app.name}`}
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 2: Backup Duration */}
            <div className="pt-4 border-t border-slate-100">
              <h3 className="font-bold text-lg text-navy flex items-center gap-2 mb-4">
                <span className="flex items-center justify-center h-6 w-6 rounded-full bg-navy text-white text-xs font-bold">2</span>
                Desired Backup Duration
              </h3>

              <div className="flex flex-wrap gap-2.5">
                {[2, 3, 4, 6, 8, 10].map((hours) => (
                  <button
                    key={hours}
                    onClick={() => setBackupHours(hours)}
                    className={`flex-1 min-w-[70px] py-2.5 px-3 rounded-xl font-bold text-sm flex items-center justify-center gap-1.5 transition-all ${
                      backupHours === hours
                        ? "bg-navy text-white shadow-md shadow-navy/20"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    <Clock className="h-3.5 w-3.5 text-primary" />
                    {hours} Hours
                  </button>
                ))}
              </div>
            </div>

            {/* Live Load Meter */}
            <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Total Running Load</span>
                <div className="text-2xl font-black text-white flex items-baseline gap-1">
                  {totalWatts} <span className="text-sm font-semibold text-primary">Watts</span>
                </div>
              </div>

              <div className="w-full sm:w-1/2">
                <div className="flex justify-between text-[11px] font-semibold text-slate-400 mb-1">
                  <span>Efficiency Safety Headroom</span>
                  <span className="text-amber-400 font-bold">120% Applied</span>
                </div>
                <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-primary transition-all duration-500"
                    style={{ width: `${Math.min(100, (totalWatts / 1200) * 100)}%` }}
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Recommendation Result Card */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            <div className="bg-navy text-white p-6 sm:p-8 rounded-2xl shadow-xl border border-navy-light relative overflow-hidden">
              {/* Background Glow */}
              <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-black uppercase tracking-wider border border-white/10">
                  <Sparkles className="h-3.5 w-3.5" /> Best Matched Setup
                </span>
                <span className="text-xs text-slate-300 font-semibold">{backupHours}h Backup</span>
              </div>

              {/* Specs Metric Badges */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-navy-light/70 p-4 rounded-xl border border-white/10">
                  <span className="text-[11px] uppercase font-bold text-slate-400">Required Inverter</span>
                  <div className="text-2xl font-black text-white mt-0.5">
                    {recommendedVA} <span className="text-sm font-semibold text-primary">VA</span>
                  </div>
                  <span className="text-[10px] text-slate-300">Pure Sine Wave</span>
                </div>

                <div className="bg-navy-light/70 p-4 rounded-xl border border-white/10">
                  <span className="text-[11px] uppercase font-bold text-slate-400">Required Battery</span>
                  <div className="text-2xl font-black text-white mt-0.5">
                    {recommendedAh} <span className="text-sm font-semibold text-primary">Ah</span>
                  </div>
                  <span className="text-[10px] text-slate-300">Tall Tubular</span>
                </div>
              </div>

              {/* Recommended Products Combo */}
              <div className="space-y-3 bg-white/5 p-4 rounded-xl border border-white/10 mb-6">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Included In This Recommended Combo:
                </div>
                
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 truncate pr-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span className="truncate text-white font-medium">
                      {matchedInverter.brand_name} {matchedInverter.model_sku}
                    </span>
                  </div>
                  <span className="font-bold text-slate-200 shrink-0">₹{matchedInverter.approx_mrp.toLocaleString("en-IN")}</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 truncate pr-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span className="truncate text-white font-medium">
                      {matchedBattery.brand_name} {matchedBattery.model_sku}
                    </span>
                  </div>
                  <span className="font-bold text-slate-200 shrink-0">₹{matchedBattery.approx_mrp.toLocaleString("en-IN")}</span>
                </div>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-white/10 text-emerald-400 font-semibold">
                  <span>Combo Special Discount</span>
                  <span>- ₹1,200</span>
                </div>
              </div>

              {/* Pricing & CTA */}
              <div className="pt-2 border-t border-white/10">
                <div className="flex items-baseline justify-between mb-4">
                  <div>
                    <span className="text-xs text-slate-400 line-through">₹{comboTotalMRP.toLocaleString("en-IN")}</span>
                    <div className="text-3xl font-black text-white">₹{comboDiscountedPrice.toLocaleString("en-IN")}</div>
                    <span className="text-[11px] text-emerald-400 font-bold">Includes Free Varanasi Installation</span>
                  </div>
                </div>

                <button
                  onClick={handleAddComboToCart}
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 shadow-lg transition-all ${
                    comboAdded
                      ? "bg-emerald-600 shadow-emerald-500/30"
                      : "bg-primary hover:bg-primary-hover shadow-primary/30 hover:shadow-primary/50"
                  }`}
                >
                  {comboAdded ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" /> Combo Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-4 w-4" /> Add Recommended Combo to Cart
                    </>
                  )}
                </button>
              </div>

            </div>

            {/* Guarantee Callout */}
            <div className="bg-slate-100 p-4 rounded-xl border border-slate-200 flex items-center gap-3">
              <ShieldCheck className="h-8 w-8 text-primary shrink-0" />
              <div className="text-xs text-slate-600">
                <strong className="text-navy font-bold block">100% Genuine Certified Exide</strong>
                Direct factory warranty with free on-site service & replacement across Varanasi.
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
