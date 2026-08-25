import React from "react";
import Link from "next/link";
import { ShieldCheck, CheckCircle2, PhoneCall, ArrowRight, HelpCircle } from "lucide-react";

export default function WarrantyPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Header */}
      <section className="bg-navy text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-navy-light/60">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-primary">Manufacturer Assurance</span>
          <h1 className="text-3xl sm:text-4xl font-black text-white">Warranty & Return Policies</h1>
          <p className="text-slate-300 text-sm">Clear, transparent warranty protection on every certified battery & inverter.</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        
        {/* FOC vs Pro Rata Explanation */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-xl font-black text-navy">Understanding Battery Warranty (FOC vs Pro-Rata)</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="inline-block px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-black">
                1. Free of Cost (FOC) Period
              </span>
              <h3 className="font-bold text-navy text-sm">100% Free Replacement</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                If the battery fails or drops below factory capacity during this period, the manufacturer will replace it completely free of charge.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="inline-block px-2.5 py-1 rounded-md bg-blue-100 text-blue-800 text-xs font-black">
                2. Pro-Rata Period
              </span>
              <h3 className="font-bold text-navy text-sm">Percentage Discount on New Battery</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                If the battery fails during the pro-rata term, you receive a proportional discount based on the prevailing MRP when purchasing a replacement battery.
              </p>
            </div>
          </div>
        </div>

        {/* Steps to Claim */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-xl font-black text-navy">How to Claim Warranty in Varanasi</h2>

          <div className="space-y-4 text-xs text-slate-600">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center h-6 w-6 rounded-full bg-navy text-white font-bold shrink-0">1</div>
              <div>
                <strong className="text-navy text-sm block">Call Our Varanasi Service Helpline</strong>
                Call <strong>+91 98393 02493</strong> or WhatsApp us with your battery model SKU and serial number printed on the top lid.
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center h-6 w-6 rounded-full bg-navy text-white font-bold shrink-0">2</div>
              <div>
                <strong className="text-navy text-sm block">Doorstep Inspection</strong>
                Our technician will visit your location in Varanasi to test specific gravity (acid level) and voltage under load.
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center h-6 w-6 rounded-full bg-navy text-white font-bold shrink-0">3</div>
              <div>
                <strong className="text-navy text-sm block">Instant Replacement / Service Handover</strong>
                If the battery is within the FOC period, an authorized brand replacement unit will be issued.
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-navy text-white p-6 rounded-2xl flex items-center justify-between">
          <div className="text-xs">
            <strong className="text-white block text-sm">Need Help with an Existing Battery?</strong>
            Our Varanasi store team is here to assist you with authorized paperwork.
          </div>
          <Link
            href="/contact"
            className="bg-primary hover:bg-primary-hover text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors"
          >
            Contact Support
          </Link>
        </div>

      </div>

    </div>
  );
}
