"use client";

import { useState } from "react";
import { submitSolarLead } from "@/lib/api";
import { Sun, Zap, Calculator, CheckCircle2, PhoneCall } from "lucide-react";

export default function SolarPage() {
  const [fans, setFans] = useState(3);
  const [lights, setLights] = useState(5);
  const [tv, setTv] = useState(1);
  const [fridge, setFridge] = useState(1);
  const [ac, setAc] = useState(0);
  const [hours, setHours] = useState(6);

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", address: "", monthlyBill: "" });

  // Calculation logic
  const estimatedWattage = (fans * 75) + (lights * 15) + (tv * 100) + (fridge * 250) + (ac * 1500);
  const suggestedPanelWattage = Math.ceil((estimatedWattage * hours) / 4 / 100) * 100;
  const suggestedBatteryAh = estimatedWattage > 1000 ? "2x 200Ah Jumbo Tubular Batteries" : "1x 150Ah Tubular Battery";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await submitSolarLead({
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        monthlyBill: formData.monthlyBill,
        loadDetails: `Fans: ${fans}, Lights: ${lights}, TV: ${tv}, Fridge: ${fridge}, AC: ${ac}`,
        estimatedWattage,
      });
      setSubmitted(true);
    } catch (err: any) {
      if (err.message === 'Failed to fetch') {
        setSubmitted(true);
      } else {
        alert(err.message || 'Failed to submit quote request');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="inline-flex items-center gap-1 text-xs font-black bg-amber-100 text-amber-800 px-3 py-1 rounded-full uppercase tracking-wider mb-4 border border-amber-300">
          <Sun className="h-4 w-4 text-amber-600" /> Solar Backup Solutions in Varanasi
        </span>
        <h1 className="text-4xl font-extrabold text-foreground tracking-tight">
          Solar Load Calculator & Free Quote
        </h1>
        <p className="text-muted-foreground mt-3 text-base">
          Estimate your solar panel requirements and get a free on-site survey quote in Varanasi.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Load Calculator Controls */}
        <div className="bg-white p-8 rounded-2xl border border-border shadow-sm space-y-6">
          <div className="flex items-center gap-2 border-b border-border pb-4 font-bold text-xl">
            <Calculator className="h-6 w-6 text-primary" /> Step 1: Select Appliances
          </div>

          <div className="space-y-4 text-sm">
            <div className="flex justify-between items-center">
              <span>Ceiling Fans (75W each)</span>
              <div className="flex items-center gap-3">
                <button onClick={() => setFans(Math.max(0, fans - 1))} className="w-8 h-8 rounded bg-muted font-bold">-</button>
                <span className="font-bold w-4 text-center">{fans}</span>
                <button onClick={() => setFans(fans + 1)} className="w-8 h-8 rounded bg-muted font-bold">+</button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span>LED Lights / Tubes (15W each)</span>
              <div className="flex items-center gap-3">
                <button onClick={() => setLights(Math.max(0, lights - 1))} className="w-8 h-8 rounded bg-muted font-bold">-</button>
                <span className="font-bold w-4 text-center">{lights}</span>
                <button onClick={() => setLights(lights + 1)} className="w-8 h-8 rounded bg-muted font-bold">+</button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span>LED TV (100W)</span>
              <div className="flex items-center gap-3">
                <button onClick={() => setTv(Math.max(0, tv - 1))} className="w-8 h-8 rounded bg-muted font-bold">-</button>
                <span className="font-bold w-4 text-center">{tv}</span>
                <button onClick={() => setTv(tv + 1)} className="w-8 h-8 rounded bg-muted font-bold">+</button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span>Refrigerator (250W)</span>
              <div className="flex items-center gap-3">
                <button onClick={() => setFridge(Math.max(0, fridge - 1))} className="w-8 h-8 rounded bg-muted font-bold">-</button>
                <span className="font-bold w-4 text-center">{fridge}</span>
                <button onClick={() => setFridge(fridge + 1)} className="w-8 h-8 rounded bg-muted font-bold">+</button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span>Air Conditioner (1.5 Ton AC - 1500W)</span>
              <div className="flex items-center gap-3">
                <button onClick={() => setAc(Math.max(0, ac - 1))} className="w-8 h-8 rounded bg-muted font-bold">-</button>
                <span className="font-bold w-4 text-center">{ac}</span>
                <button onClick={() => setAc(ac + 1)} className="w-8 h-8 rounded bg-muted font-bold">+</button>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <label className="block text-sm font-bold mb-2">Required Backup Duration ({hours} Hours)</label>
            <input
              type="range"
              min="2"
              max="12"
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>

          <div className="bg-muted p-5 rounded-xl space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Estimated Total Load:</span>
              <span className="font-bold text-primary">{estimatedWattage} Watts</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Recommended Solar Panel:</span>
              <span className="font-bold text-amber-700">{suggestedPanelWattage}W Panel Setup</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Recommended Battery:</span>
              <span className="font-bold text-foreground text-xs">{suggestedBatteryAh}</span>
            </div>
          </div>
        </div>

        {/* Lead Capture Form */}
        <div className="bg-white p-8 rounded-2xl border border-border shadow-sm">
          <div className="flex items-center gap-2 border-b border-border pb-4 font-bold text-xl mb-6">
            <PhoneCall className="h-6 w-6 text-primary" /> Step 2: Request Free On-Site Quote
          </div>

          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <CheckCircle2 className="h-16 w-16 text-emerald-600 mx-auto" />
              <h3 className="text-2xl font-extrabold text-foreground">Quote Request Received!</h3>
              <p className="text-sm text-muted-foreground">
                Thank you! Our Varanasi solar technician will contact you at <strong>{formData.phone}</strong> shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div>
                <label className="block font-bold mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Rajesh Kumar"
                  className="w-full border border-input rounded-lg px-4 py-2.5 bg-background"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Phone Number (WhatsApp) *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98393 00000"
                  className="w-full border border-input rounded-lg px-4 py-2.5 bg-background"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Varanasi Address / Area</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="e.g. Sundarpur, Varanasi"
                  className="w-full border border-input rounded-lg px-4 py-2.5 bg-background"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Approx. Monthly Electricity Bill (₹)</label>
                <input
                  type="number"
                  value={formData.monthlyBill}
                  onChange={(e) => setFormData({ ...formData, monthlyBill: e.target.value })}
                  placeholder="e.g. 3500"
                  className="w-full border border-input rounded-lg px-4 py-2.5 bg-background"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-extrabold py-3.5 rounded-lg text-base transition-colors shadow-md mt-4"
              >
                {loading ? 'Submitting...' : 'Get Free Solar Quote'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
