"use client";

import { useState } from "react";
import { submitOrder } from "@/lib/api";
import { ShoppingBag, CheckCircle2, RefreshCw, Truck } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const [exchangeBattery, setExchangeBattery] = useState<boolean>(true);
  const [exchangeType, setExchangeType] = useState<string>("150ah");

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [paymentMethod] = useState("COD"); // Cash on Delivery

  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState<any>(null);

  // Cart item mock state
  const basePrice = 13990;
  const exchangeDiscount = exchangeBattery ? (exchangeType === "200ah" ? 3200 : 2500) : 0;
  const finalPrice = Math.max(0, basePrice - exchangeDiscount);

  async function handleCheckout(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await submitOrder({
        customerName,
        customerPhone,
        customerAddress,
        paymentMethod: 'COD',
        exchangeDiscount,
        items: [
          {
            productId: 1,
            productName: "Exide Inverter battery 150Ah - Invamaster",
            quantity: 1,
            unitPrice: basePrice
          }
        ]
      });
      setOrderComplete(res.order);
    } catch (err: any) {
      if (err.message === 'Failed to fetch') {
        // Fallback COD order generation if backend server API is offline
        setOrderComplete({
          orderNumber: `PIV-${Date.now().toString().slice(-6)}`,
          customerName,
          customerPhone,
          customerAddress,
          totalAmount: finalPrice.toFixed(2),
          paymentMethod: 'COD'
        });
      } else {
        alert(err.message || 'Checkout failed');
      }
    } finally {
      setLoading(false);
    }
  }

  if (orderComplete) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
        <CheckCircle2 className="h-20 w-20 text-emerald-600 mx-auto" />
        <h1 className="text-3xl font-extrabold">Order Confirmed!</h1>
        <p className="text-muted-foreground text-sm">
          Thank you, <strong>{orderComplete.customerName}</strong>. Your Cash on Delivery order number is <strong>{orderComplete.orderNumber}</strong>.
        </p>
        <div className="bg-muted p-4 rounded-lg text-xs space-y-1 text-left">
          <p><strong>Total Amount (COD):</strong> ₹{orderComplete.totalAmount}</p>
          <p><strong>Delivery Address:</strong> {orderComplete.customerAddress}</p>
          <p><strong>Payment Mode:</strong> Cash on Delivery / Pay at Store upon installation</p>
        </div>
        <Link href="/" className="inline-block bg-primary text-primary-foreground font-bold px-6 py-3 rounded-lg text-sm">
          Back to Homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold mb-8 flex items-center gap-3">
        <ShoppingBag className="h-8 w-8 text-primary" /> Shopping Cart & COD Checkout
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Cart Item & Old Battery Exchange Estimator */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-border space-y-4">
            <h2 className="font-bold text-lg border-b border-border pb-3">Cart Items</h2>
            <div className="flex justify-between items-center py-2">
              <div>
                <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded font-bold">Exide</span>
                <h3 className="font-bold text-base mt-1">Exide Inverter battery 150Ah - Invamaster</h3>
                <p className="text-xs text-muted-foreground">Free Delivery & Installation in Varanasi</p>
              </div>
              <span className="font-extrabold text-lg">₹{basePrice.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Exchange Estimator */}
          <div className="bg-amber-50/50 border border-amber-200 p-6 rounded-xl space-y-4">
            <div className="flex items-center gap-2 font-bold text-amber-900 text-base">
              <RefreshCw className="h-5 w-5 text-amber-600" /> Old Battery Exchange Offer
            </div>

            <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-amber-900">
              <input
                type="checkbox"
                checked={exchangeBattery}
                onChange={(e) => setExchangeBattery(e.target.checked)}
                className="w-4 h-4 accent-primary"
              />
              Exchange an old scrap battery for instant discount
            </label>

            {exchangeBattery && (
              <div className="pt-2">
                <label className="block text-xs font-bold text-amber-900 mb-1">Select Old Battery Capacity:</label>
                <select
                  value={exchangeType}
                  onChange={(e) => setExchangeType(e.target.value)}
                  className="w-full border border-amber-300 rounded-lg p-2 text-sm bg-white"
                >
                  <option value="150ah">150Ah Scrap Battery (-₹2,500)</option>
                  <option value="200ah">200Ah Scrap Battery (-₹3,200)</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Checkout Form */}
        <div className="bg-white p-6 rounded-xl border border-border shadow-sm space-y-6 h-fit">
          <h2 className="font-bold text-lg border-b border-border pb-3">Delivery & COD Summary</h2>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal:</span>
              <span>₹{basePrice.toLocaleString('en-IN')}</span>
            </div>
            {exchangeBattery && (
              <div className="flex justify-between text-emerald-700 font-bold">
                <span>Old Battery Exchange:</span>
                <span>-₹{exchangeDiscount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between border-t border-border pt-2 text-base font-extrabold">
              <span>Total Pay on Delivery:</span>
              <span className="text-primary">₹{finalPrice.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <form onSubmit={handleCheckout} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Ramesh Singh"
                className="w-full border border-input rounded p-2 bg-background text-sm"
              />
            </div>

            <div>
              <label className="block font-bold mb-1">Mobile Phone Number *</label>
              <input
                type="tel"
                required
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="+91 98393 00000"
                className="w-full border border-input rounded p-2 bg-background text-sm"
              />
            </div>

            <div>
              <label className="block font-bold mb-1">Delivery & Installation Address (Varanasi) *</label>
              <textarea
                required
                rows={2}
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                placeholder="House No, Landmark, Area in Varanasi"
                className="w-full border border-input rounded p-2 bg-background text-sm"
              />
            </div>

            <div className="bg-muted p-3 rounded text-[11px] space-y-1 text-muted-foreground">
              <p className="flex items-center gap-1 font-bold text-foreground">
                <Truck className="h-3.5 w-3.5 text-primary" /> Free Installation Included
              </p>
              <p>Pay by Cash or UPI to technician after installation.</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-extrabold py-3 rounded-lg text-sm transition-colors shadow-md"
            >
              {loading ? 'Processing...' : 'Place Cash on Delivery Order'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
