import Link from "next/link";
import Logo from "./Logo";
import { MapPin, Phone, Mail, Clock, ShieldCheck, CheckCircle2, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-slate-300 border-t border-navy-light/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Col */}
          <div className="space-y-5">
            <Logo light={true} />
            <p className="text-sm text-slate-400 leading-relaxed">
              Authorized EXIDE Enterprise Dealer. Delivering certified industrial batteries, pure sinewave inverters, and high-efficiency power backup solutions across Varanasi with free installation.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-light text-primary text-xs font-bold border border-primary/20">
                <ShieldCheck className="h-3.5 w-3.5" /> 100% Genuine Certified
              </span>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-base text-white tracking-wide uppercase mb-4">
              Products & Solutions
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/products?category=inverter-batteries" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Tall Tubular Batteries
                </Link>
              </li>
              <li>
                <Link href="/products?category=inverters-ups" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Pure Sine Wave Inverters
                </Link>
              </li>
              <li>
                <Link href="/products?category=automotive-batteries" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Automotive Car & Bike Batteries
                </Link>
              </li>
              <li>
                <Link href="/#calculator" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Load & Battery Calculator
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Battery Trolleys & Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Store Hours & Support */}
          <div>
            <h3 className="font-bold text-base text-white tracking-wide uppercase mb-4">
              Store Hours & Support
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <Clock className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Mon – Sat: 9:30 AM – 8:30 PM</p>
                  <p className="text-slate-400 text-xs">Sunday: 10:00 AM – 2:00 PM</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <span className="text-slate-200 font-medium">+91 98393 02493 / +91 98392 49333</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <span className="text-slate-300">support@pivasapower.com</span>
              </div>
            </div>
          </div>

          {/* Store Location in Varanasi */}
          <div>
            <h3 className="font-bold text-base text-white tracking-wide uppercase mb-4">
              Varanasi Retail Hub
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span className="text-slate-300 text-xs leading-relaxed">
                  Ground Floor, Main Road, Niwada Sundarpur, Varanasi, Uttar Pradesh 221005 (near Neelkanth Electronics)
                </span>
              </div>
              <div className="w-full h-28 bg-navy-light rounded-lg overflow-hidden border border-white/10 shadow-inner">
                <iframe 
                  src="https://maps.google.com/maps?q=Sundarpur%20Varanasi&t=&z=13&ie=UTF8&iwloc=&output=embed" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={false} 
                  loading="lazy"
                  title="Pivasa Power Store Location"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-navy-light/60 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Pivasa Power. Authorized EXIDE Enterprise Dealer. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Free Delivery in Varanasi</span>
            <span>•</span>
            <span>Instant Old Battery Scrap Value</span>
            <span>•</span>
            <span>Genuine Manufacturer Warranty</span>
          </div>
        </div>
      </div>
      
      {/* Sticky Mobile Call / WhatsApp Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 grid grid-cols-2 shadow-2xl z-50 border-t border-navy-light">
        <a 
          href="tel:+919839302493" 
          className="bg-primary hover:bg-primary-hover text-white py-3.5 flex items-center justify-center gap-2 font-bold text-sm"
        >
          <Phone className="h-4 w-4" /> Call Helpline
        </a>
        <a 
          href="https://wa.me/919839302493?text=Hi%20Pivasa%20Power,%20I%20need%20assistance%20with%20a%20battery/inverter." 
          target="_blank" 
          rel="noopener noreferrer" 
          className="bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 flex items-center justify-center gap-2 font-bold text-sm"
        >
          <MessageCircle className="h-4 w-4" /> WhatsApp Us
        </a>
      </div>
    </footer>
  );
}
