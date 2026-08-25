import { Router, Request, Response } from 'express';
import { db } from '../db';
import { orders, orderItems } from '../db/schema';
import { logActivity } from '../services/logger';

const router = Router();

// Create COD Order
router.post('/', async (req: Request, res: Response) => {
  try {
    const { customerName, customerPhone, customerAddress, items, exchangeDiscount = 0, notes } = req.body;

    if (!customerName || !customerPhone || !customerAddress || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Customer details and order items are required' });
    }

    const orderNumber = `PIV-${Date.now().toString().slice(-6)}`;

    // Calculate total
    let total = items.reduce((acc: number, item: any) => acc + (Number(item.unitPrice) * Number(item.quantity)), 0);
    total = Math.max(0, total - Number(exchangeDiscount));

    const [newOrder] = await db.insert(orders).values({
      orderNumber,
      customerName,
      customerPhone,
      customerAddress,
      totalAmount: total.toFixed(2),
      paymentMethod: 'COD',
      status: 'Pending',
      exchangeDiscount: Number(exchangeDiscount).toFixed(2),
      notes
    }).returning();

    // Insert order items
    const itemRecords = items.map((item: any) => ({
      orderId: newOrder.id,
      productId: item.productId || null,
      productName: item.productName || 'Product',
      quantity: item.quantity,
      unitPrice: Number(item.unitPrice).toFixed(2)
    }));

    await db.insert(orderItems).values(itemRecords);

    await logActivity(
      'ORDER_PLACED',
      'orders',
      `New order #${newOrder.orderNumber} placed by ${customerName} (${customerPhone}) for ₹${newOrder.totalAmount}`,
      newOrder.id,
      customerName
    );

    return res.status(201).json({
      success: true,
      message: 'Order placed successfully via Cash on Delivery',
      order: newOrder
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
