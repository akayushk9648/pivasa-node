import { Product } from "@/types/database";
import { db, products } from "@/db";
import { eq, desc, and, ilike, or } from "drizzle-orm";

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "d0000000-0000-0000-0000-000000000001",
    link: "exide-inva-tubular-it500-150ah",
    image_url: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80",
    status: "active",
    brand_series: "Inva Tubular Heavy Duty",
    brand_name: "Exide",
    model_sku: "EX-IT500-150AH",
    capacity: "150 Ah",
    voltage: "12V",
    plate_technology: "Tall Tubular Technology",
    total_warranty_months: 60,
    foc_months: 36,
    pro_rata_months: 24,
    approx_mrp: 18500,
    is_in_stock: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    detailed_layout: {
      dimensions_mm: { length: 505, width: 190, height: 410 },
      filled_weight_kg: 53.5,
      electrolyte_volume_litres: 18.2,
      terminal_type: "Standard Lead Post",
      recommended_inverter_va: "900VA - 1500VA",
      features: [
        "Thick tubular spine cast at high pressure (100 bar) for long life",
        "Factory-charged & ready for immediate installation",
        "Tower type design with low water loss technology",
        "Ceramic vent plugs with float guide indicators",
      ],
    },
  },
  {
    id: "d0000000-0000-0000-0000-000000000002",
    link: "luminous-eco-volt-neo-1050-sine-wave",
    image_url: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=800&q=80",
    status: "active",
    brand_series: "Eco Volt Neo Series",
    brand_name: "Luminous",
    model_sku: "LUM-EV-NEO-1050",
    capacity: "900 VA / 756W",
    voltage: "12V DC / 230V AC",
    plate_technology: "Pure Sine Wave Microcontroller",
    total_warranty_months: 24,
    foc_months: 24,
    pro_rata_months: 0,
    approx_mrp: 7200,
    is_in_stock: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    detailed_layout: {
      dimensions_mm: { length: 275, width: 260, height: 115 },
      weight_kg: 8.5,
      display_type: "LED Indicators",
      max_charging_current_amp: 17,
      supported_battery_types: ["Flat Plate", "Tubular", "SMF/VRLA"],
      features: [
        "Pure Sine Wave output protects sensitive appliances",
        "Adaptive Fast Charging Technology extends battery life",
        "Supports wide battery capacity range (80Ah - 220Ah)",
      ],
    },
  },
  {
    id: "d0000000-0000-0000-0000-000000000003",
    link: "apc-back-ups-bx600c-in",
    image_url: "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=800&q=80",
    status: "active",
    brand_series: "Back-UPS Compact",
    brand_name: "APC by Schneider Electric",
    model_sku: "APC-BX600C-IN",
    capacity: "600 VA / 360W",
    voltage: "230V AC",
    plate_technology: "Sealed Maintenance Free (SMF)",
    total_warranty_months: 24,
    foc_months: 24,
    pro_rata_months: 0,
    approx_mrp: 3850,
    is_in_stock: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    detailed_layout: {
      battery_type: "12V 7.2Ah SMF Lead Acid",
      recharge_time_hours: 6,
      output_receptacles: 3,
      backup_time_desktop_pc_mins: 20,
    },
  },
];

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
