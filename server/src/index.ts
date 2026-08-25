import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';

import authRoutes from './routes/auth';
import productRoutes from './routes/products';
import orderRoutes from './routes/orders';
import solarRoutes from './routes/solar';
import adminRoutes from './routes/admin';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', store: 'Pivasa Power API Server (Drizzle ORM)' });
});

// API V1 Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/solar-leads', solarRoutes);
app.use('/api/v1/admin', adminRoutes);

import bcrypt from 'bcryptjs';
import { db } from './db';
import { adminUsers } from './db/schema';
import { eq } from 'drizzle-orm';

// Auto-seed admin user credentials into Supabase on startup
async function seedAdminUsers() {
  try {
    const existing = await db.query.adminUsers.findFirst({
      where: eq(adminUsers.username, 'pivasa')
    });
    if (!existing) {
      const passwordHash = await bcrypt.hash('pivasa123', 10);
      await db.insert(adminUsers).values({
        username: 'pivasa',
        email: 'admin@pivasapower.com',
        passwordHash,
        role: 'admin'
      });
      console.log('✅ Master admin user "pivasa" auto-seeded into Supabase admin_users table');
    }
  } catch (err) {
    console.error('Seed Admin User Notice:', err);
  }
}

import { initActivityLogsTable } from './services/logger';

app.listen(PORT, async () => {
  console.log(`⚡ Pivasa Power API Server running on port ${PORT}`);
  await initActivityLogsTable();
  await seedAdminUsers();
});
