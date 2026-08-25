import { db, products, categories, inventory, orders, orderItems, orderStatusHistory, inventoryAuditLog } from "./index";
import { eq, and, desc } from "drizzle-orm";

export async function getDbProducts(inStockOnly = false) {
  return await db.query.products.findMany({
    where: and(
      eq(products.status, "active"),
      inStockOnly ? eq(products.isInStock, true) : undefined
    ),
    with: {
      category: true,
      inventory: true,
    },
    orderBy: [desc(products.createdAt)],
  });
}

export async function getDbProductBySlug(slug: string) {
  return await db.query.products.findFirst({
    where: eq(products.link, slug),
    with: {
      category: true,
      inventory: true,
    },
  });
}

export async function getDbCategories() {
  return await db.query.categories.findMany({
    where: eq(categories.status, "active"),
  });
}

export async function getDbOrders() {
  return await db.query.orders.findMany({
    with: {
      items: {
        with: {
          product: true,
        },
      },
      statusHistory: true,
    },
    orderBy: [desc(orders.createdAt)],
  });
}
