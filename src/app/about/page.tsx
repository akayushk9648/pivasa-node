import React from "react";
import Link from "next/link";
import { ShieldCheck, Award, Wrench, Battery, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Banner */}
      <section className="bg-navy text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-navy-light/60">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-navy-light text-primary text-xs font-black uppercase tracking-wider border border-primary/20">
            About Pivasa Power
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Varanasi&apos;s Trusted Energy & Battery Hub
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Authorized enterprise dealer for EXIDE power systems. Delivering genuine factory-certified batteries, sinewave inverters, and heavy-duty backup power solutions since 2012.
          </p>
        </div>
      </section>

      {/* Story Grid */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-2xl font-black text-navy">Why Choose Pivasa Power?</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Power cuts in Varanasi demand resilient, deep-cycle backup technology. Pivasa Power was founded to provide homeowners, hospital administrators, educational institutions, and shop owners with 100% authentic, high-performance battery setups backed by on-site service.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-navy text-sm">
                <ShieldCheck className="h-5 w-5 text-primary" /> Direct Factory Authorization
              </div>
              <p className="text-xs text-slate-500">
                Every battery carries an official manufacturer warranty registered online at installation.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-navy text-sm">
                <Wrench className="h-5 w-5 text-primary" /> Free Doorstep Installation
              </div>
              <p className="text-xs text-slate-500">
                Certified electrical technicians inspect your wiring, inverter compatibility, and load balance.
              </p>
            </div>
          </div>
        </div>

        {/* Location & Retail Store */}
        <div className="bg-navy text-white p-8 sm:p-10 rounded-3xl border border-navy-light flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white">Visit Our Experience Store in Varanasi</h3>
            <p className="text-xs text-slate-300 mt-1">Ground Floor, Main Road, Niwada Sundarpur, Varanasi (221005)</p>
          </div>
          <Link
            href="/contact"
            className="bg-primary hover:bg-primary-hover text-white font-extrabold px-6 py-3 rounded-xl text-xs shadow-md transition-all shrink-0"
          >
            Get Directions & Helpline <ArrowRight className="h-4 w-4 inline-block ml-1" />
          </Link>
        </div>
      </section>

    </div>
  );
}
