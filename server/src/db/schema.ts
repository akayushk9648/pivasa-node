import { pgTable, serial, text, integer, numeric, timestamp, jsonb, varchar, boolean } from 'drizzle-orm/pg-core';

// Products Table
export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  sku: varchar('sku', { length: 100 }).notNull().unique(),
  name: text('name').notNull(),
  brand: varchar('brand', { length: 100 }).notNull(), // Exide, Livguard, etc.
  category: varchar('category', { length: 100 }).notNull(), // Inverter Batteries, Home UPS, Automotive, Two-Wheeler, Stabilizers, Solar Panels
  subCategory: varchar('sub_category', { length: 100 }),
  description: text('description'),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  discountPrice: numeric('discount_price', { precision: 10, scale: 2 }),
  stock: integer('stock').notNull().default(0),
  warrantyMonths: integer('warranty_months').default(0),
  batteryType: varchar('battery_type', { length: 50 }), // Tubular, Flat Plate, SMF, VRLA
  capacityAh: integer('capacity_ah'),
  weightKg: numeric('weight_kg', { precision: 6, scale: 2 }),
  dimensions: varchar('dimensions', { length: 100 }),
  status: varchar('status', { length: 20 }).notNull().default('active'), // active, draft, out_of_stock
  tags: jsonb('tags').$type<string[]>().default([]), // ["Authorized Exide", "Best Seller"]
  imageUrls: jsonb('image_urls').$type<string[]>().default([]),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Categories Table
export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  description: text('description'),
  image: text('image'),
});

// Brands Table
export const brands = pgTable('brands', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  logo: text('logo'),
});

// Orders Table
export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  orderNumber: varchar('order_number', { length: 50 }).notNull().unique(),
  customerName: varchar('customer_name', { length: 150 }).notNull(),
  customerPhone: varchar('customer_phone', { length: 20 }).notNull(),
  customerAddress: text('customer_address').notNull(),
  totalAmount: numeric('total_amount', { precision: 10, scale: 2 }).notNull(),
  paymentMethod: varchar('payment_method', { length: 50 }).notNull().default('COD'), // COD / Pay at Store
  status: varchar('status', { length: 50 }).notNull().default('Pending'), // Pending, Confirmed, Out for Delivery, Installed, Completed, Cancelled
  exchangeDiscount: numeric('exchange_discount', { precision: 10, scale: 2 }).default('0'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Order Items Table
export const orderItems = pgTable('order_items', {
  id: serial('id').primaryKey(),
  orderId: integer('order_id').references(() => orders.id, { onDelete: 'cascade' }).notNull(),
  productId: integer('product_id').references(() => products.id),
  productName: text('product_name').notNull(),
  quantity: integer('quantity').notNull().default(1),
  unitPrice: numeric('unit_price', { precision: 10, scale: 2 }).notNull(),
});

// Solar Leads Table
export const solarLeads = pgTable('solar_leads', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 150 }).notNull(),
  phone: varchar('phone', { length: 20 }).notNull(),
  address: text('address'),
  loadDetails: text('load_details'),
  estimatedWattage: integer('estimated_wattage'),
  monthlyBill: numeric('monthly_bill', { precision: 10, scale: 2 }),
  status: varchar('status', { length: 50 }).notNull().default('New'), // New, Contacted, Quoted, Converted, Lost
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Bulk Upload Logs Table
export const uploadLogs = pgTable('upload_logs', {
  id: serial('id').primaryKey(),
  fileName: text('file_name').notNull(),
  uploadedBy: varchar('uploaded_by', { length: 100 }).notNull().default('admin'),
  totalRows: integer('total_rows').notNull(),
  successRows: integer('success_rows').notNull(),
  errorRows: integer('error_rows').notNull(),
  errorReport: jsonb('error_report').$type<Array<{ row: number; sku?: string; error: string }>>().default([]),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Admin Users Table
export const adminUsers = pgTable('admin_users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 100 }).notNull().unique(),
  email: varchar('email', { length: 150 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: varchar('role', { length: 50 }).notNull().default('admin'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// System Activity Audit Logs Table (Tracks EVERY change in the application)
export const activityLogs = pgTable('activity_logs', {
  id: serial('id').primaryKey(),
  action: varchar('action', { length: 100 }).notNull(), // e.g. PRODUCT_CREATED, PRODUCT_DELETED, ORDER_PLACED
  entity: varchar('entity', { length: 100 }).notNull(), // products, orders, categories, etc.
  entityId: text('entity_id'),
  details: text('details').notNull(),
  performedBy: varchar('performed_by', { length: 100 }).notNull().default('system'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
