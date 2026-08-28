"use client";

import React, { useState } from "react";
import { Product } from "@/types/database";
import { useCartStore, calculateScrapValue } from "@/lib/stores/useCartStore";
import { useRouter } from "next/navigation";
import { 
  ShieldCheck, 
  ShoppingCart, 
  Zap, 
  Check, 
  RotateCcw, 
  Wrench, 
  Truck, 
  Info, 
  CheckCircle2, 
  Sparkles,
  Plus,
  Minus
} from "lucide-react";

export default function ProductDetailClient({ product }: { product: Product }) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);

  const [quantity, setQuantity] = useState(1);
  const [exchangeOldBattery, setExchangeOldBattery] = useState(false);
  const [added, setAdded] = useState(false);

  const scrapDiscount = calculateScrapValue(product.capacity);
  const unitPrice = product.approx_mrp;
  const effectivePrice = exchangeOldBattery ? Math.max(0, unitPrice - scrapDiscount) : unitPrice;
  const totalPrice = effectivePrice * quantity;

  const handleAddToCart = () => {
    addItem(product, quantity, exchangeOldBattery);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(product, quantity, exchangeOldBattery);
    router.push("/cart");
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Product Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative h-80 sm:h-[420px] w-full rounded-2xl bg-slate-50 border border-slate-100 p-8 flex items-center justify-center overflow-hidden">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={`${product.brand_name} ${product.model_sku}`}
                className="h-full w-full object-contain mix-blend-multiply transition-transform duration-500 hover:scale-105"
              />
            ) : (
              <div className="text-slate-300 font-bold text-lg">⚡ Pivasa Power Product</div>
            )}

            {/* In-Stock Floating Tag */}
            <div className="absolute top-4 left-4">
              {product.is_in_stock ? (
                <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-sm">
                  ✓ In Stock in Varanasi Hub
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full text-xs font-black bg-rose-100 text-rose-800 border border-rose-300 shadow-sm">
                  Out of Stock
                </span>
              )}
            </div>
          </div>

          {/* Delivery & Installation Guarantee Badges */}
          <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-slate-600">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2.5">
              <Truck className="h-4 w-4 text-primary shrink-0" />
              <span><strong>Free Delivery:</strong> Delivered within 2-4 hours in Varanasi</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2.5">
              <Wrench className="h-4 w-4 text-primary shrink-0" />
              <span><strong>Free Installation:</strong> By certified power technician</span>
            </div>
          </div>
        </div>

        {/* Right Column: Pricing, Warranty, Exchange & Purchase Actions */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Brand & Series Title */}
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-md bg-navy text-white text-[11px] font-extrabold uppercase tracking-wider">
                {product.brand_name}
              </span>
              <span className="text-xs font-bold text-primary uppercase tracking-wide">
                {product.brand_series || product.plate_technology || "Certified Energy Product"}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-navy tracking-tight">
              {product.brand_name} {product.model_sku} {product.capacity ? `(${product.capacity})` : ""}
            </h1>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              SKU: {product.model_sku}
            </p>
          </div>

          {/* Detailed Warranty Breakdown Box */}
          {product.total_warranty_months > 0 && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black uppercase text-navy flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-primary" /> Official Brand Warranty Breakdown
                </span>
                <span className="text-sm font-black text-primary">
                  {product.total_warranty_months} Months Total
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                  <span className="text-[11px] text-slate-400 font-semibold block">Free Replacement (FOC)</span>
                  <span className="font-extrabold text-navy text-sm">{product.foc_months} Months</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                  <span className="text-[11px] text-slate-400 font-semibold block">Pro-Rata Warranty Discount</span>
                  <span className="font-extrabold text-navy text-sm">{product.pro_rata_months} Months</span>
                </div>
              </div>
            </div>
          )}

          {/* Pricing Row */}
          <div className="pt-2 border-t border-slate-100 flex items-baseline justify-between">
            <div>
              <span className="text-xs text-slate-400 line-through">
                MRP ₹{(unitPrice * 1.15).toLocaleString("en-IN", { maximumFractionDigits: 0 })}
              </span>
              <div className="text-3xl font-black text-navy">
                ₹{unitPrice.toLocaleString("en-IN")}
                <span className="text-xs font-semibold text-slate-500 ml-1.5">(Inclusive of 18% GST)</span>
              </div>
            </div>
          </div>

          {/* Interactive Old Battery Exchange Trade-in Card / Installation Guarantee */}
          {scrapDiscount > 0 ? (
            <div 
              onClick={() => setExchangeOldBattery(!exchangeOldBattery)}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer select-none ${
                exchangeOldBattery 
                  ? "bg-emerald-50/70 border-emerald-500 shadow-sm" 
                  : "bg-slate-50 border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={exchangeOldBattery}
                    onChange={(e) => setExchangeOldBattery(e.target.checked)}
                    className="h-5 w-5 mt-0.5 rounded text-primary focus:ring-primary cursor-pointer accent-primary"
                  />
                  <div>
                    <div className="font-extrabold text-sm text-navy flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4 text-emerald-600" />
                      Exchange Old Scrap Battery & Save ₹{scrapDiscount.toLocaleString("en-IN")}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      Give your old junk/scrap battery of any brand at the time of delivery. Our technician will collect it at your doorstep.
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs text-emerald-700 font-bold block">-₹{scrapDiscount.toLocaleString("en-IN")}</span>
                  <span className="text-[10px] text-emerald-600 font-semibold">Instant Discount</span>
                </div>
              </div>

              {exchangeOldBattery && (
                <div className="mt-3 pt-3 border-t border-emerald-200 flex items-center justify-between text-xs font-black text-emerald-900">
                  <span>Net Effective Price per unit:</span>
                  <span className="text-base">₹{effectivePrice.toLocaleString("en-IN")}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/80 flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-700">
                <strong className="text-navy font-bold block text-sm mb-0.5">Free Certified Installation in Varanasi</strong>
                Includes complimentary on-site setup, wire check & surge protection verification by our authorized technician.
              </div>
            </div>
          )}

          {/* Quantity & Buy Actions */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold uppercase text-slate-500">Quantity:</span>
              <div className="flex items-center gap-2 bg-slate-100 rounded-xl p-1 border border-slate-200">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1.5 rounded-lg text-slate-700 hover:bg-white transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="font-black text-sm w-6 text-center text-navy">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1.5 rounded-lg text-slate-700 hover:bg-white transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="text-xs text-slate-500 font-medium">
                Total: <strong className="text-navy text-sm">₹{totalPrice.toLocaleString("en-IN")}</strong>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                disabled={!product.is_in_stock}
                className={`py-3.5 px-6 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-md transition-all ${
                  !product.is_in_stock
                    ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                    : added
                    ? "bg-emerald-600 text-white shadow-emerald-500/20"
                    : "bg-navy hover:bg-navy-light text-white shadow-navy/20"
                }`}
              >
                {added ? (
                  <>
                    <Check className="h-4 w-4" /> Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-4 w-4 text-primary" /> Add to Cart
                  </>
                )}
              </button>

              <button
                onClick={handleBuyNow}
                disabled={!product.is_in_stock}
                className="py-3.5 px-6 rounded-xl font-extrabold text-sm bg-primary hover:bg-primary-hover text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all flex items-center justify-center gap-2"
              >
                <Zap className="h-4 w-4" /> Instant Order / Checkout
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Compatible Applications & Vehicle Compatibility Section */}
      {product.detailed_layout?.application && (
        <div className="mt-12 pt-8 border-t border-slate-200">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <h2 className="text-base font-black text-navy uppercase tracking-wide">
              Application & Equipment Compatibility
            </h2>
          </div>
          <p className="text-xs text-slate-600 mb-4 leading-relaxed">
            {product.detailed_layout.application}
          </p>
          {product.detailed_layout.compatible_applications && product.detailed_layout.compatible_applications.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.detailed_layout.compatible_applications.map((app, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200/80 text-slate-800 text-xs font-semibold"
                >
                  ✓ {app}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Technical Specifications Layout */}
      <div className="mt-10 pt-8 border-t border-slate-200">
        <h2 className="text-xl font-black text-navy tracking-tight mb-6">
          Technical Specifications & Engineering Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Key Specs Table */}
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <table className="w-full text-xs text-left">
              <tbody className="divide-y divide-slate-100">
                <tr className="bg-slate-50">
                  <td className="py-3 px-4 font-bold text-slate-500">Brand & Manufacturer</td>
                  <td className="py-3 px-4 font-extrabold text-navy">{product.brand_name}</td>
                </tr>
                {product.brand_series && (
                  <tr>
                    <td className="py-3 px-4 font-bold text-slate-500">Brand Series</td>
                    <td className="py-3 px-4 font-extrabold text-navy">{product.brand_series}</td>
                  </tr>
                )}
                <tr className="bg-slate-50">
                  <td className="py-3 px-4 font-bold text-slate-500">Model SKU</td>
                  <td className="py-3 px-4 font-extrabold text-navy font-mono">{product.model_sku}</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-slate-500">Nominal Capacity</td>
                  <td className="py-3 px-4 font-extrabold text-navy">{product.capacity || "N/A"}</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-3 px-4 font-bold text-slate-500">Operating Voltage</td>
                  <td className="py-3 px-4 font-extrabold text-navy">{product.voltage || "12V DC"}</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-slate-500">Plate & Internal Metallurgy</td>
                  <td className="py-3 px-4 font-extrabold text-navy">{product.plate_technology || "Lead-Acid Technology"}</td>
                </tr>
                {product.detailed_layout?.layout_type && (
                  <tr className="bg-slate-50">
                    <td className="py-3 px-4 font-bold text-slate-500">Terminal / Form Factor Layout</td>
                    <td className="py-3 px-4 font-extrabold text-navy">{product.detailed_layout.layout_type}</td>
                  </tr>
                )}
                <tr>
                  <td className="py-3 px-4 font-bold text-slate-500">Warranty Coverage</td>
                  <td className="py-3 px-4 font-extrabold text-navy">
                    {product.total_warranty_months} Months ({product.foc_months}M Free Replacement + {product.pro_rata_months}M Pro-Rata)
                  </td>
                </tr>
                {product.detailed_layout?.filled_weight_kg && (
                  <tr className="bg-slate-50">
                    <td className="py-3 px-4 font-bold text-slate-500">Filled Gross Weight</td>
                    <td className="py-3 px-4 font-extrabold text-navy">{product.detailed_layout.filled_weight_kg} kg</td>
                  </tr>
                )}
                {product.detailed_layout?.dimensions_mm && (
                  <tr>
                    <td className="py-3 px-4 font-bold text-slate-500">Dimensions (L × W × H)</td>
                    <td className="py-3 px-4 font-extrabold text-navy">
                      {product.detailed_layout.dimensions_mm.length} × {product.detailed_layout.dimensions_mm.width} × {product.detailed_layout.dimensions_mm.height} mm
                    </td>
                  </tr>
                )}
                {product.detailed_layout?.electrolyte_volume_litres && (
                  <tr className="bg-slate-50">
                    <td className="py-3 px-4 font-bold text-slate-500">Acid Electrolyte Volume</td>
                    <td className="py-3 px-4 font-extrabold text-navy">{product.detailed_layout.electrolyte_volume_litres} Litres</td>
                  </tr>
                )}
                {product.detailed_layout?.recommended_inverter_va && (
                  <tr>
                    <td className="py-3 px-4 font-bold text-slate-500">Recommended Inverter VA</td>
                    <td className="py-3 px-4 font-extrabold text-navy">{product.detailed_layout.recommended_inverter_va}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Key Product Highlights */}
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-navy uppercase tracking-wider">
              Engineering Features & Reliability Guarantee
            </h3>
            
            <div className="space-y-2.5">
              {product.detailed_layout?.features && product.detailed_layout.features.length > 0 ? (
                product.detailed_layout.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))
              ) : (
                <>
                  <div className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>Engineered for severe climatic variations and deep discharge cycles.</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>Factory-charged with proprietary metallurgy for high crank power & durability.</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>100% Genuine product with direct official manufacturer warranty.</span>
                  </div>
                </>
              )}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
