import { NextRequest, NextResponse } from "next/server";
import { db, inventory, products, inventoryAuditLog } from "@/db";
import { eq, desc, asc } from "drizzle-orm";
import { logError, logInfo } from "@/lib/logger";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const lowStockOnly = searchParams.get("lowStock") === "true";

    const allInventory = await db.query.inventory.findMany({
      with: {
        product: {
          with: {
            category: true,
          },
        },
      },
      orderBy: [asc(inventory.quantityAvailable)],
    });

    let filtered = allInventory;
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (i) =>
          i.product?.brandName.toLowerCase().includes(q) ||
          i.product?.modelSku.toLowerCase().includes(q) ||
          i.warehouseLocation.toLowerCase().includes(q)
      );
    }
    if (lowStockOnly) {
      filtered = filtered.filter((i) => i.quantityAvailable <= i.reorderLevel);
    }

    return NextResponse.json({
      success: true,
      inventory: filtered,
      count: filtered.length,
    });
  } catch (err: any) {
    logError(err, { route: "/api/admin/inventory", method: "GET" }, "DATABASE_ERROR");
    return NextResponse.json({ error: err.message || "Failed to fetch inventory" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { productId, quantityAvailable, adjustmentDelta, reorderLevel, warehouseLocation } = body;

    if (!productId) {
      return NextResponse.json({ error: "Missing productId" }, { status: 400 });
    }

    // Find current inventory
    let existingInv = await db.query.inventory.findFirst({
      where: eq(inventory.productId, productId),
      with: { product: true },
    });

    if (!existingInv) {
      // Create if missing
      const [newInv] = await db.insert(inventory).values({
        productId,
        quantityAvailable: Math.max(0, quantityAvailable ?? 0),
        warehouseLocation: warehouseLocation || "Varanasi Main Hub",
        reorderLevel: reorderLevel ?? 5,
        lastRestockedAt: new Date(),
      }).returning();
      existingInv = { ...newInv, product: await db.query.products.findFirst({ where: eq(products.id, productId) }) } as any;
    }

    let newQty = existingInv!.quantityAvailable;
    if (quantityAvailable !== undefined) {
      newQty = Math.max(0, Number(quantityAvailable));
    } else if (adjustmentDelta !== undefined) {
      newQty = Math.max(0, newQty + Number(adjustmentDelta));
    }

    const [updatedInv] = await db
      .update(inventory)
      .set({
        quantityAvailable: newQty,
        reorderLevel: reorderLevel !== undefined ? Number(reorderLevel) : existingInv!.reorderLevel,
        warehouseLocation: warehouseLocation || existingInv!.warehouseLocation,
        lastRestockedAt: newQty > existingInv!.quantityAvailable ? new Date() : existingInv!.lastRestockedAt,
        lastUpdatedAt: new Date(),
      })
      .where(eq(inventory.id, existingInv!.id))
      .returning();

    // Synchronize product isInStock boolean
    const shouldBeInStock = newQty > 0;
    const currentProduct = existingInv!.product;

    if (currentProduct && currentProduct.isInStock !== shouldBeInStock) {
      await db
        .update(products)
        .set({
          isInStock: shouldBeInStock,
          updatedAt: new Date(),
        })
        .where(eq(products.id, productId));

      // Audit log stock transition
      await db.insert(inventoryAuditLog).values({
        productId,
        oldStockStatus: currentProduct.isInStock,
        newStockStatus: shouldBeInStock,
      });
    }

    logInfo(`Inventory adjusted for product [${productId}]: ${existingInv!.quantityAvailable} -> ${newQty} units`);

    return NextResponse.json({
      success: true,
      inventory: updatedInv,
      productInStock: shouldBeInStock,
    });
  } catch (err: any) {
    logError(err, { route: "/api/admin/inventory", method: "PATCH", action: "Update Inventory" }, "DATABASE_ERROR");
    return NextResponse.json({ error: err.message || "Failed to update inventory" }, { status: 500 });
  }
}
