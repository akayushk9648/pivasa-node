"use client";

import React from "react";
import Link from "next/link";
import { useCartStore } from "@/lib/stores/useCartStore";
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  ArrowLeft 
} from "lucide-react";

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    toggleExchange,
    getSubtotal,
    getTotalExchangeDiscount,
    getEstimatedTax,
    getShippingCharge,
    getTotalAmount,
    clearCart,
  } = useCartStore();

  const subtotal = getSubtotal();
  const exchangeDiscount = getTotalExchangeDiscount();
  const shipping = getShippingCharge();
  const totalAmount = getTotalAmount();

  if (items.length === 0) {
    return (
      <div className="bg-slate-50 min-h-screen py-20 px-4">
        <div className="max-w-xl mx-auto bg-white p-10 rounded-3xl border border-slate-200 shadow-sm text-center space-y-6">
          <div className="h-20 w-20 bg-navy/5 text-navy rounded-full flex items-center justify-center mx-auto">
            <ShoppingCart className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-2xl font-black text-navy">Your Shopping Cart is Empty</h1>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            Explore our certified range of tubular inverter batteries, UPS systems, and automotive batteries.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/products"
              className="bg-primary hover:bg-primary-hover text-white font-extrabold py-3.5 px-6 rounded-xl text-sm shadow-md transition-all"
            >
              Browse Catalog
            </Link>
            <Link
              href="/#calculator"
              className="bg-navy hover:bg-navy-light text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-colors"
            >
              Use Load Calculator
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-navy tracking-tight">Shopping Cart</h1>
            <p className="text-sm text-slate-500 mt-1">Review your power equipment & scrap exchange discounts</p>
          </div>
          <button
            onClick={clearCart}
            className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1.5 transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" /> Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {items.map((item) => {
              const itemUnitPrice = item.product.approx_mrp;
              const itemEffectivePrice = item.exchangeOldBattery
                ? Math.max(0, itemUnitPrice - item.exchangeDiscountPerUnit)
                : itemUnitPrice;
              const itemTotal = itemEffectivePrice * item.quantity;

              return (
                <div
                  key={item.productId}
                  className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
                >
                  {/* Thumbnail & Product Info */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="h-20 w-20 rounded-xl bg-slate-50 p-2 shrink-0 border border-slate-100 flex items-center justify-center overflow-hidden">
                      {item.product.image_url ? (
                        <img
                          src={item.product.image_url}
                          alt={item.product.model_sku}
                          className="h-full w-full object-contain mix-blend-multiply"
                        />
                      ) : (
                        <span className="text-xs font-bold text-slate-400">⚡</span>
                      )}
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-black uppercase text-primary tracking-wider">
                        {item.product.brand_name}
                      </span>
                      <Link href={`/products/${item.product.link}`} className="block hover:text-primary transition-colors">
                        <h3 className="font-bold text-sm sm:text-base text-navy leading-snug">
                          {item.product.brand_name} {item.product.model_sku} {item.product.capacity ? `(${item.product.capacity})` : ""}
                        </h3>
                      </Link>
                      <div className="text-xs text-slate-500">
                        Warranty: <strong className="text-navy">{item.product.total_warranty_months} Months</strong>
                      </div>

                      {/* Scrap Exchange Checkbox */}
                      <label className="inline-flex items-center gap-2 pt-1 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={item.exchangeOldBattery}
                          onChange={(e) => toggleExchange(item.productId, e.target.checked)}
                          className="h-4 w-4 rounded text-primary focus:ring-primary accent-primary cursor-pointer"
                        />
                        <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                          <Sparkles className="h-3 w-3" /> Exchange old battery (-₹{item.exchangeDiscountPerUnit.toLocaleString("en-IN")}/unit)
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Quantity and Price */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <div className="text-right">
                      <div className="text-lg font-black text-navy">
                        ₹{itemTotal.toLocaleString("en-IN")}
                      </div>
                      {item.exchangeOldBattery && (
                        <span className="text-[10px] text-emerald-600 font-bold block">
                          Includes scrap saving
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 bg-slate-100 rounded-lg p-1 border border-slate-200">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="p-1 rounded text-slate-700 hover:bg-white transition-colors"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="font-black text-xs w-5 text-center text-navy">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="p-1 rounded text-slate-700 hover:bg-white transition-colors"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.productId)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}

            <div className="p-4 rounded-xl bg-slate-100 text-xs text-slate-600 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" /> Free on-site installation by certified technicians in Varanasi
              </span>
              <Link href="/products" className="font-bold text-navy hover:text-primary transition-colors flex items-center gap-1">
                + Add more products
              </Link>
            </div>
          </div>

          {/* Right: Order Summary & Checkout Card */}
          <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="font-black text-lg text-navy tracking-tight pb-3 border-b border-slate-100">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Items Subtotal</span>
                <span className="font-bold text-navy">₹{subtotal.toLocaleString("en-IN")}</span>
              </div>

              {exchangeDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5" /> Old Scrap Discount
                  </span>
                  <span>- ₹{exchangeDiscount.toLocaleString("en-IN")}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600">
                <span>Varanasi Delivery & Installation</span>
                <span className="font-bold text-emerald-600">FREE</span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Applicable GST (18% Included)</span>
                <span className="font-bold text-slate-700">Included</span>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline">
                <div>
                  <span className="text-xs uppercase font-extrabold text-slate-400 block">Total Amount</span>
                  <span className="text-xs text-slate-500 font-medium">Pay on Delivery / Installation</span>
                </div>
                <div className="text-2xl font-black text-navy">
                  ₹{totalAmount.toLocaleString("en-IN")}
                </div>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full bg-primary hover:bg-primary-hover text-white font-extrabold py-4 px-6 rounded-xl text-sm shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all flex items-center justify-center gap-2"
            >
              Proceed to Delivery & Checkout <ArrowRight className="h-4 w-4" />
            </Link>

            <div className="text-[11px] text-slate-400 text-center space-y-1">
              <p>✓ Cash on Delivery & UPI accepted at installation</p>
              <p>✓ Authorized Exide Warranty Certificate provided</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
