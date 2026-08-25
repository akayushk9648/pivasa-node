import React from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Battery, 
  Zap, 
  ShieldCheck, 
  Wrench, 
  RotateCcw, 
  Sparkles, 
  PhoneCall, 
  CheckCircle2, 
  Award,
  Truck,
  TrendingUp
} from "lucide-react";
import { getProducts, SAMPLE_PRODUCTS } from "@/lib/services/products.service";
import ProductCard from "@/components/products/ProductCard";
import LoadCalculator from "@/components/calculator/LoadCalculator";

export default async function Home() {
  const products = await getProducts({ inStockOnly: true });

  const featuredBatteries = products.filter(
    (p) => p.plate_technology?.includes("Tubular") || p.capacity?.includes("Ah")
  ).slice(0, 3);

  const featuredInverters = products.filter(
    (p) => p.plate_technology?.includes("Sine Wave") || p.capacity?.includes("VA")
  ).slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. Hero Section (Deep Navy & Red Power Theme) */}
      <section className="relative bg-navy text-white overflow-hidden py-16 sm:py-24 border-b border-navy-light/50">
        {/* Background Gradients & Glow */}
        <div className="absolute inset-0 bg-radial-gradient from-navy-light/40 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-light border border-white/10 text-white text-xs font-bold shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-primary animate-ping" />
                <span>Authorized Exide Enterprise Dealer</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
                Uninterrupted Power for <span className="text-primary">Varanasi</span> Homes & Businesses
              </h1>

              <p className="text-base sm:text-xl text-slate-300 max-w-2xl leading-relaxed">
                Premium tubular inverter batteries, pure sine wave inverters, and automotive batteries with <strong className="text-white">free on-site delivery, installation, and instant scrap exchange discount</strong>.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Link
                  href="/products?category=inverter-batteries"
                  className="bg-primary hover:bg-primary-hover text-white font-extrabold px-8 py-4 rounded-xl flex items-center justify-center gap-2.5 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all text-base"
                >
                  Shop Inverters & Batteries <ArrowRight className="h-5 w-5" />
                </Link>

                <Link
                  href="#calculator"
                  className="bg-navy-light hover:bg-navy-light/80 text-white border border-white/15 font-bold px-7 py-4 rounded-xl flex items-center justify-center gap-2 transition-colors text-base"
                >
                  <Zap className="h-5 w-5 text-amber-400" /> Calculate My Load
                </Link>
              </div>

              {/* Verified Features Strip */}
              <div className="pt-6 border-t border-navy-light/60 grid grid-cols-3 gap-4 text-xs font-semibold text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <span>100% Genuine Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <span>Same-Day Varanasi Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <span>Official Brand Warranty</span>
                </div>
              </div>
            </div>

            {/* Hero Right: High-Impact Deal Card */}
            <div className="lg:col-span-5">
              <div className="bg-gradient-to-br from-navy-light to-navy-dark p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-primary text-white text-[11px] font-black uppercase px-3 py-1 rounded-full shadow-md">
                  Best Seller In Varanasi
                </div>

                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Featured High-Capacity Setup
                </div>

                <div className="mt-2 text-2xl font-black text-white">
                  Exide Inva Tubular IT500 150Ah
                </div>

                <p className="mt-1 text-xs text-slate-300">
                  Tall tubular battery engineered for long power cuts with 60 Months Total Warranty.
                </p>

                <div className="my-6 p-4 rounded-2xl bg-navy/60 border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 line-through">MRP ₹21,500</span>
                    <div className="text-3xl font-black text-white">₹18,500</div>
                    <span className="text-[11px] text-emerald-400 font-bold">With Old Scrap: ₹16,000</span>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-bold">
                      In Stock
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-300 mb-6">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-primary" /> 36 Months Free Replacement + 24M Pro-Rata
                  </div>
                  <div className="flex items-center gap-2">
                    <Wrench className="h-4 w-4 text-primary" /> Free Installation & Wire Terminals Check
                  </div>
                </div>

                <Link
                  href="/products/exide-inva-tubular-it500-150ah"
                  className="w-full bg-white hover:bg-slate-100 text-navy font-black py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm shadow-md"
                >
                  View Complete Specs <ArrowRight className="h-4 w-4 text-primary" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Trust Strip (White Surface with High-Contrast Navy & Red Badges) */}
      <section className="bg-white border-b border-slate-200 py-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex items-center gap-3.5">
              <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 text-primary shrink-0">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-navy text-sm">Official Warranty</h4>
                <p className="text-xs text-slate-500">100% Genuine Exide Certified</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-navy text-white shrink-0">
                <Wrench className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-navy text-sm">Free Installation</h4>
                <p className="text-xs text-slate-500">By certified battery engineers</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-emerald-100 text-emerald-700 shrink-0">
                <RotateCcw className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-navy text-sm">Old Scrap Exchange</h4>
                <p className="text-xs text-slate-500">Up to ₹3,000 off instantly</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-amber-100 text-amber-700 shrink-0">
                <Truck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-navy text-sm">Varanasi Fast Express</h4>
                <p className="text-xs text-slate-500">Delivery within 2 to 4 hours</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive Power Load & Inverter Calculator */}
      <LoadCalculator />

      {/* 4. Featured Best-Selling Batteries */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="text-xs font-black text-primary uppercase tracking-wider mb-1">
                Heavy Duty Power Storage
              </div>
              <h2 className="text-3xl font-black text-navy tracking-tight">
                Top Inverter Tubular Batteries
              </h2>
            </div>
            <Link
              href="/products?category=inverter-batteries"
              className="text-sm font-bold text-navy hover:text-primary flex items-center gap-1.5 transition-colors"
            >
              Browse All Inverter Batteries <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredBatteries.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>
      </section>

      {/* 5. Pure Sine Wave Inverters & Home UPS */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="text-xs font-black text-primary uppercase tracking-wider mb-1">
                Intelligent Backup Systems
              </div>
              <h2 className="text-3xl font-black text-navy tracking-tight">
                Pure Sine Wave Inverters & UPS
              </h2>
            </div>
            <Link
              href="/products?category=inverters-ups"
              className="text-sm font-bold text-navy hover:text-primary flex items-center gap-1.5 transition-colors"
            >
              Browse All Inverters <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredInverters.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>
      </section>

      {/* 6. Scrap Battery Exchange Callout Banner (Navy & Red) */}
      <section className="py-14 bg-navy text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="inline-block px-3 py-1 rounded-md bg-primary text-white text-xs font-extrabold uppercase tracking-wider">
                Eco-Friendly Recycle Trade-In
              </span>
              <h3 className="text-2xl sm:text-4xl font-black text-white">
                Have an Old Scrap Battery at Home? Get Instant Cash Discount!
              </h3>
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl">
                We accept old batteries of any brand (Exide, Amaron, Luminous, Okaya, Microtek). Our delivery engineer will inspect and collect your old scrap battery at your doorstep and deduct the scrap discount on the spot.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link
                href="/products"
                className="w-full text-center bg-primary hover:bg-primary-hover text-white font-extrabold py-3.5 px-6 rounded-xl text-sm shadow-lg shadow-primary/20 transition-all"
              >
                Shop New with Scrap Discount
              </Link>
              <a
                href="tel:+919839302493"
                className="w-full text-center bg-navy-light hover:bg-navy-light/80 text-white font-bold py-3.5 px-6 rounded-xl text-sm border border-white/20 transition-colors"
              >
                Inquire Scrap Valuation
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
