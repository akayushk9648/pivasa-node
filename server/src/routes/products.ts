import { Router, Request, Response } from 'express';
import { db } from '../db';
import { products } from '../db/schema';
import { eq, and, gte, lte, like, sql } from 'drizzle-orm';

const router = Router();

// Get Products with filtering & sorting
router.get('/', async (req: Request, res: Response) => {
  try {
    const { category, brand, minPrice, maxPrice, batteryType, search, status = 'active' } = req.query;

    const conditions = [];

    if (status) {
      conditions.push(eq(products.status, String(status)));
    }
    if (category) {
      conditions.push(sql`LOWER(${products.category}) LIKE ${`%${String(category).toLowerCase()}%`}`);
    }
    if (brand) {
      conditions.push(sql`LOWER(${products.brand}) = ${String(brand).toLowerCase()}`);
    }
    if (batteryType) {
      conditions.push(eq(products.batteryType, String(batteryType)));
    }
    if (minPrice) {
      conditions.push(gte(products.price, String(minPrice)));
    }
    if (maxPrice) {
      conditions.push(lte(products.price, String(maxPrice)));
    }
    if (search) {
      conditions.push(sql`LOWER(${products.name}) LIKE ${`%${String(search).toLowerCase()}%`}`);
    }

    const result = await db.select().from(products).where(and(...conditions));

    return res.json({ products: result, count: result.length });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

import { categories, brands } from '../db/schema';

// Get Public Categories
router.get('/meta/categories', async (req: Request, res: Response) => {
  try {
    const list = await db.select().from(categories);
    return res.json(list);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Get Public Brands
router.get('/meta/brands', async (req: Request, res: Response) => {
  try {
    const list = await db.select().from(brands);
    return res.json(list);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Get Single Product
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await db.query.products.findFirst({
      where: eq(products.id, Number(id))
    });
    if (!item) {
      return res.status(404).json({ error: 'Product not found' });
    }
    return res.json(item);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
