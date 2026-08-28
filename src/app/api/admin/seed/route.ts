import { NextRequest, NextResponse } from "next/server";
import { db, products, categories, inventory, orders, orderItems, orderStatusHistory } from "@/db";
import { eq } from "drizzle-orm";
import { logError, logInfo } from "@/lib/logger";
import { EXIDE_CATEGORIES, EXIDE_PRODUCTS } from "@/lib/constants/exide-products-data";

export async function POST(req: NextRequest) {
  try {
    // 1. Ensure / Upsert all 8 Categories
    for (const cat of EXIDE_CATEGORIES) {
      const existingCat = await db.query.categories.findFirst({
        where: eq(categories.id, cat.id),
      });

      if (!existingCat) {
        await db.insert(categories).values({
          id: cat.id,
          categoryName: cat.category_name,
          description: cat.description || null,
          status: cat.status || "active",
        });
      } else {
        await db
          .update(categories)
          .set({
            categoryName: cat.category_name,
            description: cat.description || null,
            status: cat.status || "active",
          })
          .where(eq(categories.id, cat.id));
      }
    }

    // 2. Upsert all 195 Products
    for (const p of EXIDE_PRODUCTS) {
      const existing = await db.query.products.findFirst({
        where: eq(products.modelSku, p.model_sku),
      });

      let prodId: string;

      const prodPayload = {
        link: p.link,
        imageUrl: p.image_url,
        categoryId: p.category_id,
        status: p.status as any,
        brandSeries: p.brand_series,
        brandName: p.brand_name,
        modelSku: p.model_sku,
        capacity: p.capacity,
        voltage: p.voltage,
        plateTechnology: p.plate_technology,
        totalWarrantyMonths: p.total_warranty_months,
        focMonths: p.foc_months,
        proRataMonths: p.pro_rata_months,
        approxMrp: String(p.approx_mrp),
        isInStock: p.is_in_stock,
        detailedLayout: p.detailed_layout,
        updatedAt: new Date(),
      };

      if (!existing) {
        const [inserted] = await db
          .insert(products)
          .values({
            id: p.id,
            ...prodPayload,
          })
          .returning();
        prodId = inserted.id;
      } else {
        const [updated] = await db
          .update(products)
          .set(prodPayload)
          .where(eq(products.id, existing.id))
          .returning();
        prodId = updated.id;
      }

      // 3. Upsert Inventory
      if (prodId) {
        const existingInv = await db.query.inventory.findFirst({
          where: eq(inventory.productId, prodId),
        });

        if (!existingInv) {
          await db.insert(inventory).values({
            productId: prodId,
            warehouseLocation: "Varanasi Main Hub",
            quantityAvailable: 15,
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
      const sampleProd1 = await db.query.products.findFirst({
        where: eq(products.modelSku, "IT 500"),
      });
      const sampleProd2 = await db.query.products.findFirst({
        where: eq(products.modelSku, "STAR 12V 900"),
      });

      if (sampleProd1) {
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
          subtotal: String(sampleProd1.approxMrp),
          tax: "0.00",
          shippingCharge: "0.00",
          totalAmount: String(sampleProd1.approxMrp),
        }).returning();

        await db.insert(orderItems).values({
          orderId: ord1.id,
          productId: sampleProd1.id,
          quantity: 1,
          priceAtPurchase: String(sampleProd1.approxMrp),
          warrantyApplicable: `${sampleProd1.totalWarrantyMonths} Months (${sampleProd1.focMonths}M FOC + ${sampleProd1.proRataMonths}M Pro-Rata)`,
        });

        await db.insert(orderStatusHistory).values({
          orderId: ord1.id,
          status: "confirmed",
          remarks: "Order confirmed. Technician allocated for Varanasi Cantt hub.",
        });

        if (sampleProd2) {
          const comboSubtotal = (parseFloat(sampleProd1.approxMrp) + parseFloat(sampleProd2.approxMrp)).toFixed(2);
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
            subtotal: comboSubtotal,
            tax: "0.00",
            shippingCharge: "0.00",
            totalAmount: comboSubtotal,
          }).returning();

          await db.insert(orderItems).values([
            {
              orderId: ord2.id,
              productId: sampleProd1.id,
              quantity: 1,
              priceAtPurchase: String(sampleProd1.approxMrp),
              warrantyApplicable: `${sampleProd1.totalWarrantyMonths} Months`,
            },
            {
              orderId: ord2.id,
              productId: sampleProd2.id,
              quantity: 1,
              priceAtPurchase: String(sampleProd2.approxMrp),
              warrantyApplicable: `${sampleProd2.totalWarrantyMonths} Months`,
            },
          ]);

          await db.insert(orderStatusHistory).values({
            orderId: ord2.id,
            status: "processing",
            remarks: "Combo inverter + battery dispatch prepared at Godowlia center.",
          });
        }
      }
    }

    logInfo("Database successfully seeded with 195 Exide products, inventory, and demo orders");

    return NextResponse.json({
      success: true,
      message: `Database successfully seeded with ${EXIDE_PRODUCTS.length} products, categories, and inventory.`,
      categoriesCount: EXIDE_CATEGORIES.length,
      productsCount: EXIDE_PRODUCTS.length,
    });
  } catch (err: any) {
    logError(err, { route: "/api/admin/seed", method: "POST", action: "Seed Database" }, "DATABASE_ERROR");
    return NextResponse.json({ error: err.message || "Failed to seed database." }, { status: 500 });
  }
}
