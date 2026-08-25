import { NextRequest, NextResponse } from "next/server";
import { db, products, inventory, inventoryAuditLog } from "@/db";
import { eq } from "drizzle-orm";
import { logError, logInfo } from "@/lib/logger";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = params.id;
    const body = await req.json();

    const existing = await db.query.products.findFirst({
      where: eq(products.id, productId),
      with: { inventory: true },
    });

    if (!existing) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const updatePayload: Record<string, any> = {
      updatedAt: new Date(),
    };

    if (body.brandName !== undefined) updatePayload.brandName = body.brandName;
    if (body.brandSeries !== undefined) updatePayload.brandSeries = body.brandSeries;
    if (body.modelSku !== undefined) updatePayload.modelSku = body.modelSku;
    if (body.capacity !== undefined) updatePayload.capacity = body.capacity;
    if (body.voltage !== undefined) updatePayload.voltage = body.voltage;
    if (body.plateTechnology !== undefined) updatePayload.plateTechnology = body.plateTechnology;
    if (body.totalWarrantyMonths !== undefined) updatePayload.totalWarrantyMonths = Number(body.totalWarrantyMonths);
    if (body.focMonths !== undefined) updatePayload.focMonths = Number(body.focMonths);
    if (body.proRataMonths !== undefined) updatePayload.proRataMonths = Number(body.proRataMonths);
    if (body.approxMrp !== undefined) updatePayload.approxMrp = String(body.approxMrp);
    if (body.imageUrl !== undefined) updatePayload.imageUrl = body.imageUrl;
    if (body.status !== undefined) updatePayload.status = body.status;

    if (body.isInStock !== undefined) {
      updatePayload.isInStock = Boolean(body.isInStock);

      // Record in inventory audit log
      if (existing.isInStock !== body.isInStock) {
        await db.insert(inventoryAuditLog).values({
          productId: productId,
          oldStockStatus: existing.isInStock,
          newStockStatus: Boolean(body.isInStock),
        });
      }
    }

    const [updatedProduct] = await db
      .update(products)
      .set(updatePayload)
      .where(eq(products.id, productId))
      .returning();

    logInfo(`Product updated [${productId}]: ${JSON.stringify(body)}`);

    return NextResponse.json({
      success: true,
      product: updatedProduct,
    });
  } catch (err: any) {
    logError(err, { route: `/api/admin/products/${params.id}`, method: "PATCH" }, "DATABASE_ERROR");
    return NextResponse.json({ error: err.message || "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = params.id;

    const existing = await db.query.products.findFirst({
      where: eq(products.id, productId),
    });

    if (!existing) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    await db.delete(products).where(eq(products.id, productId));
    logInfo(`Deleted product SKU ${existing.modelSku} [${productId}]`);

    return NextResponse.json({
      success: true,
      message: `Product ${existing.modelSku} deleted successfully.`,
    });
  } catch (err: any) {
    logError(err, { route: `/api/admin/products/${params.id}`, method: "DELETE" }, "DATABASE_ERROR");
    return NextResponse.json({ error: err.message || "Failed to delete product" }, { status: 500 });
  }
}
