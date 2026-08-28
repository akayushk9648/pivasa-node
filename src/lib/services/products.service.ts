import { Product } from "@/types/database";
import { db, products } from "@/db";
import { eq, desc, and, ilike, or } from "drizzle-orm";

export { SAMPLE_PRODUCTS } from "@/lib/constants/sample-products";
import { SAMPLE_PRODUCTS } from "@/lib/constants/sample-products";


function mapDbProductToProduct(dbProd: any): Product {
  return {
    id: dbProd.id,
    link: dbProd.link,
    image_url: dbProd.imageUrl,
    category_id: dbProd.categoryId,
    status: dbProd.status,
    brand_series: dbProd.brandSeries,
    brand_name: dbProd.brandName,
    model_sku: dbProd.modelSku,
    capacity: dbProd.capacity,
    voltage: dbProd.voltage,
    plate_technology: dbProd.plateTechnology,
    total_warranty_months: dbProd.totalWarrantyMonths,
    foc_months: dbProd.focMonths,
    pro_rata_months: dbProd.proRataMonths,
    approx_mrp: parseFloat(dbProd.approxMrp),
    detailed_layout: dbProd.detailedLayout,
    is_in_stock: dbProd.isInStock,
    created_at: dbProd.createdAt ? new Date(dbProd.createdAt).toISOString() : new Date().toISOString(),
    updated_at: dbProd.updatedAt ? new Date(dbProd.updatedAt).toISOString() : new Date().toISOString(),
    category: dbProd.category ? {
      id: dbProd.category.id,
      category_name: dbProd.category.categoryName,
      parent_category_id: dbProd.category.parentCategoryId,
      description: dbProd.category.description,
      image_url: dbProd.category.imageUrl,
      status: dbProd.category.status,
      created_at: dbProd.category.createdAt ? new Date(dbProd.category.createdAt).toISOString() : new Date().toISOString(),
    } : null,
    inventory: dbProd.inventory ? {
      id: dbProd.inventory.id,
      product_id: dbProd.inventory.productId,
      warehouse_location: dbProd.inventory.warehouseLocation,
      quantity_available: dbProd.inventory.quantityAvailable,
      quantity_reserved: dbProd.inventory.quantityReserved,
      reorder_level: dbProd.inventory.reorderLevel,
      last_restocked_at: dbProd.inventory.lastRestockedAt,
      last_updated_by: dbProd.inventory.lastUpdatedBy,
      last_updated_at: dbProd.inventory.lastUpdatedAt ? new Date(dbProd.inventory.lastUpdatedAt).toISOString() : new Date().toISOString(),
    } : null,
  };
}

export async function getProducts(options?: {
  category?: string;
  brand?: string;
  inStockOnly?: boolean;
  search?: string;
}): Promise<Product[]> {
  try {
    const dbResults = await db.query.products.findMany({
      where: (p, { and, eq, ilike, or }) => {
        const conditions: any[] = [eq(p.status, "active")];
        if (options?.inStockOnly) {
          conditions.push(eq(p.isInStock, true));
        }
        if (options?.brand) {
          conditions.push(ilike(p.brandName, `%${options.brand}%`));
        }
        if (options?.search) {
          const brandMatch = ilike(p.brandName, `%${options.search}%`);
          const skuMatch = ilike(p.modelSku, `%${options.search}%`);
          const orClause = or(brandMatch, skuMatch);
          if (orClause) {
            conditions.push(orClause);
          }
        }
        return and(...conditions);
      },
      with: {
        category: true,
        inventory: true,
      },
      orderBy: [desc(products.createdAt)],
    });

    if (dbResults && dbResults.length > 0) {
      return dbResults.map(mapDbProductToProduct);
    }

    // Fallback to SAMPLE_PRODUCTS
    let list = [...SAMPLE_PRODUCTS];
    if (options?.inStockOnly) {
      list = list.filter((p) => p.is_in_stock);
    }
    if (options?.brand) {
      list = list.filter((p) => p.brand_name.toLowerCase().includes(options.brand!.toLowerCase()));
    }
    if (options?.search) {
      const q = options.search.toLowerCase();
      list = list.filter(
        (p) =>
          p.brand_name.toLowerCase().includes(q) ||
          p.model_sku.toLowerCase().includes(q)
      );
    }
    return list;
  } catch (err) {
    console.error("[GET_PRODUCTS_ERROR]", err);
    return SAMPLE_PRODUCTS;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const dbResult = await db.query.products.findFirst({
      where: eq(products.link, slug),
      with: {
        category: true,
        inventory: true,
      },
    });

    if (dbResult) {
      return mapDbProductToProduct(dbResult);
    }

    return SAMPLE_PRODUCTS.find((p) => p.link === slug) || null;
  } catch (err) {
    console.error("[GET_PRODUCT_BY_SLUG_ERROR]", err);
    return SAMPLE_PRODUCTS.find((p) => p.link === slug) || null;
  }
}
