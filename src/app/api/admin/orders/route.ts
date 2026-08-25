import { NextRequest, NextResponse } from "next/server";
import { db, orders, orderItems, orderStatusHistory, products } from "@/db";
import { desc, eq, ilike, or } from "drizzle-orm";
import { logError, logInfo } from "@/lib/logger";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";

    const allOrders = await db.query.orders.findMany({
      where: (o, { and, eq, ilike }) => {
        const conditions = [];
        if (status) {
          conditions.push(eq(o.status, status as any));
        }
        return conditions.length > 0 ? and(...conditions) : undefined;
      },
      with: {
        items: {
          with: {
            product: true,
          },
        },
        statusHistory: {
          orderBy: (history, { desc }) => [desc(history.changedAt)],
        },
      },
      orderBy: [desc(orders.createdAt)],
    });

    let filtered = allOrders;
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter((o) => {
        const shipping = (o.shippingAddress as any) || {};
        const customerName = (shipping.full_name || "").toLowerCase();
        const phone = (shipping.phone || "").toLowerCase();
        const address = (shipping.address_line1 || "").toLowerCase();
        const orderId = (o.id || "").toLowerCase();

        return (
          customerName.includes(q) ||
          phone.includes(q) ||
          address.includes(q) ||
          orderId.includes(q)
        );
      });
    }

    return NextResponse.json({
      success: true,
      orders: filtered,
      count: filtered.length,
    });
  } catch (err: any) {
    logError(err, { route: "/api/admin/orders", method: "GET" }, "DATABASE_ERROR");
    return NextResponse.json({ error: err.message || "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      customerName,
      phone,
      addressLine,
      city = "Varanasi",
      state = "Uttar Pradesh",
      pincode = "221005",
      items = [],
      paymentMethod = "COD (Pay on Installation)",
      remarks = "Manual phone booking registered by admin",
    } = body;

    if (!customerName || !phone || !addressLine || items.length === 0) {
      return NextResponse.json(
        { error: "Customer name, phone, address, and at least one item are required." },
        { status: 400 }
      );
    }

    let subtotal = 0;
    const resolvedItems = [];

    for (const it of items) {
      const prod = await db.query.products.findFirst({
        where: eq(products.id, it.productId),
      });

      if (!prod) continue;
      const unitPrice = parseFloat(prod.approxMrp);
      const qty = Number(it.quantity) || 1;
      subtotal += unitPrice * qty;

      resolvedItems.push({
        productId: prod.id,
        quantity: qty,
        priceAtPurchase: String(unitPrice),
        warrantyApplicable: `${prod.totalWarrantyMonths} Months (${prod.focMonths}M FOC + ${prod.proRataMonths}M Pro-Rata)`,
      });
    }

    const tax = Math.round(subtotal * 0.18);
    const totalAmount = subtotal; // Inclusive price

    // 1. Insert Order
    const [newOrder] = await db.insert(orders).values({
      status: "confirmed",
      paymentStatus: "unpaid",
      paymentMethod,
      shippingAddress: {
        full_name: customerName,
        phone,
        address_line1: addressLine,
        city,
        state,
        pincode,
      },
      subtotal: String(subtotal),
      tax: String(tax),
      shippingCharge: "0.00",
      totalAmount: String(totalAmount),
    }).returning();

    // 2. Insert Order Items
    if (resolvedItems.length > 0) {
      await db.insert(orderItems).values(
        resolvedItems.map((it) => ({
          orderId: newOrder.id,
          productId: it.productId,
          quantity: it.quantity,
          priceAtPurchase: it.priceAtPurchase,
          warrantyApplicable: it.warrantyApplicable,
        }))
      );
    }

    // 3. Insert Initial Status History
    await db.insert(orderStatusHistory).values({
      orderId: newOrder.id,
      status: "confirmed",
      remarks,
    });

    logInfo(`Manual order created [${newOrder.id}] for ${customerName} (₹${totalAmount})`);

    return NextResponse.json({
      success: true,
      order: newOrder,
    });
  } catch (err: any) {
    logError(err, { route: "/api/admin/orders", method: "POST", action: "Create Manual Order" }, "DATABASE_ERROR");
    return NextResponse.json({ error: err.message || "Failed to create order" }, { status: 500 });
  }
}
