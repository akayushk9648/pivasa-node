"use client";

import { useEffect, useState } from "react";
import { fetchProducts, fetchPublicBrands } from "@/lib/api";
import { ShieldCheck, Filter, ShoppingCart, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ProductsPage({ searchParams }: { searchParams: { category?: string } }) {
  const [products, setProducts] = useState<any[]>([]);
  const [dbBrands, setDbBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState<string>("All");
  const [selectedBatteryType, setSelectedBatteryType] = useState<string>("All");

  const categoryFilter = searchParams?.category || "";

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [prodData, brandData] = await Promise.allSettled([
          fetchProducts(categoryFilter ? { category: categoryFilter } : {}),
          fetchPublicBrands()
        ]);

        if (prodData.status === 'fulfilled') {
          const val = prodData.value;
          setProducts(Array.isArray(val) ? val : (val?.products || []));
        }
        if (brandData.status === 'fulfilled') {
          setDbBrands(Array.isArray(brandData.value) ? brandData.value : []);
        }
      } catch (e) {
        console.error("Error loading storefront catalog:", e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [categoryFilter]);

  const filteredProducts = products.filter(p => {
    if (selectedBrand !== "All" && p.brand.toLowerCase() !== selectedBrand.toLowerCase()) return false;
    if (selectedBatteryType !== "All" && p.batteryType?.toLowerCase() !== selectedBatteryType.toLowerCase()) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold capitalize">
          {categoryFilter ? categoryFilter.replace('-', ' ') : 'All Batteries & Power Products'}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Authorized Exide & Livguard inventory available for free installation in Varanasi.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <aside className="space-y-6 bg-white p-6 rounded-xl border border-border h-fit shadow-sm">
          <div className="flex items-center gap-2 font-bold text-lg border-b border-border pb-3">
            <Filter className="h-5 w-5 text-primary" /> Filter Products
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Brand</label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background font-bold"
            >
              <option value="All">All Brands</option>
              {dbBrands.map((b) => (
                <option key={b.id || b.name} value={b.name}>{b.name}</option>
              ))}
              {dbBrands.length === 0 && (
                <>
                  <option value="Exide">Exide</option>
                  <option value="Livguard">Livguard</option>
                </>
              )}
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Battery Type</label>
            <select
              value={selectedBatteryType}
              onChange={(e) => setSelectedBatteryType(e.target.value)}
              className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background font-bold"
            >
              <option value="All">All Types</option>
              <option value="Tubular">Tubular</option>
              <option value="Flat Plate">Flat Plate</option>
              <option value="SMF">SMF / VRLA</option>
            </select>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="md:col-span-3">
          {loading ? (
            <div className="py-20 text-center text-muted-foreground font-medium">Loading live Supabase inventory...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-20 text-center bg-white rounded-xl border border-border p-8 space-y-2">
              <p className="text-lg font-bold text-muted-foreground">No products found matching your filters.</p>
              <p className="text-xs text-muted-foreground">Check back soon or add items via the Admin Panel!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((p) => (
                <div key={p.id || p.sku} className="bg-white border border-border rounded-xl p-5 flex flex-col justify-between hover:shadow-md hover:border-primary transition-all group">
                  <div>
                    {p.brand?.toLowerCase() === 'exide' && (
                      <span className="inline-block text-[10px] font-extrabold bg-primary text-primary-foreground px-2 py-0.5 rounded mb-2">
                        ★ Authorized Exide Dealer
                      </span>
                    )}
                    <h3 className="font-bold text-base leading-tight mb-2 group-hover:text-primary transition-colors">{p.name}</h3>
                    
                    <div className="text-xs text-muted-foreground space-y-1 mb-4">
                      <p><strong>Brand:</strong> {p.brand}</p>
                      {p.capacityAh > 0 && <p><strong>Capacity:</strong> {p.capacityAh} Ah</p>}
                      {p.warrantyMonths > 0 && <p><strong>Warranty:</strong> {p.warrantyMonths} Months</p>}
                    </div>
                  </div>

                  <div className="border-t border-border pt-4 mt-2">
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-xl font-extrabold text-primary">₹{Number(p.price).toLocaleString('en-IN')}</span>
                      {p.discountPrice && (
                        <span className="text-xs text-muted-foreground line-through">₹{Number(p.discountPrice).toLocaleString('en-IN')}</span>
                      )}
                    </div>
                    
                    <Link href={`/cart?add=${p.sku}`} className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 text-sm transition-colors">
                      <ShoppingCart className="h-4 w-4" /> Add to Cart (COD)
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
