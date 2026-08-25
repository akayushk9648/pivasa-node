"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchPublicCategories } from "@/lib/api";
import { ArrowRight, Battery, Zap, ShieldCheck, Wrench, Sun, CheckCircle2 } from "lucide-react";

export default function Home() {
  const [categoriesList, setCategoriesList] = useState<any[]>([]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await fetchPublicCategories();
        setCategoriesList(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed loading categories from Supabase:", err);
      }
    }
    loadCategories();
  }, []);

  const defaultCategories = [
    { title: 'Inverter Batteries', cat: 'inverters', desc: 'Exide & Livguard Tubular' },
    { title: 'Home UPS / Inverters', cat: 'ups', desc: 'Pure Sinewave Home UPS' },
    { title: 'Automotive Batteries', cat: 'car-batteries', desc: 'Car & Heavy Vehicle' },
    { title: 'Two-Wheeler Batteries', cat: 'bike-batteries', desc: 'Motorcycle & Scooter' },
    { title: 'Voltage Stabilizers', cat: 'stabilizers', desc: 'Mainline & AC Stabilizers' },
    { title: 'Solar Panels', cat: 'solar', desc: 'Mono & Poly Solar Modules' },
    { title: 'Battery Trolleys', cat: 'trolleys', desc: 'Heavy Duty Plastic Trolleys' },
    { title: 'Solar Combo Kits', cat: 'solar-combos', desc: 'Inverter + Panel + Battery' }
  ];

  const displayCategories = categoriesList.length > 0
    ? categoriesList.map(c => ({ title: c.name, cat: c.slug || c.name.toLowerCase().replace(/ /g, '-'), desc: c.description || 'Certified Power Backup' }))
    : defaultCategories;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-secondary text-secondary-foreground overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary text-primary-foreground text-xs font-extrabold rounded-full mb-6 uppercase tracking-wider shadow-sm">
              <span>★</span> Authorized EXIDE & Livguard Dealer
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-white leading-tight">
              Reliable Inverters, Batteries & Solar in <span className="text-primary">Varanasi</span>
            </h1>
            <p className="text-base md:text-lg mb-8 text-secondary-foreground/90 max-w-lg leading-relaxed">
              Same-day delivery & free local installation across Varanasi. Exchange old batteries for instant discounts.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products?category=inverters" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-7 py-3.5 rounded-lg flex items-center gap-2 transition-all shadow-md">
                Browse Batteries & Inverters <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href="/solar" className="bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-3.5 rounded-lg flex items-center gap-2 transition-all border border-white/20">
                Solar Load Calculator
              </Link>
            </div>
          </div>

          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm space-y-4">
            <h3 className="font-bold text-lg text-white mb-2 border-b border-white/10 pb-2">Why Varanasi Chooses Pivasa Power:</h3>
            <ul className="space-y-3 text-sm text-secondary-foreground/90">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                <span>100% Genuine EXIDE & Livguard Factory Stock</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                <span>Free Express Delivery & Expert Installation in Varanasi</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                <span>Highest Old Battery Exchange Valuation</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                <span>Cash on Delivery / Pay at Store Option</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Trust Badges Bar */}
      <section className="bg-white border-b border-border py-8 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center p-3 rounded-lg hover:bg-muted/40 transition-colors">
              <ShieldCheck className="h-9 w-9 text-primary mb-2" />
              <span className="font-bold text-sm">Authorized Exide Dealer</span>
              <span className="text-xs text-muted-foreground">Original Warranty Assured</span>
            </div>
            <div className="flex flex-col items-center p-3 rounded-lg hover:bg-muted/40 transition-colors">
              <Wrench className="h-9 w-9 text-primary mb-2" />
              <span className="font-bold text-sm">Free Installation</span>
              <span className="text-xs text-muted-foreground">Within Varanasi City</span>
            </div>
            <div className="flex flex-col items-center p-3 rounded-lg hover:bg-muted/40 transition-colors">
              <Battery className="h-9 w-9 text-primary mb-2" />
              <span className="font-bold text-sm">Old Battery Exchange</span>
              <span className="text-xs text-muted-foreground">Instant Rebate at Checkout</span>
            </div>
            <div className="flex flex-col items-center p-3 rounded-lg hover:bg-muted/40 transition-colors">
              <Zap className="h-9 w-9 text-primary mb-2" />
              <span className="font-bold text-sm">Pay on Delivery</span>
              <span className="text-xs text-muted-foreground">Zero Risk COD Purchase</span>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Load (Guided Quick Filter) */}
      <section className="py-16 bg-muted/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-extrabold text-primary uppercase tracking-widest">Guided Selection</span>
            <h2 className="text-3xl font-extrabold mt-1">Shop by Load & Backup Hours</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-lg mx-auto">
              Not sure which battery capacity you need? Select your typical backup requirement below.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/products?category=inverters&capacity=150" className="bg-white p-8 rounded-xl border border-border hover:border-primary hover:shadow-lg transition-all text-center flex flex-col items-center group">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-2">3 to 4 Hours Backup</h3>
              <p className="text-xs text-muted-foreground mb-4">Suitable for 2 Fans, 3 Lights, 1 LED TV</p>
              <span className="mt-auto inline-flex items-center text-primary font-bold text-sm group-hover:gap-2 transition-all">
                View 150Ah Batteries <ArrowRight className="h-4 w-4 ml-1" />
              </span>
            </Link>
            
            <Link href="/products?category=inverters&capacity=200" className="bg-white p-8 rounded-xl border border-border hover:border-primary hover:shadow-lg transition-all text-center flex flex-col items-center group">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Battery className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-2">6 to 8 Hours Backup</h3>
              <p className="text-xs text-muted-foreground mb-4">Suitable for 4 Fans, 6 Lights, TV, Refrigerator</p>
              <span className="mt-auto inline-flex items-center text-primary font-bold text-sm group-hover:gap-2 transition-all">
                View 200Ah Jumbo Batteries <ArrowRight className="h-4 w-4 ml-1" />
              </span>
            </Link>

            <Link href="/solar" className="bg-white p-8 rounded-xl border border-border hover:border-primary hover:shadow-lg transition-all text-center flex flex-col items-center group">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Sun className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-2">Full Solar Solution</h3>
              <p className="text-xs text-muted-foreground mb-4">Run AC & heavy loads with Solar Panel Combos</p>
              <span className="mt-auto inline-flex items-center text-primary font-bold text-sm group-hover:gap-2 transition-all">
                Use Solar Calculator <ArrowRight className="h-4 w-4 ml-1" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Dynamic Product Categories from Supabase */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-extrabold">Product Categories</h2>
              <p className="text-sm text-muted-foreground mt-1">Explore our range of certified power backup products.</p>
            </div>
            <Link href="/products" className="text-primary font-bold text-sm hover:underline flex items-center gap-1">
              View All Products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {displayCategories.map((item) => (
              <Link key={item.title} href={`/products?category=${item.cat}`} className="bg-white border border-border rounded-xl p-6 hover:shadow-md hover:border-primary transition-all flex flex-col justify-between group">
                <div>
                  <h3 className="font-bold text-base group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                </div>
                <span className="text-xs font-bold text-primary mt-6 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Explore →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
