import { Product } from "@/types/database";
import { db, products, categories, inventory } from "@/db";
import { eq, desc, and, ilike, or } from "drizzle-orm";

export { SAMPLE_PRODUCTS } from "@/lib/constants/sample-products";
import { SAMPLE_PRODUCTS } from "@/lib/constants/sample-products";

function mapJoinedRowToProduct(row: {
  product: any;
  category: any;
  inventory: any;
}): Product {
  const dbProd = row.product;
  const dbCat = row.category;
  const dbInv = row.inventory;

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
    category: dbCat
      ? {
          id: dbCat.id,
          category_name: dbCat.categoryName,
          parent_category_id: dbCat.parentCategoryId,
          description: dbCat.description,
          image_url: dbCat.imageUrl,
          status: dbCat.status,
          created_at: dbCat.createdAt ? new Date(dbCat.createdAt).toISOString() : new Date().toISOString(),
        }
      : null,
    inventory: dbInv
      ? {
          id: dbInv.id,
          product_id: dbInv.productId,
          warehouse_location: dbInv.warehouseLocation,
          quantity_available: dbInv.quantityAvailable,
          quantity_reserved: dbInv.quantityReserved,
          reorder_level: dbInv.reorderLevel,
          last_restocked_at: dbInv.lastRestockedAt,
          last_updated_by: dbInv.lastUpdatedBy,
          last_updated_at: dbInv.lastUpdatedAt ? new Date(dbInv.lastUpdatedAt).toISOString() : new Date().toISOString(),
        }
      : null,
  };
}

export async function getProducts(options?: {
  category?: string;
  brand?: string;
  inStockOnly?: boolean;
  search?: string;
}): Promise<Product[]> {
  try {
    const conditions: any[] = [eq(products.status, "active")];

    if (options?.inStockOnly) {
      conditions.push(eq(products.isInStock, true));
    }
    if (options?.brand) {
      conditions.push(ilike(products.brandName, `%${options.brand}%`));
    }
    if (options?.search) {
      const brandMatch = ilike(products.brandName, `%${options.search}%`);
      const skuMatch = ilike(products.modelSku, `%${options.search}%`);
      conditions.push(or(brandMatch, skuMatch));
    }

    const rows = await db
      .select({
        product: products,
        category: categories,
        inventory: inventory,
      })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .leftJoin(inventory, eq(products.id, inventory.productId))
      .where(and(...conditions))
      .orderBy(desc(products.createdAt));

    if (rows && rows.length > 0) {
      return rows.map(mapJoinedRowToProduct);
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
    const rows = await db
      .select({
        product: products,
        category: categories,
        inventory: inventory,
      })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .leftJoin(inventory, eq(products.id, inventory.productId))
      .where(eq(products.link, slug))
      .limit(1);

    if (rows && rows.length > 0) {
      return mapJoinedRowToProduct(rows[0]);
    }

    return SAMPLE_PRODUCTS.find((p) => p.link === slug) || null;
  } catch (err) {
    console.error("[GET_PRODUCT_BY_SLUG_ERROR]", err);
    return SAMPLE_PRODUCTS.find((p) => p.link === slug) || null;
  }
}
