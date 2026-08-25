import { Router, Request, Response } from 'express';
import { db } from '../db';
import { solarLeads } from '../db/schema';
import { logActivity } from '../services/logger';

const router = Router();

// Submit Solar Lead
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, phone, address, loadDetails, estimatedWattage, monthlyBill } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and Phone number are required' });
    }

    const [lead] = await db.insert(solarLeads).values({
      name,
      phone,
      address,
      loadDetails,
      estimatedWattage: estimatedWattage ? Number(estimatedWattage) : undefined,
      monthlyBill: monthlyBill ? String(monthlyBill) : undefined,
      status: 'New'
    }).returning();

    await logActivity(
      'SOLAR_LEAD_SUBMITTED',
      'solar_leads',
      `New solar lead enquiry by ${name} (${phone}) for ${estimatedWattage || 0}W capacity`,
      lead.id,
      name
    );

    return res.status(201).json({
      success: true,
      message: 'Solar enquiry submitted successfully. Our Varanasi expert will call you shortly!',
      lead
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
