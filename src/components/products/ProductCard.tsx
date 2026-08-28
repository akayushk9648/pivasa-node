"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/database";
import { useCartStore, calculateScrapValue } from "@/lib/stores/useCartStore";
import { ShoppingCart, ShieldCheck, Check, Sparkles } from "lucide-react";

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  const scrapDiscount = calculateScrapValue(product.capacity);
  const exchangePrice = Math.max(0, product.approx_mrp - scrapDiscount);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1, false);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="group relative flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
      
      {/* Top Badges Bar */}
      <div className="p-4 pb-0 flex items-center justify-between gap-2 z-10">
        <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-wider bg-navy text-white shadow-sm">
          {product.brand_name}
        </span>
        
        <div className="flex items-center gap-1.5">
          {product.is_in_stock ? (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
              In Stock
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-300">
              Out of Stock
            </span>
          )}
        </div>
      </div>

      {/* Product Image Area */}
      <Link href={`/products/${product.link}`} className="relative block h-48 w-full p-4 overflow-hidden bg-slate-50">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={`${product.brand_name} ${product.model_sku}`}
            className="h-full w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-400 font-bold text-sm">
            ⚡ Pivasa Power
          </div>
        )}

        {/* Warranty Floating Ribbon */}
        {product.total_warranty_months > 0 && (
          <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded-md border border-slate-200 text-[11px] font-bold text-navy shadow-sm">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            <span>{product.total_warranty_months}M Warranty</span>
          </div>
        )}
      </Link>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Series and SKU */}
        <div className="text-[11px] font-bold text-primary uppercase tracking-wide truncate">
          {product.brand_series || product.plate_technology || "Power Backup"}
        </div>

        {/* Title */}
        <Link href={`/products/${product.link}`} className="mt-1 block group-hover:text-primary transition-colors">
          <h3 className="font-bold text-base text-navy leading-snug line-clamp-2">
            {product.brand_name} {product.model_sku} {product.capacity ? `(${product.capacity})` : ""}
          </h3>
        </Link>

        {/* Spec Pill Tags */}
        <div className="mt-2.5 flex flex-wrap gap-1.5 text-[11px]">
          {product.capacity && (
            <span className="px-2 py-0.5 rounded bg-slate-100 font-semibold text-slate-700">
              {product.capacity}
            </span>
          )}
          {product.voltage && (
            <span className="px-2 py-0.5 rounded bg-slate-100 font-semibold text-slate-700">
              {product.voltage}
            </span>
          )}
          {product.detailed_layout?.layout_type && product.detailed_layout.layout_type !== "Standard" && (
            <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold border border-blue-200/60">
              {product.detailed_layout.layout_type}
            </span>
          )}
          {product.plate_technology && (
            <span className="px-2 py-0.5 rounded bg-slate-100 font-semibold text-slate-700 truncate max-w-[140px]">
              {product.plate_technology}
            </span>
          )}
        </div>

        {/* Price & Exchange Discount Section */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col justify-end flex-1">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-xs text-slate-400 font-medium line-through mr-1.5">
                MRP ₹{(product.approx_mrp * 1.15).toLocaleString("en-IN", { maximumFractionDigits: 0 })}
              </span>
              <div className="text-xl font-black text-navy">
                ₹{product.approx_mrp.toLocaleString("en-IN")}
              </div>
            </div>
            
            {/* Exchange Offer Badge */}
            <div className="text-right">
              {scrapDiscount > 0 ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  <Sparkles className="h-2.5 w-2.5 text-emerald-600" />
                  With Scrap: ₹{exchangePrice.toLocaleString("en-IN")}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  Free Installation
                </span>
              )}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Link
              href={`/products/${product.link}`}
              className="w-full text-center py-2 px-2.5 rounded-lg border border-navy/20 hover:bg-navy hover:text-white font-bold text-xs text-navy transition-colors flex items-center justify-center"
            >
              View Specs
            </Link>

            <button
              onClick={handleAddToCart}
              disabled={!product.is_in_stock}
              className={`w-full py-2 px-2.5 rounded-lg font-bold text-xs text-white flex items-center justify-center gap-1.5 shadow-sm transition-all ${
                !product.is_in_stock
                  ? "bg-slate-300 cursor-not-allowed text-slate-500"
                  : added
                  ? "bg-emerald-600 shadow-emerald-500/20"
                  : "bg-primary hover:bg-primary-hover shadow-primary/20 hover:shadow-primary/40"
              }`}
            >
              {added ? (
                <>
                  <Check className="h-3.5 w-3.5" /> Added!
                </>
              ) : (
                <>
                  <ShoppingCart className="h-3.5 w-3.5" /> Buy / Add
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
