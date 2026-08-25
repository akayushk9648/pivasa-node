"use client";

import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Header */}
      <section className="bg-navy text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-navy-light/60">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-primary">Get in Touch</span>
          <h1 className="text-3xl sm:text-4xl font-black text-white">Contact Pivasa Power Varanasi</h1>
          <p className="text-slate-300 text-sm">We are available 7 days a week for battery delivery, installation & support.</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Contact Information & Map */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-xl font-black text-navy">Store Location & Support Lines</h2>

              <div className="space-y-4 text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-navy block">Retail Store Address:</strong>
                    Ground Floor, Main Road, Niwada Sundarpur, Varanasi, Uttar Pradesh 221005 (near Neelkanth Electronics)
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <strong className="text-navy block">Helpline Numbers:</strong>
                    +91 98393 02493 / +91 98392 49333
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <strong className="text-navy block">Email Support:</strong>
                    support@pivasapower.com
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <strong className="text-navy block">Working Hours:</strong>
                    Mon – Sat: 9:30 AM – 8:30 PM | Sun: 10:00 AM – 2:00 PM
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="w-full h-48 rounded-2xl overflow-hidden border border-slate-200">
                <iframe
                  src="https://maps.google.com/maps?q=Sundarpur%20Varanasi&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  title="Pivasa Power Store Location Map"
                />
              </div>
            </div>
          </div>

          {/* Quick Message Form */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle2 className="h-12 w-12 text-emerald-600 mx-auto" />
                <h3 className="text-xl font-bold text-navy">Message Received</h3>
                <p className="text-xs text-slate-500">Our customer support executive will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
                <h2 className="text-xl font-black text-navy">Send us a Message / Service Request</h2>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ayush Sharma"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98393 00000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Subject / Requirement</label>
                  <select className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>Inverter & Battery Purchase Inquiry</option>
                    <option>Old Battery Scrap Valuation</option>
                    <option>Automotive Battery Replacement</option>
                    <option>Warranty Claim & On-site Service</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Message Details</label>
                  <textarea
                    rows={4}
                    placeholder="Describe your power backup requirements or delivery address..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-hover text-white font-extrabold py-3.5 rounded-xl text-sm shadow-md shadow-primary/20 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="h-4 w-4" /> Send Inquiry
                </button>
              </form>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}
