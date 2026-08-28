import React from "react";
import Link from "next/link";
import { getProducts } from "@/lib/services/products.service";
import ProductCard from "@/components/products/ProductCard";
import { Filter, Search, SlidersHorizontal, ArrowLeft, Battery, Zap, ShieldCheck } from "lucide-react";

interface ProductsPageProps {
  searchParams: {
    category?: string;
    brand?: string;
    inStock?: string;
    q?: string;
    sort?: string;
  };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const allProducts = await getProducts();
  const activeCategory = searchParams.category || "";
  const activeBrand = searchParams.brand || "";
  const inStockOnly = searchParams.inStock === "true";
  const searchQuery = (searchParams.q || "").toLowerCase();
  const sortOption = searchParams.sort || "default";

  // Filter products based on searchParams
  let filtered = allProducts.filter((product) => {
    // Category match
    if (activeCategory) {
      const catSlug = activeCategory.toLowerCase();
      const catName = (product.category?.category_name || "").toLowerCase();
      const catId = (product.category_id || "").toLowerCase();

      let matchCat = catId === catSlug || catName.includes(catSlug);

      if (catSlug === "inverter-batteries" || catSlug === "tubular-batteries") {
        matchCat =
          catId === "b0000000-0000-0000-0000-000000000001" ||
          catName.includes("tubular") ||
          (Boolean(product.plate_technology?.toLowerCase().includes("tubular")) && !catName.includes("e-rickshaw") && !catName.includes("solar"));
      } else if (catSlug === "inverters-ups" || catSlug === "inverters") {
        matchCat =
          catId === "b0000000-0000-0000-0000-000000000002" ||
          catName.includes("ups") ||
          (catName.includes("inverter") && !catName.includes("tubular") && !catName.includes("batter")) ||
          Boolean(product.capacity?.toLowerCase().includes("va")) ||
          Boolean(product.capacity?.toLowerCase().includes("wh")) ||
          Boolean(product.plate_technology?.toLowerCase().includes("sine wave"));
      } else if (catSlug === "car-batteries" || catSlug === "automotive-batteries" || catSlug === "passenger-car") {
        matchCat =
          catId === "b0000000-0000-0000-0000-000000000003" ||
          catName.includes("passenger") ||
          catName.includes("car");
      } else if (catSlug === "two-wheeler-batteries" || catSlug === "bike-batteries" || catSlug === "two-wheeler") {
        matchCat =
          catId === "b0000000-0000-0000-0000-000000000004" ||
          catName.includes("two wheeler") ||
          catName.includes("bike");
      } else if (catSlug === "commercial-batteries" || catSlug === "truck-batteries" || catSlug === "commercial") {
        matchCat =
          catId === "b0000000-0000-0000-0000-000000000005" ||
          catName.includes("commercial") ||
          catName.includes("truck") ||
          catName.includes("tractor");
      } else if (catSlug === "e-rickshaw-batteries" || catSlug === "three-wheeler-batteries" || catSlug === "e-rickshaw") {
        matchCat =
          catId === "b0000000-0000-0000-0000-000000000006" ||
          catName.includes("e-rickshaw") ||
          catName.includes("three wheeler");
      } else if (catSlug === "solar-batteries" || catSlug === "genset-batteries" || catSlug === "solar") {
        matchCat =
          catId === "b0000000-0000-0000-0000-000000000007" ||
          catName.includes("solar") ||
          catName.includes("genset");
      } else if (catSlug === "industrial-batteries" || catSlug === "industrial") {
        matchCat =
          catId === "b0000000-0000-0000-0000-000000000008" ||
          catName.includes("industrial") ||
          catName.includes("standby");
      }

      if (!matchCat) return false;
    }

    // Brand match
    if (activeBrand && product.brand_name.toLowerCase() !== activeBrand.toLowerCase()) {
      return false;
    }

    // In-Stock match
    if (inStockOnly && !product.is_in_stock) {
      return false;
    }

    // Search query match
    if (searchQuery) {
      const match =
        product.brand_name.toLowerCase().includes(searchQuery) ||
        product.model_sku.toLowerCase().includes(searchQuery) ||
        (product.brand_series && product.brand_series.toLowerCase().includes(searchQuery)) ||
        (product.capacity && product.capacity.toLowerCase().includes(searchQuery)) ||
        (product.plate_technology && product.plate_technology.toLowerCase().includes(searchQuery)) ||
        (product.detailed_layout?.application && product.detailed_layout.application.toLowerCase().includes(searchQuery));
      if (!match) return false;
    }

    return true;
  });

  // Sort
  if (sortOption === "price_asc") {
    filtered.sort((a, b) => a.approx_mrp - b.approx_mrp);
  } else if (sortOption === "price_desc") {
    filtered.sort((a, b) => b.approx_mrp - a.approx_mrp);
  } else if (sortOption === "warranty_desc") {
    filtered.sort((a, b) => b.total_warranty_months - a.total_warranty_months);
  }

  const dynamicBrands = Array.from(new Set(allProducts.map((p) => p.brand_name).filter(Boolean)));
  const defaultBrands = ["Exide", "Amaron", "Luminous", "Microtek", "APC by Schneider Electric"];
  const brands = Array.from(new Set([...dynamicBrands, ...defaultBrands]));

  const catalogCategories = [
    { slug: "inverter-batteries", label: "Inverter Tubular Batteries" },
    { slug: "inverters-ups", label: "Inverters & Home UPS" },
    { slug: "car-batteries", label: "Car & Passenger Batteries" },
    { slug: "two-wheeler-batteries", label: "Two Wheeler Batteries" },
    { slug: "commercial-batteries", label: "Commercial & Truck Batteries" },
    { slug: "e-rickshaw-batteries", label: "Three Wheeler & E-Rickshaw" },
    { slug: "solar-batteries", label: "Genset & Solar Batteries" },
    { slug: "industrial-batteries", label: "Industrial & Standby Power" },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Page Header Banner */}
      <div className="bg-navy text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-navy-light/60">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-1">
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                <span>/</span>
                <span className="text-white">Product Catalog</span>
              </div>
              <h1 className="text-3xl font-black tracking-tight text-white">
                Certified Inverters, Batteries & Power Systems
              </h1>
              <p className="text-sm text-slate-300 mt-1">
                Showing {filtered.length} products available for delivery & free installation in Varanasi.
              </p>
            </div>

            {/* Live Search Form */}
            <form method="GET" action="/products" className="relative w-full md:w-80">
              <input
                type="text"
                name="q"
                defaultValue={searchParams.q || ""}
                placeholder="Search SKU, brand, Ah, VA..."
                className="w-full bg-navy-light/80 text-white placeholder-slate-400 pl-10 pr-4 py-2.5 rounded-xl border border-white/15 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-inner"
              />
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              {activeCategory && <input type="hidden" name="category" value={activeCategory} />}
              {activeBrand && <input type="hidden" name="brand" value={activeBrand} />}
              {inStockOnly && <input type="hidden" name="inStock" value="true" />}
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar Filters */}
          <aside className="lg:col-span-3 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-extrabold text-navy text-sm flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-primary" /> Filter Products
              </span>
              <Link href="/products" className="text-xs font-semibold text-primary hover:underline">
                Clear All
              </Link>
            </div>

            {/* Filter 1: Categories */}
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-2.5">Category</h3>
              <div className="space-y-1 text-sm font-medium">
                <Link
                  href={`/products?${new URLSearchParams({ ...(activeBrand && { brand: activeBrand }), ...(inStockOnly && { inStock: "true" }) }).toString()}`}
                  className={`block px-3 py-2 rounded-lg transition-colors ${
                    !activeCategory ? "bg-navy text-white font-bold" : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  All Categories
                </Link>
                {catalogCategories.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/products?${new URLSearchParams({
                      category: c.slug,
                      ...(activeBrand && { brand: activeBrand }),
                      ...(inStockOnly && { inStock: "true" }),
                    }).toString()}`}
                    className={`block px-3 py-2 rounded-lg transition-colors ${
                      activeCategory === c.slug ? "bg-navy text-white font-bold" : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Filter 2: Brands */}
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-2.5">Brand</h3>
              <div className="space-y-1 text-sm font-medium">
                {brands.map((b) => (
                  <Link
                    key={b}
                    href={`/products?${new URLSearchParams({
                      ...(activeCategory && { category: activeCategory }),
                      brand: activeBrand === b ? "" : b,
                      ...(inStockOnly && { inStock: "true" }),
                    }).toString()}`}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                      activeBrand === b ? "bg-primary text-white font-bold" : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <span>{b}</span>
                    {activeBrand === b && <span className="text-xs">✓</span>}
                  </Link>
                ))}
              </div>
            </div>

            {/* Filter 3: Stock Status */}
            <div className="pt-3 border-t border-slate-100">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-2.5">Availability</h3>
              <Link
                href={`/products?${new URLSearchParams({
                  ...(activeCategory && { category: activeCategory }),
                  ...(activeBrand && { brand: activeBrand }),
                  inStock: inStockOnly ? "" : "true",
                }).toString()}`}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  inStockOnly ? "bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold" : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <div className={`h-3 w-3 rounded-full ${inStockOnly ? "bg-emerald-600" : "border border-slate-400"}`} />
                <span>In-Stock Items Only</span>
              </Link>
            </div>

          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-9 space-y-6">
            
            {/* Sorting & Result Count Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm gap-3">
              <div className="text-xs font-semibold text-slate-600">
                Found <strong className="text-navy">{filtered.length}</strong> matching power products
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-navy">
                <span>Sort By:</span>
                <Link
                  href={`/products?${new URLSearchParams({
                    ...(activeCategory && { category: activeCategory }),
                    ...(activeBrand && { brand: activeBrand }),
                    ...(inStockOnly && { inStock: "true" }),
                    sort: "price_asc",
                  }).toString()}`}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    sortOption === "price_asc" ? "bg-navy text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Price: Low to High
                </Link>
                <Link
                  href={`/products?${new URLSearchParams({
                    ...(activeCategory && { category: activeCategory }),
                    ...(activeBrand && { brand: activeBrand }),
                    ...(inStockOnly && { inStock: "true" }),
                    sort: "warranty_desc",
                  }).toString()}`}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    sortOption === "warranty_desc" ? "bg-navy text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Longest Warranty
                </Link>
              </div>
            </div>

            {/* Product Cards Grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-4">
                <Battery className="h-12 w-12 text-slate-300 mx-auto" />
                <h3 className="text-lg font-bold text-navy">No matching products found</h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto">
                  Try adjusting or clearing your filters to see other certified batteries and inverters in our catalog.
                </p>
                <Link
                  href="/products"
                  className="inline-block bg-primary text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow-md"
                >
                  View All Products
                </Link>
              </div>
            )}

          </main>

        </div>
      </div>

    </div>
  );
}
