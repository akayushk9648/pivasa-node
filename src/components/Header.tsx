"use client";

import Link from "next/link";
import Logo from "./Logo";
import { ShoppingCart, Menu, X, PhoneCall, ShieldCheck, Calculator } from "lucide-react";
import { useState, useEffect } from "react";
import { useCartStore } from "@/lib/stores/useCartStore";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(false);
  const cartItems = useCartStore((state) => state.items);
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const checkOpenStatus = () => {
      const now = new Date();
      const day = now.getDay();
      const hour = now.getHours();
      
      // Open Mon-Sat 9:30 AM to 8:30 PM, Sun 10 AM to 2 PM
      if (day >= 1 && day <= 6 && hour >= 9 && hour < 20) {
        setIsOpenNow(true);
      } else if (day === 0 && hour >= 10 && hour < 14) {
        setIsOpenNow(true);
      } else {
        setIsOpenNow(false);
      }
    };
    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Top Banner (Clean Dark Navy & Gold Announcement) */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              Authorized Dealer: <strong className="text-white">EXIDE</strong>
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300">Free Installation & Battery Delivery in Varanasi</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+919876543210" className="flex items-center gap-1.5 hover:text-primary transition-colors text-slate-300">
              <PhoneCall className="h-3.5 w-3.5 text-primary" />
              <span>Helpline: +91 98765 43210</span>
            </a>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
              isOpenNow ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30"
            }`}>
              {isOpenNow ? "Shop Open" : "Closed"}
            </span>
          </div>
        </div>
      </div>

      {/* Main White Header */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md text-slate-800 shadow-sm border-b border-slate-200/80 transition-all">
        <div className="max-w-7xl mx-auto flex h-18 items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
          <Link href="/" className="flex items-center space-x-2">
            <Logo light={false} />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold">
            <Link 
              href="/products?category=inverter-batteries" 
              className="text-slate-700 hover:text-primary transition-colors"
            >
              Inverter Batteries
            </Link>
            <Link 
              href="/products?category=inverters-ups" 
              className="text-slate-700 hover:text-primary transition-colors"
            >
              Inverters & UPS
            </Link>
            <Link 
              href="/products?category=automotive-batteries" 
              className="text-slate-700 hover:text-primary transition-colors"
            >
              Car & Bike Batteries
            </Link>
            <Link 
              href="/#calculator" 
              className="flex items-center gap-1.5 text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100/80 px-3 py-1.5 rounded-lg border border-amber-200/80 font-bold transition-all shadow-xs"
            >
              <Calculator className="h-4 w-4 text-amber-600" />
              Load Calculator
            </Link>
            <Link 
              href="/products" 
              className="text-slate-700 hover:text-primary transition-colors"
            >
              All Products
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <Link 
              href="/cart" 
              className="relative flex items-center gap-2 bg-slate-100 hover:bg-slate-200/80 text-slate-800 px-4 py-2 rounded-xl border border-slate-200 transition-all shadow-xs group"
            >
              <ShoppingCart className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-xs">Cart</span>
              {totalItemsCount > 0 && (
                <span className="bg-primary text-white text-[11px] font-black h-5 w-5 rounded-full flex items-center justify-center shadow-sm animate-pulse">
                  {totalItemsCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu & Cart */}
          <div className="flex md:hidden items-center gap-3">
            <Link 
              href="/cart" 
              className="relative p-2 bg-slate-100 text-slate-800 rounded-xl border border-slate-200 flex items-center justify-center"
            >
              <ShoppingCart className="h-5 w-5 text-primary" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow-xs">
                  {totalItemsCount}
                </span>
              )}
            </Link>
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-2 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200"
              aria-label="Toggle navigation"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-5 py-5 space-y-3 shadow-xl">
            <Link 
              href="/products?category=inverter-batteries" 
              onClick={() => setIsOpen(false)}
              className="block text-base font-semibold text-slate-750 hover:text-primary py-1"
            >
              Inverter Batteries
            </Link>
            <Link 
              href="/products?category=inverters-ups" 
              onClick={() => setIsOpen(false)}
              className="block text-base font-semibold text-slate-750 hover:text-primary py-1"
            >
              Inverters & UPS
            </Link>
            <Link 
              href="/products?category=automotive-batteries" 
              onClick={() => setIsOpen(false)}
              className="block text-base font-semibold text-slate-750 hover:text-primary py-1"
            >
              Car & Bike Batteries
            </Link>
            <Link 
              href="/#calculator" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 text-base font-bold text-amber-700 bg-amber-50 p-2.5 rounded-xl border border-amber-200"
            >
              <Calculator className="h-4 w-4 text-amber-600" /> Load Calculator
            </Link>
            <Link 
              href="/products" 
              onClick={() => setIsOpen(false)}
              className="block text-base font-semibold text-slate-750 hover:text-primary py-1"
            >
              Browse All Products
            </Link>
          </div>
        )}
      </header>
    </>
  );
}
