import { NextRequest, NextResponse } from "next/server";
import { db, orders, orderStatusHistory } from "@/db";
import { eq } from "drizzle-orm";
import { logError, logInfo } from "@/lib/logger";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const orderId = params.id;
    const body = await req.json();
    const { status, remarks } = body;

    const validStatuses = ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json({ error: `Invalid status. Must be one of: ${validStatuses.join(", ")}` }, { status: 400 });
    }

    const existingOrder = await db.query.orders.findFirst({
      where: eq(orders.id, orderId),
    });

    if (!existingOrder) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // 1. Update Order Status
    const [updatedOrder] = await db
      .update(orders)
      .set({
        status: status as any,
        paymentStatus: status === "delivered" ? "paid" : existingOrder.paymentStatus,
      })
      .where(eq(orders.id, orderId))
      .returning();

    // 2. Append to Order Status History
    const statusNote = remarks || `Status changed from '${existingOrder.status}' to '${status}' by admin.`;
    await db.insert(orderStatusHistory).values({
      orderId: orderId,
      status: status as any,
      remarks: statusNote,
    });

    logInfo(`Order [${orderId}] status changed: ${existingOrder.status} -> ${status}`);

    return NextResponse.json({
      success: true,
      order: updatedOrder,
      statusHistoryEntry: {
        orderId,
        status,
        remarks: statusNote,
        changedAt: new Date(),
      },
    });
  } catch (err: any) {
    logError(err, { route: `/api/admin/orders/${params.id}/status`, method: "PATCH", action: "Update Order Status" }, "DATABASE_ERROR");
    return NextResponse.json({ error: err.message || "Failed to update order status" }, { status: 500 });
  }
}
