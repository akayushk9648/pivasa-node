"use client";
import Link from "next/link";
import Logo from "./Logo";
import { ShoppingCart, Menu, Phone } from "lucide-react";
import { useState, useEffect } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(false);

  useEffect(() => {
    const checkOpenStatus = () => {
      const now = new Date();
      const day = now.getDay();
      const hour = now.getHours();
      
      // Mon-Sat (1-6): 10:00 AM - 8:00 PM (20:00)
      if (day >= 1 && day <= 6 && hour >= 10 && hour < 20) {
        setIsOpenNow(true);
      } 
      // Sun (0): 10:00 AM - 2:00 PM (14:00)
      else if (day === 0 && hour >= 10 && hour < 14) {
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
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top Banner */}
      <div className="bg-secondary text-secondary-foreground text-xs py-1 px-4 text-center flex justify-between items-center max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <span className="font-bold text-primary">Authorized Exide Dealer</span>
          <span className="hidden sm:inline">| Livguard Dealer Varanasi</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="tel:+919839302493" className="flex items-center gap-1 hover:text-primary transition-colors">
            <Phone className="h-3 w-3" /> +91 98393 02493
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <Logo />
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="transition-colors hover:text-primary">Home</Link>
          <Link href="/products?category=inverters" className="transition-colors hover:text-primary">Inverters & UPS</Link>
          <Link href="/products?category=batteries" className="transition-colors hover:text-primary">Batteries</Link>
          <Link href="/solar" className="transition-colors hover:text-primary">Solar Solutions</Link>
          
          <div className="flex items-center gap-2 border-l border-border pl-4">
            <span className={`text-xs px-2.5 py-1 rounded-full font-bold shadow-sm ${isOpenNow ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-red-100 text-red-700 border border-red-300'}`}>
              {isOpenNow ? '● Store Open Now' : '○ Store Closed'}
            </span>
          </div>

          <Link href="/cart" className="flex items-center relative hover:text-primary transition-colors bg-muted p-2 rounded-full">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
              0
            </span>
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-3">
          <Link href="/cart" className="relative p-2 bg-muted rounded-full">
            <ShoppingCart className="h-5 w-5" />
          </Link>
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-foreground">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
      
      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-b border-border bg-background px-4 py-4 space-y-3">
          <Link href="/" onClick={() => setIsOpen(false)} className="block text-sm font-medium">Home</Link>
          <Link href="/products?category=inverters" onClick={() => setIsOpen(false)} className="block text-sm font-medium">Inverters & UPS</Link>
          <Link href="/products?category=batteries" onClick={() => setIsOpen(false)} className="block text-sm font-medium">Batteries</Link>
          <Link href="/solar" onClick={() => setIsOpen(false)} className="block text-sm font-medium">Solar Solutions</Link>
          <div className="pt-2 border-t border-border">
            <span className={`text-xs px-2.5 py-1 rounded-full font-bold inline-block ${isOpenNow ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {isOpenNow ? '● Store Open Now (Varanasi)' : '○ Store Closed'}
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
