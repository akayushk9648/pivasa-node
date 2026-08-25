import { Router, Request, Response } from 'express';
import { db } from '../db';
import { products, categories, brands, orders, orderItems, solarLeads, uploadLogs, adminUsers, activityLogs } from '../db/schema';
import { eq, desc } from 'drizzle-orm';
import { authenticateAdmin } from './auth';
import { parseAndValidateXlsx, generateSampleXlsx } from '../services/xlsxService';
import { logActivity } from '../services/logger';
import bcrypt from 'bcryptjs';

const router = Router();

// Protect all admin routes
router.use(authenticateAdmin);

// Helper to get active admin username
function getAdminUser(req: Request) {
  return (req as any).user?.username || 'admin';
}

// 1. Dashboard Overview Metrics
router.get('/dashboard', async (req: Request, res: Response) => {
  try {
    const allOrders = await db.select().from(orders);
    const pendingOrdersCount = allOrders.filter(o => o.status === 'Pending').length;

    const allProducts = await db.select().from(products);
    const lowStockCount = allProducts.filter(p => p.stock < 5).length;

    const allLeads = await db.select().from(solarLeads);
    const newLeadsCount = allLeads.filter(l => l.status === 'New').length;

    const allCategories = await db.select().from(categories);
    const allBrands = await db.select().from(brands);

    return res.json({
      totalOrders: allOrders.length,
      pendingOrdersCount,
      totalProducts: allProducts.length,
      lowStockCount,
      newLeadsCount,
      totalCategories: allCategories.length,
      totalBrands: allBrands.length,
      recentOrders: allOrders.slice(-5).reverse(),
      recentLeads: allLeads.slice(-5).reverse()
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// 2. Product CRUD
router.get('/products', async (req: Request, res: Response) => {
  const result = await db.select().from(products).orderBy(desc(products.createdAt));
  return res.json(result);
});

router.post('/products', async (req: Request, res: Response) => {
  try {
    const item = req.body;
    const adminUser = getAdminUser(req);
    const [inserted] = await db.insert(products).values({
      ...item,
      price: String(item.price),
      discountPrice: item.discountPrice ? String(item.discountPrice) : null,
      stock: Number(item.stock || 0)
    }).returning();

    await logActivity('PRODUCT_CREATED', 'products', `Created product "${inserted.name}" (SKU: ${inserted.sku})`, inserted.id, adminUser);
    return res.status(201).json(inserted);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

router.put('/products/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = req.body;
    const adminUser = getAdminUser(req);
    const [updated] = await db.update(products).set({
      ...item,
      price: String(item.price),
      discountPrice: item.discountPrice ? String(item.discountPrice) : null,
      stock: Number(item.stock || 0),
      updatedAt: new Date()
    }).where(eq(products.id, Number(id))).returning();

    await logActivity('PRODUCT_UPDATED', 'products', `Updated product "${updated.name}" (Price: ₹${updated.price}, Stock: ${updated.stock})`, updated.id, adminUser);
    return res.json(updated);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

router.delete('/products/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const adminUser = getAdminUser(req);
    const [deleted] = await db.select().from(products).where(eq(products.id, Number(id)));
    await db.delete(products).where(eq(products.id, Number(id)));
    
    await logActivity('PRODUCT_DELETED', 'products', `Deleted product ID ${id} (${deleted?.name || 'Unknown'})`, id, adminUser);
    return res.json({ success: true, message: 'Product deleted successfully' });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

// 3. Categories CRUD
router.get('/categories', async (req: Request, res: Response) => {
  const result = await db.select().from(categories);
  return res.json(result);
});

router.post('/categories', async (req: Request, res: Response) => {
  try {
    const { name, slug, description, image } = req.body;
    const adminUser = getAdminUser(req);
    const [inserted] = await db.insert(categories).values({
      name,
      slug: slug || name.toLowerCase().replace(/ /g, '-'),
      description,
      image
    }).returning();

    await logActivity('CATEGORY_CREATED', 'categories', `Created category "${inserted.name}"`, inserted.id, adminUser);
    return res.status(201).json(inserted);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

router.delete('/categories/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const adminUser = getAdminUser(req);
    await db.delete(categories).where(eq(categories.id, Number(id)));
    await logActivity('CATEGORY_DELETED', 'categories', `Deleted category ID ${id}`, id, adminUser);
    return res.json({ success: true });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

// 4. Brands CRUD
router.get('/brands', async (req: Request, res: Response) => {
  const result = await db.select().from(brands);
  return res.json(result);
});

router.post('/brands', async (req: Request, res: Response) => {
  try {
    const { name, slug, logoUrl, isAuthorized } = req.body;
    const adminUser = getAdminUser(req);
    const [inserted] = await db.insert(brands).values({
      name,
      slug: slug || name.toLowerCase().replace(/ /g, '-'),
      logoUrl,
      isAuthorized: isAuthorized ?? true
    }).returning();

    await logActivity('BRAND_CREATED', 'brands', `Created brand "${inserted.name}"`, inserted.id, adminUser);
    return res.status(201).json(inserted);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

router.delete('/brands/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const adminUser = getAdminUser(req);
    await db.delete(brands).where(eq(brands.id, Number(id)));
    await logActivity('BRAND_DELETED', 'brands', `Deleted brand ID ${id}`, id, adminUser);
    return res.json({ success: true });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

// 5. Download XLSX Template & XLSX Bulk Upload
router.get('/products/xlsx-template', (req: Request, res: Response) => {
  const buffer = generateSampleXlsx();
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', 'attachment; filename="pivasa_products_template.xlsx"');
  return res.send(buffer);
});

router.post('/products/bulk-upload/preview', async (req: Request, res: Response) => {
  try {
    const { fileBase64 } = req.body;
    if (!fileBase64) {
      return res.status(400).json({ error: 'fileBase64 string is required' });
    }
    const buffer = Buffer.from(fileBase64, 'base64');
    const result = parseAndValidateXlsx(buffer);
    return res.json(result);
  } catch (err: any) {
    return res.status(400).json({ error: 'Failed to parse XLSX file: ' + err.message });
  }
});

router.post('/products/bulk-upload/commit', async (req: Request, res: Response) => {
  try {
    const { rows, fileName } = req.body;
    const adminUser = getAdminUser(req);
    if (!rows || !Array.isArray(rows)) {
      return res.status(400).json({ error: 'Invalid rows data' });
    }

    const validRows = rows.filter((r: any) => r.isValid);
    let successCount = 0;
    const errors: any[] = [];

    for (const r of validRows) {
      try {
        await db.insert(products).values({
          sku: r.sku,
          name: r.name,
          brand: r.brand,
          category: r.category,
          subCategory: r.subCategory,
          description: r.description,
          price: String(r.price),
          discountPrice: r.discountPrice ? String(r.discountPrice) : null,
          stock: Number(r.stock || 0),
          warrantyMonths: r.warrantyMonths,
          batteryType: r.batteryType,
          capacityAh: r.capacityAh,
          weightKg: r.weightKg ? String(r.weightKg) : null,
          dimensions: r.dimensions,
          status: r.status || 'active',
          tags: r.tags || [],
          imageUrls: r.imageUrls || []
        }).onConflictDoUpdate({
          target: products.sku,
          set: {
            name: r.name,
            price: String(r.price),
            discountPrice: r.discountPrice ? String(r.discountPrice) : null,
            stock: Number(r.stock || 0),
            updatedAt: new Date()
          }
        });
        successCount++;
      } catch (e: any) {
        errors.push({ row: r.rowNumber, sku: r.sku, error: e.message });
      }
    }

    const [log] = await db.insert(uploadLogs).values({
      fileName: fileName || 'bulk_products.xlsx',
      uploadedBy: adminUser,
      totalRows: rows.length,
      successRows: successCount,
      errorRows: rows.length - successCount,
      errorReport: errors
    }).returning();

    await logActivity(
      'BULK_UPLOAD_COMPLETED',
      'upload_logs',
      `Uploaded spreadsheet "${fileName || 'bulk_products.xlsx'}": ${successCount}/${rows.length} rows committed`,
      log.id,
      adminUser
    );

    return res.json({
      success: true,
      committed: successCount,
      failed: rows.length - successCount,
      errors
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// 6. Upload Logs History Audit
router.get('/upload-logs', async (req: Request, res: Response) => {
  const result = await db.select().from(uploadLogs).orderBy(desc(uploadLogs.createdAt));
  return res.json(result);
});

// 7. Orders & Order Items
router.get('/orders', async (req: Request, res: Response) => {
  const result = await db.select().from(orders).orderBy(desc(orders.createdAt));
  return res.json(result);
});

router.get('/orders/:id/items', async (req: Request, res: Response) => {
  const { id } = req.params;
  const items = await db.select().from(orderItems).where(eq(orderItems.orderId, Number(id)));
  return res.json(items);
});

router.patch('/orders/:id/status', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const adminUser = getAdminUser(req);
  const [updated] = await db.update(orders).set({ status, updatedAt: new Date() }).where(eq(orders.id, Number(id))).returning();
  
  await logActivity('ORDER_STATUS_UPDATED', 'orders', `Changed order #${updated?.orderNumber || id} status to "${status}"`, id, adminUser);
  return res.json(updated);
});

router.delete('/orders/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const adminUser = getAdminUser(req);
    await db.delete(orderItems).where(eq(orderItems.orderId, Number(id)));
    await db.delete(orders).where(eq(orders.id, Number(id)));
    
    await logActivity('ORDER_DELETED', 'orders', `Deleted order record ID ${id}`, id, adminUser);
    return res.json({ success: true, message: 'Order deleted from Supabase' });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

// 8. Solar Leads Management
router.get('/solar-leads', async (req: Request, res: Response) => {
  const result = await db.select().from(solarLeads).orderBy(desc(solarLeads.createdAt));
  return res.json(result);
});

router.patch('/solar-leads/:id/status', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const adminUser = getAdminUser(req);
  const [updated] = await db.update(solarLeads).set({ status }).where(eq(solarLeads.id, Number(id))).returning();
  
  await logActivity('SOLAR_LEAD_STATUS_UPDATED', 'solar_leads', `Updated solar lead #${id} status to "${status}"`, id, adminUser);
  return res.json(updated);
});

router.delete('/solar-leads/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const adminUser = getAdminUser(req);
    await db.delete(solarLeads).where(eq(solarLeads.id, Number(id)));
    
    await logActivity('SOLAR_LEAD_DELETED', 'solar_leads', `Deleted solar lead ID ${id}`, id, adminUser);
    return res.json({ success: true, message: 'Solar lead deleted from Supabase' });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

// 9. Admin Users Credentials Management
router.get('/users', async (req: Request, res: Response) => {
  const users = await db.select({
    id: adminUsers.id,
    username: adminUsers.username,
    email: adminUsers.email,
    role: adminUsers.role,
    createdAt: adminUsers.createdAt
  }).from(adminUsers);
  return res.json(users);
});

router.post('/users', async (req: Request, res: Response) => {
  try {
    const { username, password, email, role } = req.body;
    const adminUser = getAdminUser(req);
    const passwordHash = await bcrypt.hash(password, 10);
    const [inserted] = await db.insert(adminUsers).values({
      username,
      passwordHash,
      email,
      role: role || 'admin'
    }).returning({
      id: adminUsers.id,
      username: adminUsers.username,
      email: adminUsers.email,
      role: adminUsers.role
    });

    await logActivity('ADMIN_USER_CREATED', 'admin_users', `Created admin user "${inserted.username}"`, inserted.id, adminUser);
    return res.status(201).json(inserted);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

router.delete('/users/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const adminUser = getAdminUser(req);
    await db.delete(adminUsers).where(eq(adminUsers.id, Number(id)));
    
    await logActivity('ADMIN_USER_DELETED', 'admin_users', `Deleted admin user ID ${id}`, id, adminUser);
    return res.json({ success: true, message: 'Admin user deleted from Supabase' });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

// 10. System Activity Audit Logs Endpoint (Reads directly from Supabase activity_logs)
router.get('/activity-logs', async (req: Request, res: Response) => {
  try {
    const logs = await db.select().from(activityLogs).orderBy(desc(activityLogs.createdAt));
    return res.json(logs);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
