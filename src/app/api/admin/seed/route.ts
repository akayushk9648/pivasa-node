import { NextRequest, NextResponse } from "next/server";
import { db, products, categories, inventory, orders, orderItems, orderStatusHistory } from "@/db";
import { eq } from "drizzle-orm";
import { logError, logInfo } from "@/lib/logger";

export async function POST(req: NextRequest) {
  try {
    // 1. Ensure Categories Exist
    const existingCategories = await db.select().from(categories);
    let catMap: Record<string, string> = {};

    if (existingCategories.length === 0) {
      const insertedCats = await db.insert(categories).values([
        {
          id: "b0000000-0000-0000-0000-000000000001",
          categoryName: "Inverter Tubular Batteries",
          description: "Heavy duty deep-cycle inverter backup batteries",
          status: "active",
        },
        {
          id: "b0000000-0000-0000-0000-000000000002",
          categoryName: "Inverters & Home UPS",
          description: "Pure sine wave inverters and computer UPS backup systems",
          status: "active",
        },
        {
          id: "b0000000-0000-0000-0000-000000000003",
          categoryName: "Automotive Batteries",
          description: "Car, truck and motorcycle maintenance-free batteries",
          status: "active",
        },
      ]).returning();

      insertedCats.forEach(c => {
        catMap[c.categoryName] = c.id;
      });
    } else {
      existingCategories.forEach(c => {
        catMap[c.categoryName] = c.id;
      });
    }

    const tubularCatId = catMap["Inverter Tubular Batteries"] || existingCategories[0]?.id;
    const inverterCatId = catMap["Inverters & Home UPS"] || existingCategories[1]?.id;
    const autoCatId = catMap["Automotive Batteries"] || existingCategories[2]?.id;

    // 2. Define Initial Products
    const sampleProductsData = [
      {
        id: "d0000000-0000-0000-0000-000000000001",
        link: "exide-inva-tubular-it500-150ah",
        imageUrl: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80",
        categoryId: tubularCatId,
        status: "active" as const,
        brandSeries: "Inva Tubular Heavy Duty",
        brandName: "Exide",
        modelSku: "EX-IT500-150AH",
        capacity: "150 Ah",
        voltage: "12V",
        plateTechnology: "Tall Tubular Technology",
        totalWarrantyMonths: 60,
        focMonths: 36,
        proRataMonths: 24,
        approxMrp: "18500.00",
        isInStock: true,
        detailedLayout: {
          dimensions_mm: { length: 505, width: 190, height: 410 },
          filled_weight_kg: 53.5,
          electrolyte_volume_litres: 18.2,
          terminal_type: "Standard Lead Post",
          recommended_inverter_va: "900VA - 1500VA",
          features: [
            "Thick tubular spine cast at high pressure (100 bar) for long life",
            "Factory-charged & ready for immediate installation",
            "Tower type design with low water loss technology",
            "Ceramic vent plugs with float guide indicators",
          ],
        },
        initialQty: 18,
      },
      {
        id: "d0000000-0000-0000-0000-000000000002",
        link: "luminous-eco-volt-neo-1050-sine-wave",
        imageUrl: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=800&q=80",
        categoryId: inverterCatId,
        status: "active" as const,
        brandSeries: "Eco Volt Neo Series",
        brandName: "Luminous",
        modelSku: "LUM-EV-NEO-1050",
        capacity: "900 VA / 756W",
        voltage: "12V DC / 230V AC",
        plateTechnology: "Pure Sine Wave Microcontroller",
        totalWarrantyMonths: 24,
        focMonths: 24,
        proRataMonths: 0,
        approxMrp: "7200.00",
        isInStock: true,
        detailedLayout: {
          dimensions_mm: { length: 275, width: 260, height: 115 },
          weight_kg: 8.5,
          display_type: "LED Indicators",
          max_charging_current_amp: 17,
          supported_battery_types: ["Flat Plate", "Tubular", "SMF/VRLA"],
          features: [
            "Pure Sine Wave output protects sensitive appliances",
            "Adaptive Fast Charging Technology extends battery life",
            "Supports wide battery capacity range (80Ah - 220Ah)",
          ],
        },
        initialQty: 12,
      },
      {
        id: "d0000000-0000-0000-0000-000000000003",
        link: "apc-back-ups-bx600c-in",
        imageUrl: "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=800&q=80",
        categoryId: inverterCatId,
        status: "active" as const,
        brandSeries: "Back-UPS Compact",
        brandName: "APC by Schneider Electric",
        modelSku: "APC-BX600C-IN",
        capacity: "600 VA / 360W",
        voltage: "230V AC",
        plateTechnology: "Sealed Maintenance Free (SMF)",
        totalWarrantyMonths: 24,
        focMonths: 24,
        proRataMonths: 0,
        approxMrp: "3850.00",
        isInStock: false,
        detailedLayout: {
          battery_type: "12V 7.2Ah SMF Lead Acid",
          recharge_time_hours: 6,
          output_receptacles: 3,
          backup_time_desktop_pc_mins: 20,
        },
        initialQty: 0,
      },
      {
        id: "d0000000-0000-0000-0000-000000000004",
        link: "amaron-current-crtt1500-tall-tubular-150ah",
        imageUrl: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80",
        categoryId: tubularCatId,
        status: "active" as const,
        brandSeries: "Amaron Current TT",
        brandName: "Amaron",
        modelSku: "AMR-CRTT-1500",
        capacity: "150 Ah",
        voltage: "12V",
        plateTechnology: "High Heat Resistant Tubular",
        totalWarrantyMonths: 54,
        focMonths: 36,
        proRataMonths: 18,
        approxMrp: "17200.00",
        isInStock: true,
        detailedLayout: {
          dimensions_mm: { length: 502, width: 191, height: 440 },
          filled_weight_kg: 54.0,
          features: [
            "Panther spine grid with ultra-low antimony formulation",
            "High heat tolerance suitable for intense Varanasi summers",
            "Fast charge recovery after deep discharge cycles",
          ],
        },
        initialQty: 9,
      },
      {
        id: "d0000000-0000-0000-0000-000000000005",
        link: "microtek-luxe-1400-pure-sine-wave-inverter",
        imageUrl: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=800&q=80",
        categoryId: inverterCatId,
        status: "active" as const,
        brandSeries: "Luxe LCD Display Series",
        brandName: "Microtek",
        modelSku: "MCK-LUXE-1400",
        capacity: "1100 VA / 900W",
        voltage: "12V DC / 230V AC",
        plateTechnology: "Pure Sine Wave with Smart Microcontroller",
        totalWarrantyMonths: 36,
        focMonths: 36,
        proRataMonths: 0,
        approxMrp: "8400.00",
        isInStock: true,
        detailedLayout: {
          dimensions_mm: { length: 380, width: 340, height: 160 },
          weight_kg: 10.2,
          display_type: "Smart Graphic LCD Screen",
          features: [
            "Intelli-pure sine wave power prevents humming in fans",
            "Multi-stage battery pulse charging algorithm",
            "Real-time battery level, load wattage & backup time LCD display",
          ],
        },
        initialQty: 15,
      },
      {
        id: "d0000000-0000-0000-0000-000000000006",
        link: "exide-mileage-mred35r-car-battery",
        imageUrl: "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=800&q=80",
        categoryId: autoCatId,
        status: "active" as const,
        brandSeries: "Mileage Red Series",
        brandName: "Exide",
        modelSku: "EX-MRED35R",
        capacity: "35 Ah",
        voltage: "12V",
        plateTechnology: "Maintenance Free Lead-Acid",
        totalWarrantyMonths: 48,
        focMonths: 24,
        proRataMonths: 24,
        approxMrp: "4600.00",
        isInStock: true,
        detailedLayout: {
          dimensions_mm: { length: 197, width: 129, height: 227 },
          filled_weight_kg: 9.8,
          features: [
            "Special side vented cover design for zero acid spillage",
            "Magic Eye indicator for easy state-of-charge check",
            "Robust vibration resistant casing",
          ],
        },
        initialQty: 14,
      },
    ];

    // 3. Upsert Products & Inventory
    for (const p of sampleProductsData) {
      const { initialQty, ...prodData } = p;
      
      const existing = await db.query.products.findFirst({
        where: eq(products.modelSku, prodData.modelSku),
      });

      let prodId = existing?.id;

      if (!existing) {
        const [inserted] = await db.insert(products).values(prodData).returning();
        prodId = inserted.id;
      } else {
        await db.update(products).set({
          ...prodData,
          updatedAt: new Date(),
        }).where(eq(products.id, existing.id));
      }

      if (prodId) {
        const existingInv = await db.query.inventory.findFirst({
          where: eq(inventory.productId, prodId),
        });

        if (!existingInv) {
          await db.insert(inventory).values({
            productId: prodId,
            warehouseLocation: "Varanasi Main Hub",
            quantityAvailable: initialQty,
            quantityReserved: 0,
            reorderLevel: 5,
            lastRestockedAt: new Date(),
          });
        }
      }
    }

    // 4. Seed Demo Orders if none exist
    const existingOrders = await db.select().from(orders);
    if (existingOrders.length === 0) {
      const exideProd = await db.query.products.findFirst({
        where: eq(products.modelSku, "EX-IT500-150AH"),
      });
      const luminousProd = await db.query.products.findFirst({
        where: eq(products.modelSku, "LUM-EV-NEO-1050"),
      });

      // Order 1: Confirmed
      const [ord1] = await db.insert(orders).values({
        id: "a0000000-0000-0000-0000-000000000001",
        status: "confirmed",
        paymentStatus: "unpaid",
        paymentMethod: "COD (Pay on Installation)",
        shippingAddress: {
          full_name: "Ayush Sharma",
          phone: "+91 98393 02493",
          address_line1: "42 Cantt Road, Near Nadesar Chowk",
          city: "Varanasi",
          state: "Uttar Pradesh",
          pincode: "221001",
        },
        subtotal: "18500.00",
        tax: "3330.00",
        shippingCharge: "0.00",
        totalAmount: "18500.00",
      }).returning();

      if (exideProd) {
        await db.insert(orderItems).values({
          orderId: ord1.id,
          productId: exideProd.id,
          quantity: 1,
          priceAtPurchase: "18500.00",
          warrantyApplicable: "60 Months (36M FOC + 24M Pro-Rata)",
        });
      }

      await db.insert(orderStatusHistory).values({
        orderId: ord1.id,
        status: "confirmed",
        remarks: "Order confirmed. Technician allocated for Varanasi Cantt hub.",
      });

      // Order 2: Processing Combo
      const [ord2] = await db.insert(orders).values({
        id: "a0000000-0000-0000-0000-000000000002",
        status: "processing",
        paymentStatus: "paid",
        paymentMethod: "UPI Scan on Delivery",
        shippingAddress: {
          full_name: "Ramesh Pandey",
          phone: "+91 91234 56789",
          address_line1: "Plot 18, Sundarpur Main Road",
          city: "Varanasi",
          state: "Uttar Pradesh",
          pincode: "221005",
        },
        subtotal: "25700.00",
        tax: "4626.00",
        shippingCharge: "0.00",
        totalAmount: "25700.00",
      }).returning();

      if (exideProd && luminousProd) {
        await db.insert(orderItems).values([
          {
            orderId: ord2.id,
            productId: exideProd.id,
            quantity: 1,
            priceAtPurchase: "18500.00",
            warrantyApplicable: "60 Months",
          },
          {
            orderId: ord2.id,
            productId: luminousProd.id,
            quantity: 1,
            priceAtPurchase: "7200.00",
            warrantyApplicable: "24 Months",
          },
        ]);
      }

      await db.insert(orderStatusHistory).values({
        orderId: ord2.id,
        status: "processing",
        remarks: "Combo inverter + battery dispatch prepared at Godowlia center.",
      });
    }

    logInfo("Database successfully seeded with standard products, inventory, and sample orders");

    return NextResponse.json({
      success: true,
      message: "Database successfully seeded with products, inventory, and demo orders.",
    });
  } catch (err: any) {
    logError(err, { route: "/api/admin/seed", method: "POST", action: "Seed Database" }, "DATABASE_ERROR");
    return NextResponse.json({ error: err.message || "Failed to seed database." }, { status: 500 });
  }
}
