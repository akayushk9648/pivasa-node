import { NextRequest, NextResponse } from "next/server";
import { db, orders, orderStatusHistory } from "@/db";
import { eq } from "drizzle-orm";
import { logError, logInfo } from "@/lib/logger";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const orderId = params.id;
    const order = await db.query.orders.findFirst({
      where: eq(orders.id, orderId),
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
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, order });
  } catch (err: any) {
    logError(err, { route: `/api/admin/orders/${params.id}`, method: "GET" }, "DATABASE_ERROR");
    return NextResponse.json({ error: err.message || "Failed to fetch order" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const orderId = params.id;
    const body = await req.json();
    const { 
      shippingAddress, 
      paymentStatus, 
      paymentMethod,
      status,
      remarks,
      totalAmount,
    } = body;

    const existingOrder = await db.query.orders.findFirst({
      where: eq(orders.id, orderId),
    });

    if (!existingOrder) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const updates: Record<string, any> = {};

    // 1. Shipping Address Merge
    if (shippingAddress && typeof shippingAddress === "object") {
      const currentShipping = (existingOrder.shippingAddress as Record<string, any>) || {};
      updates.shippingAddress = {
        ...currentShipping,
        ...shippingAddress,
      };
    }

    // 2. Payment Status
    const validPaymentStatuses = ["unpaid", "paid", "refunded", "failed"];
    if (paymentStatus) {
      if (!validPaymentStatuses.includes(paymentStatus)) {
        return NextResponse.json(
          { error: `Invalid paymentStatus. Allowed: ${validPaymentStatuses.join(", ")}` },
          { status: 400 }
        );
      }
      updates.paymentStatus = paymentStatus;
    }

    // 3. Payment Method
    if (paymentMethod !== undefined) {
      updates.paymentMethod = String(paymentMethod).trim();
    }

    // 4. Total Amount
    if (totalAmount !== undefined && !isNaN(Number(totalAmount))) {
      updates.totalAmount = String(Number(totalAmount).toFixed(2));
    }

    // 5. Status update (if included)
    const validOrderStatuses = ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"];
    let statusChanged = false;
    if (status && status !== existingOrder.status) {
      if (!validOrderStatuses.includes(status)) {
        return NextResponse.json(
          { error: `Invalid status. Allowed: ${validOrderStatuses.join(", ")}` },
          { status: 400 }
        );
      }
      updates.status = status;
      if (status === "delivered" && !paymentStatus) {
        updates.paymentStatus = "paid";
      }
      statusChanged = true;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No valid fields provided for update." }, { status: 400 });
    }

    const [updatedOrder] = await db
      .update(orders)
      .set(updates)
      .where(eq(orders.id, orderId))
      .returning();

    // Audit log in status history if status changed or remarks provided
    if (statusChanged || remarks) {
      const historyNote = remarks || (statusChanged 
        ? `Status updated from '${existingOrder.status}' to '${status}' by admin.` 
        : `Order details updated by admin.`);

      await db.insert(orderStatusHistory).values({
        orderId,
        status: updates.status || existingOrder.status,
        remarks: historyNote,
      });
    }

    logInfo(`Admin updated order [${orderId}]: ${JSON.stringify(Object.keys(updates))}`);

    return NextResponse.json({
      success: true,
      order: updatedOrder,
      message: "Order details updated successfully",
    });
  } catch (err: any) {
    logError(err, { route: `/api/admin/orders/${params.id}`, method: "PATCH", action: "Update Order Details" }, "DATABASE_ERROR");
    return NextResponse.json({ error: err.message || "Failed to update order" }, { status: 500 });
  }
}
