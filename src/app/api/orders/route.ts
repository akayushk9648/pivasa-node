import { NextRequest, NextResponse } from "next/server";
import { db, orders, orderItems, orderStatusHistory } from "@/db";
import { logError, logInfo } from "@/lib/logger";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      customerName,
      phone,
      addressLine,
      colonyLandmark,
      city = "Varanasi",
      state = "Uttar Pradesh",
      pincode = "221005",
      paymentMethod = "COD",
      items = [],
      subtotal,
      tax,
      totalAmount,
      exchangeDiscount = 0,
      notes,
    } = body;

    if (!customerName || !phone || !addressLine || items.length === 0) {
      return NextResponse.json(
        { error: "Customer details, delivery address, and items are required." },
        { status: 400 }
      );
    }

    const [newOrder] = await db.insert(orders).values({
      status: "pending",
      paymentStatus: "unpaid",
      paymentMethod,
      shippingAddress: {
        full_name: customerName,
        phone,
        address_line1: addressLine,
        colony_landmark: colonyLandmark,
        city,
        state,
        pincode,
        notes: notes || undefined,
      },
      subtotal: String(subtotal),
      tax: String(tax || Math.round(Number(subtotal) * 0.18)),
      shippingCharge: "0.00",
      totalAmount: String(totalAmount),
    }).returning();

    if (items && items.length > 0) {
      await db.insert(orderItems).values(
        items.map((it: any) => ({
          orderId: newOrder.id,
          productId: it.productId || it.product?.id,
          quantity: Number(it.quantity) || 1,
          priceAtPurchase: String(it.priceAtPurchase || it.product?.approx_mrp || "0"),
          warrantyApplicable: it.warrantyApplicable || `${it.product?.total_warranty_months || 36} Months`,
        }))
      );
    }

    await db.insert(orderStatusHistory).values({
      orderId: newOrder.id,
      status: "pending",
      remarks: "Customer online order submitted via storefront checkout.",
    });

    logInfo(`Storefront order created [${newOrder.id}] for ${customerName} (${phone}) - ₹${totalAmount}`);

    return NextResponse.json({
      success: true,
      order: newOrder,
    });
  } catch (err: any) {
    logError(err, { route: "/api/orders", method: "POST", action: "Customer Checkout" }, "DATABASE_ERROR");
    return NextResponse.json({ error: err.message || "Failed to place order" }, { status: 500 });
  }
}
