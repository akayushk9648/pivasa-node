import { db } from '../db';
import { activityLogs } from '../db/schema';
import { sql } from 'drizzle-orm';

// Ensure table exists on Supabase startup
export async function initActivityLogsTable() {
  try {
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS activity_logs (
        id SERIAL PRIMARY KEY,
        action VARCHAR(100) NOT NULL,
        entity VARCHAR(100) NOT NULL,
        entity_id TEXT,
        details TEXT NOT NULL,
        performed_by VARCHAR(100) NOT NULL DEFAULT 'system',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `);
    console.log('✅ Activity Logs table verified in Supabase');
  } catch (err) {
    console.error('Notice on Activity Logs Table init:', err);
  }
}

export async function logActivity(
  action: string,
  entity: string,
  details: string,
  entityId?: string | number,
  performedBy: string = 'admin'
) {
  try {
    await db.insert(activityLogs).values({
      action,
      entity,
      entityId: entityId ? String(entityId) : null,
      details,
      performedBy
    });
  } catch (err) {
    console.error(`[Audit Log Notice] Failed to log activity (${action}):`, err);
  }
}
