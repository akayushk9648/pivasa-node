import { 
  pgTable, 
  pgEnum, 
  uuid, 
  text, 
  integer, 
  numeric, 
  boolean, 
  timestamp, 
  jsonb 
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ============================================================================
// POSTGRES ENUMS
// ============================================================================
export const userRoleEnum = pgEnum("user_role", ["customer", "staff", "admin"]);
export const productStatusEnum = pgEnum("product_status", ["active", "inactive", "discontinued"]);
export const orderStatusEnum = pgEnum("order_status", ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"]);
export const paymentStatusEnum = pgEnum("payment_status", ["unpaid", "paid", "refunded", "failed"]);
export const uploadStatusEnum = pgEnum("upload_status", ["processing", "completed", "failed"]);

// ============================================================================
// 1. PROFILES (Extends auth.users)
// ============================================================================
export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey().notNull(), // References auth.users(id)
  fullName: text("full_name").notNull(),
  phone: text("phone"),
  role: userRoleEnum("role").default("customer").notNull(),
  address: jsonb("address").default({}),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// ============================================================================
// 2. CATEGORIES
// ============================================================================
export const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  categoryName: text("category_name").notNull(),
  parentCategoryId: uuid("parent_category_id"),
  description: text("description"),
  imageUrl: text("image_url"),
  status: text("status").default("active").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// ============================================================================
// 3. PRODUCTS
// ============================================================================
export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  imageUrl: text("image_url"),
  link: text("link").unique().notNull(),
  categoryId: uuid("category_id").references(() => categories.id, { onDelete: "set null" }),
  status: productStatusEnum("status").default("active").notNull(),
  brandSeries: text("brand_series"),
  brandName: text("brand_name").notNull(),
  modelSku: text("model_sku").unique().notNull(),
  capacity: text("capacity"),
  voltage: text("voltage"),
  plateTechnology: text("plate_technology"),
  totalWarrantyMonths: integer("total_warranty_months").default(0).notNull(),
  focMonths: integer("foc_months").default(0).notNull(),
  proRataMonths: integer("pro_rata_months").default(0).notNull(),
  approxMrp: numeric("approx_mrp", { precision: 12, scale: 2 }).notNull(),
  detailedLayout: jsonb("detailed_layout").default({}),
  isInStock: boolean("is_in_stock").default(false).notNull(),
  createdBy: uuid("created_by").references(() => profiles.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// ============================================================================
// 4. INVENTORY
// ============================================================================
export const inventory = pgTable("inventory", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  productId: uuid("product_id").references(() => products.id, { onDelete: "cascade" }).unique().notNull(),
  warehouseLocation: text("warehouse_location").default("Varanasi Main Hub").notNull(),
  quantityAvailable: integer("quantity_available").default(0).notNull(),
  quantityReserved: integer("quantity_reserved").default(0).notNull(),
  reorderLevel: integer("reorder_level").default(5).notNull(),
  lastRestockedAt: timestamp("last_restocked_at", { withTimezone: true }),
  lastUpdatedBy: uuid("last_updated_by").references(() => profiles.id, { onDelete: "set null" }),
  lastUpdatedAt: timestamp("last_updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// ============================================================================
// 5. CART ITEMS
// ============================================================================
export const cartItems = pgTable("cart_items", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  userId: uuid("user_id").notNull(),
  productId: uuid("product_id").references(() => products.id, { onDelete: "cascade" }).notNull(),
  quantity: integer("quantity").default(1).notNull(),
  addedAt: timestamp("added_at", { withTimezone: true }).defaultNow().notNull(),
});

// ============================================================================
// 6. ORDERS
// ============================================================================
export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  userId: uuid("user_id"),
  orderDate: timestamp("order_date", { withTimezone: true }).defaultNow().notNull(),
  status: orderStatusEnum("status").default("pending").notNull(),
  paymentStatus: paymentStatusEnum("payment_status").default("unpaid").notNull(),
  paymentMethod: text("payment_method").default("COD").notNull(),
  shippingAddress: jsonb("shipping_address").notNull(),
  billingAddress: jsonb("billing_address"),
  subtotal: numeric("subtotal", { precision: 12, scale: 2 }).notNull(),
  tax: numeric("tax", { precision: 12, scale: 2 }).default("0.00").notNull(),
  shippingCharge: numeric("shipping_charge", { precision: 12, scale: 2 }).default("0.00").notNull(),
  totalAmount: numeric("total_amount", { precision: 12, scale: 2 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// ============================================================================
// 7. ORDER ITEMS
// ============================================================================
export const orderItems = pgTable("order_items", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  orderId: uuid("order_id").references(() => orders.id, { onDelete: "cascade" }).notNull(),
  productId: uuid("product_id").references(() => products.id, { onDelete: "set null" }),
  quantity: integer("quantity").default(1).notNull(),
  priceAtPurchase: numeric("price_at_purchase", { precision: 12, scale: 2 }).notNull(),
  warrantyApplicable: text("warranty_applicable").notNull(),
});

// ============================================================================
// 8. ORDER STATUS HISTORY
// ============================================================================
export const orderStatusHistory = pgTable("order_status_history", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  orderId: uuid("order_id").references(() => orders.id, { onDelete: "cascade" }).notNull(),
  status: orderStatusEnum("status").notNull(),
  changedBy: uuid("changed_by").references(() => profiles.id, { onDelete: "set null" }),
  changedAt: timestamp("changed_at", { withTimezone: true }).defaultNow().notNull(),
  remarks: text("remarks"),
});

// ============================================================================
// 9. INVENTORY AUDIT LOG
// ============================================================================
export const inventoryAuditLog = pgTable("inventory_audit_log", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  productId: uuid("product_id").references(() => products.id, { onDelete: "cascade" }).notNull(),
  oldStockStatus: boolean("old_stock_status"),
  newStockStatus: boolean("new_stock_status").notNull(),
  changedBy: uuid("changed_by").references(() => profiles.id, { onDelete: "set null" }),
  changedAt: timestamp("changed_at", { withTimezone: true }).defaultNow().notNull(),
});

// ============================================================================
// 10. PRODUCT BULK UPLOAD LOG
// ============================================================================
export const productBulkUploadLog = pgTable("product_bulk_upload_log", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  uploadedBy: uuid("uploaded_by").references(() => profiles.id, { onDelete: "set null" }),
  fileName: text("file_name").notNull(),
  uploadDate: timestamp("upload_date", { withTimezone: true }).defaultNow().notNull(),
  totalRows: integer("total_rows").default(0).notNull(),
  successCount: integer("success_count").default(0).notNull(),
  failedCount: integer("failed_count").default(0).notNull(),
  errorLog: jsonb("error_log").default([]),
  status: uploadStatusEnum("status").default("processing").notNull(),
});

// ============================================================================
// DRIZZLE RELATIONS DEFINITIONS
// ============================================================================
export const categoriesRelations = relations(categories, ({ one, many }) => ({
  parent: one(categories, {
    fields: [categories.parentCategoryId],
    references: [categories.id],
    relationName: "category_parent",
  }),
  children: many(categories, { relationName: "category_parent" }),
  products: many(products),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  inventory: one(inventory, {
    fields: [products.id],
    references: [inventory.productId],
  }),
  orderItems: many(orderItems),
  cartItems: many(cartItems),
  auditLogs: many(inventoryAuditLog),
}));

export const inventoryRelations = relations(inventory, ({ one }) => ({
  product: one(products, {
    fields: [inventory.productId],
    references: [products.id],
  }),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  profile: one(profiles, {
    fields: [orders.userId],
    references: [profiles.id],
  }),
  items: many(orderItems),
  statusHistory: many(orderStatusHistory),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
}));

export const orderStatusHistoryRelations = relations(orderStatusHistory, ({ one }) => ({
  order: one(orders, {
    fields: [orderStatusHistory.orderId],
    references: [orders.id],
  }),
}));

// ============================================================================
// 10. ADMIN USERS (Secure salted/hashed admin credentials)
// ============================================================================
export const adminUsers = pgTable("admin_users", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  email: text("email").unique().notNull(),
  fullName: text("full_name").default("Administrator").notNull(),
  passwordHash: text("password_hash").notNull(),
  salt: text("salt").notNull(),
  role: text("role").default("super_admin").notNull(),
  failedAttempts: integer("failed_attempts").default(0).notNull(),
  lockedUntil: timestamp("locked_until", { withTimezone: true }),
  lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

