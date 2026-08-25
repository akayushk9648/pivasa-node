import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StorefrontShell from "@/components/layout/StorefrontShell";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pivasa Power | Authorized Exide Dealer in Varanasi",
  description: "Authorized Exide Dealer – Inverters, Batteries & Power Backup Solutions in Varanasi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <StorefrontShell>{children}</StorefrontShell>
      </body>
    </html>
  );
}
