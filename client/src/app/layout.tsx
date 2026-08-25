import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pivasa Power | Authorized Exide Dealer in Varanasi",
  description: "Authorized Exide & Livguard Dealer in Varanasi. Best prices on inverter batteries, home UPS, solar panels, and car batteries with free local installation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // LocalBusiness JSON-LD for Local SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    "name": "Pivasa Power",
    "image": "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e",
    "telephone": "+919839302493",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Ground Floor, Main Road, Niwada Sundarpur",
      "addressLocality": "Varanasi",
      "addressRegion": "Uttar Pradesh",
      "postalCode": "221005",
      "addressCountry": "IN"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "10:00",
        "closes": "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "10:00",
        "closes": "14:00"
      }
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
