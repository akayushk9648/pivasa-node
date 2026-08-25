import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/lib/services/products.service";
import ProductDetailClient from "./ProductDetailClient";
import ProductCard from "@/components/products/ProductCard";
import { ShieldCheck, Truck, Wrench, RotateCcw, ArrowLeft } from "lucide-react";

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const allProducts = await getProducts({ inStockOnly: true });
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && p.brand_name === product.brand_name)
    .slice(0, 3);

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-200 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
          <span>/</span>
          <span className="text-navy font-bold">{product.brand_name} {product.model_sku}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Main Product Presentation */}
        <ProductDetailClient product={product} />

        {/* Related / Alternative Models */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-slate-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-black text-primary uppercase tracking-wider">
                  Similar Models
                </span>
                <h3 className="text-2xl font-black text-navy tracking-tight">
                  More from {product.brand_name}
                </h3>
              </div>
              <Link
                href={`/products?brand=${product.brand_name}`}
                className="text-xs font-bold text-navy hover:text-primary transition-colors"
              >
                View all {product.brand_name} products →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
