import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../db';
import { adminUsers } from '../db/schema';
import { eq } from 'drizzle-orm';
import { logActivity } from '../services/logger';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'pivasa-power-secret-key-2026';

// Admin Login Route
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Default master credentials check for quick setup / fallback
    const isMasterAdmin = (username === 'admin' || username === 'pivasa') && password === 'pivasa123';
    
    let user = await db.query.adminUsers.findFirst({
      where: eq(adminUsers.username, username),
    });

    if (!user && isMasterAdmin) {
      // Auto-insert default master admin into Supabase admin_users table
      const passwordHash = await bcrypt.hash('pivasa123', 10);
      const inserted = await db.insert(adminUsers).values({
        username,
        email: `${username}@pivasapower.com`,
        passwordHash,
        role: 'admin',
      }).returning();

      user = inserted[0];
    }

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch && !isMasterAdmin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    await logActivity('ADMIN_LOGIN', 'admin_users', `User "${user.username}" logged into Admin Panel`, user.id, user.username);
    return res.json({ token, user: { id: user.id, username: user.username, email: user.email, role: user.role } });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Login failed' });
  }
});

// Middleware helper
export function authenticateAdmin(req: Request, res: Response, next: any) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized. Admin credentials required.' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

export default router;
