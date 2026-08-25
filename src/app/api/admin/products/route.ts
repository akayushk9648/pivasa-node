import { NextRequest, NextResponse } from "next/server";
import { db, products, inventory, categories } from "@/db";
import { eq, desc, ilike, or } from "drizzle-orm";
import { logError, logInfo } from "@/lib/logger";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const brand = searchParams.get("brand") || "";

    const allProducts = await db.query.products.findMany({
      where: (p, { and, eq, ilike, or }) => {
        const conditions = [];
        if (brand) {
          conditions.push(ilike(p.brandName, `%${brand}%`));
        }
        if (search) {
          conditions.push(
            or(
              ilike(p.brandName, `%${search}%`),
              ilike(p.modelSku, `%${search}%`),
              ilike(p.link, `%${search}%`)
            )
          );
        }
        return conditions.length > 0 ? and(...conditions) : undefined;
      },
      with: {
        category: true,
        inventory: true,
      },
      orderBy: [desc(products.createdAt)],
    });

    return NextResponse.json({
      success: true,
      products: allProducts,
      count: allProducts.length,
    });
  } catch (err: any) {
    logError(err, { route: "/api/admin/products", method: "GET" }, "DATABASE_ERROR");
    return NextResponse.json({ error: err.message || "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      brandName,
      modelSku,
      approxMrp,
      brandSeries,
      capacity,
      voltage,
      plateTechnology,
      totalWarrantyMonths,
      focMonths,
      proRataMonths,
      imageUrl,
      link,
      categoryId,
      isInStock,
      initialQuantity = 10,
      features,
    } = body;

    if (!brandName || !modelSku || !approxMrp) {
      return NextResponse.json(
        { error: "Missing required fields: brandName, modelSku, approxMrp" },
        { status: 400 }
      );
    }

    const generatedLink = link || (modelSku + "-" + brandName).toLowerCase().replace(/[^a-z0-9]+/g, "-");

    // Check SKU duplication
    const existing = await db.query.products.findFirst({
      where: eq(products.modelSku, modelSku),
    });

    if (existing) {
      return NextResponse.json(
        { error: `Product with SKU '${modelSku}' already exists.` },
        { status: 400 }
      );
    }

    const totalWarranty = Number(totalWarrantyMonths) || 36;
    let foc = Number(focMonths);
    let proRata = Number(proRataMonths);
    if (isNaN(foc) || foc <= 0) {
      foc = totalWarranty;
      proRata = 0;
    } else if (foc > totalWarranty) {
      foc = totalWarranty;
      proRata = 0;
    } else {
      proRata = totalWarranty - foc;
    }

    // Insert Product
    const [newProduct] = await db.insert(products).values({
      brandName,
      modelSku,
      brandSeries: brandSeries || null,
      link: generatedLink,
      categoryId: categoryId || null,
      capacity: capacity || null,
      voltage: voltage || "12V",
      plateTechnology: plateTechnology || "Tall Tubular Technology",
      totalWarrantyMonths: totalWarranty,
      focMonths: foc,
      proRataMonths: proRata,
      approxMrp: String(approxMrp),
      imageUrl: imageUrl || "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80",
      isInStock: Boolean(isInStock ?? (initialQuantity > 0)),
      status: "active",
      detailedLayout: {
        features: Array.isArray(features) ? features : (typeof features === "string" ? features.split(";").map(s => s.trim()) : []),
      },
    }).returning();

    // Insert Inventory
    const [newInventory] = await db.insert(inventory).values({
      productId: newProduct.id,
      quantityAvailable: Number(initialQuantity) || 0,
      quantityReserved: 0,
      reorderLevel: 5,
      warehouseLocation: "Varanasi Main Hub",
      lastRestockedAt: new Date(),
    }).returning();

    logInfo(`Added new product SKU: ${modelSku} (${brandName}) with stock: ${initialQuantity}`);

    return NextResponse.json({
      success: true,
      product: {
        ...newProduct,
        inventory: newInventory,
      },
    });
  } catch (err: any) {
    logError(err, { route: "/api/admin/products", method: "POST", action: "Create Product" }, "DATABASE_ERROR");
    return NextResponse.json({ error: err.message || "Failed to create product" }, { status: 500 });
  }
}
