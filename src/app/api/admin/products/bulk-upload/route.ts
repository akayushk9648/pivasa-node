import { NextRequest, NextResponse } from "next/server";
import { db, products, inventory, categories, productBulkUploadLog } from "@/db";
import { eq } from "drizzle-orm";
import * as XLSX from "xlsx";
import { logError, logInfo } from "@/lib/logger";

/**
 * Robust helper to find column values across arbitrary header formatting
 * (ignores case, spaces, underscores, hyphens, slashes, and parentheses)
 */
function findRowValue(row: any, ...targetKeys: string[]): any {
  const rowKeys = Object.keys(row);

  for (const target of targetKeys) {
    const cleanTarget = target.toLowerCase().replace(/[^a-z0-9]/g, "");

    // 1. Direct match
    if (row[target] !== undefined && row[target] !== null && String(row[target]).trim() !== "") {
      return row[target];
    }

    // 2. Normalized match
    for (const key of rowKeys) {
      const cleanKey = key.toLowerCase().replace(/[^a-z0-9]/g, "");
      if (cleanKey === cleanTarget) {
        const val = row[key];
        if (val !== undefined && val !== null && String(val).trim() !== "") {
          return val;
        }
      }
    }
  }
  return undefined;
}

/**
 * Strips currency symbols (₹, $, Rs), commas, and spaces to extract a clean float
 */
function parseCurrency(val: any): number {
  if (val === undefined || val === null) return 0;
  if (typeof val === "number") return val;
  const cleaned = String(val).replace(/[^0-9.]/g, "");
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No Excel or CSV file provided." }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const rawRows = XLSX.utils.sheet_to_json<any>(workbook.Sheets[sheetName], { defval: "" });

    if (!rawRows || rawRows.length === 0) {
      return NextResponse.json({ error: "Uploaded spreadsheet is empty or contains no data rows." }, { status: 400 });
    }

    // Fetch existing categories to auto-link
    const allCategories = await db.select().from(categories);
    const getCat = (predicate: (name: string) => boolean) =>
      allCategories.find((c) => predicate(c.categoryName.toLowerCase())) || null;

    const tubularCat = getCat((n) => n.includes("tubular") && !n.includes("rickshaw") && !n.includes("solar"));
    const inverterCat = getCat((n) => n.includes("inverter &") || (n.includes("ups") && !n.includes("tubular")));
    const carCat = getCat((n) => n.includes("passenger") || n.includes("car"));
    const twoWheelerCat = getCat((n) => n.includes("two wheeler") || n.includes("bike"));
    const commCat = getCat((n) => n.includes("commercial") || n.includes("heavy"));
    const erickshawCat = getCat((n) => n.includes("rickshaw") || n.includes("three wheeler"));
    const solarCat = getCat((n) => n.includes("solar") || n.includes("genset"));
    const industrialCat = getCat((n) => n.includes("industrial") || n.includes("standby"));

    let successCount = 0;
    let failedCount = 0;
    const errors: Array<{ sku?: string; error: string; rowNumber: number }> = [];

    // Initialize Bulk Upload Log Record
    let logId: string | undefined;
    try {
      const [logRecord] = await db.insert(productBulkUploadLog).values({
        fileName: file.name,
        totalRows: rawRows.length,
        successCount: 0,
        failedCount: 0,
        status: "processing",
      }).returning();
      logId = logRecord?.id;
    } catch (logErr) {
      console.warn("Could not insert initial upload log record:", logErr);
    }

    // Keep track of used slugs in this batch to prevent duplicate slug constraint violations
    const usedSlugs = new Set<string>();

    for (let i = 0; i < rawRows.length; i++) {
      const row = rawRows[i];
      const rowNumber = i + 2; // 1-indexed Excel row accounting for header

      try {
        // Extract Model / SKU
        const skuVal = findRowValue(
          row,
          "Model / SKU",
          "Model/SKU",
          "Model SKU",
          "model_sku",
          "sku",
          "Model",
          "Item Code",
          "Product Code",
          "Code"
        );

        // Extract Brand Name
        const brandVal = findRowValue(
          row,
          "BrandName",
          "Brand Name",
          "Brand_Name",
          "brand_name",
          "Brand",
          "Company",
          "Manufacturer"
        ) || "Exide";

        // Extract Approx MRP
        const mrpValRaw = findRowValue(
          row,
          "Approx MRP (₹)",
          "Approx MRP",
          "approx_mrp",
          "MRP",
          "Price",
          "Price (₹)",
          "Rate",
          "Amount",
          "Selling Price"
        );

        // Extract Link / Slug
        const linkVal = findRowValue(row, "link", "Slug", "URL", "Product Link");

        // Extract Brand Series
        const seriesVal = findRowValue(row, "Brand Series", "Series", "brand_series", "Category / Status", "Family");

        // Extract Category
        const categoryVal = findRowValue(row, "Category / Status", "Category", "category_id", "Type");

        // Extract Capacity & Voltage
        const capacityVal = findRowValue(row, "Capacity (Ah / VA)", "Capacity", "capacity", "Ah", "VA", "Power Rating");
        const voltageVal = findRowValue(row, "Voltage (V)", "Voltage", "voltage", "Volts") || "12V";

        // Extract Plate Technology
        const techVal = findRowValue(
          row,
          "Plate Technology / Metallurgy",
          "Plate Technology",
          "Technology",
          "plate_technology",
          "Metallurgy",
          "Battery Type"
        ) || "Lead-Acid Technology";

        // Extract Warranties
        const totalWarrantyRaw = findRowValue(row, "Total Warranty (Mos)", "Total Warranty", "total_warranty_months", "Warranty", "Warranty Months");
        const focRaw = findRowValue(row, "FOC (Mos)", "FOC", "foc_months", "Free Warranty");
        const proRataRaw = findRowValue(row, "Pro-Rata (Mos)", "Pro-Rata", "Pro Rata", "pro_rata_months", "Prorata");

        // Extract Image URL
        const imageUrlVal = findRowValue(row, "image_url", "Image", "Image URL", "Photo", "Image Link");

        // Extract Stock / Quantity
        const inStockVal = findRowValue(row, "is_in_stock", "In Stock", "Stock Status", "Status");
        const qtyVal = findRowValue(row, "initial_quantity", "Initial Quantity", "Stock", "Quantity", "Qty");

        // Extract Detailed Layout / Compatibility
        const layoutVal = findRowValue(
          row,
          "Detailed Layout, Engineering Specs & Application Compatibility",
          "Detailed Layout",
          "Compatibility",
          "Application",
          "Description",
          "Features",
          "Specs"
        );

        const sku = String(skuVal || "").trim();
        const brand = String(brandVal || "").trim();
        const parsedMrp = parseCurrency(mrpValRaw);

        if (!sku) {
          throw new Error(`Row ${rowNumber}: Missing Model / SKU`);
        }
        if (!brand) {
          throw new Error(`Row ${rowNumber}: Missing BrandName`);
        }
        if (parsedMrp <= 0) {
          throw new Error(`Row ${rowNumber}: Invalid or missing Approx MRP (${mrpValRaw || "empty"})`);
        }

        // Clean & Normalize Warranty Numbers ensuring totalWarranty = foc + proRata
        let totalWarranty = parseInt(String(totalWarrantyRaw || "36").replace(/[^0-9]/g, ""), 10) || 36;
        let foc = parseInt(String(focRaw || "0").replace(/[^0-9]/g, ""), 10);
        let proRata = parseInt(String(proRataRaw || "0").replace(/[^0-9]/g, ""), 10);

        if (isNaN(foc) && isNaN(proRata)) {
          foc = totalWarranty;
          proRata = 0;
        } else if (isNaN(foc) || foc <= 0) {
          if (!isNaN(proRata) && proRata <= totalWarranty) {
            foc = totalWarranty - proRata;
          } else {
            foc = totalWarranty;
            proRata = 0;
          }
        } else if (foc >= totalWarranty) {
          foc = totalWarranty;
          proRata = 0;
        } else {
          proRata = totalWarranty - foc;
        }

        // Generate unique slug
        let rawSlug = String(linkVal || `${sku}-${brand}`).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
        if (!rawSlug) rawSlug = `prod-${sku.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
        
        let slug = rawSlug;
        let counter = 1;
        while (usedSlugs.has(slug)) {
          slug = `${rawSlug}-${counter}`;
          counter++;
        }
        usedSlugs.add(slug);

        // Determine Category
        let categoryId: string | null = null;
        const categoryText = `${categoryVal || ""} ${brand} ${seriesVal || ""} ${capacityVal || ""} ${techVal || ""} ${layoutVal || ""}`.toLowerCase();

        if (categoryText.includes("inverter ups") || categoryText.includes("home ups") || categoryText.includes(" pure sine") || (categoryText.includes("va") && !categoryText.includes("ah")) || categoryText.includes("lithium smart")) {
          categoryId = inverterCat?.id || null;
        } else if (categoryText.includes("solar") || categoryText.includes("c10") || categoryText.includes("genset") || categoryText.includes("gen-set")) {
          categoryId = solarCat?.id || null;
        } else if (categoryText.includes("e-rickshaw") || categoryText.includes("erickshaw") || categoryText.includes("three wheeler") || categoryText.includes("3-wheeler")) {
          categoryId = erickshawCat?.id || null;
        } else if (categoryText.includes("two wheeler") || categoryText.includes("2-wheeler") || categoryText.includes("motorcycle") || categoryText.includes("scooter") || categoryText.includes("bike")) {
          categoryId = twoWheelerCat?.id || null;
        } else if (categoryText.includes("commercial") || categoryText.includes("truck") || categoryText.includes("tractor") || categoryText.includes("bus") || categoryText.includes("earthmover") || categoryText.includes("heavy vehicle")) {
          categoryId = commCat?.id || null;
        } else if (categoryText.includes("industrial") || categoryText.includes("smf vrla") || categoryText.includes("plante") || categoryText.includes("powersafe") || categoryText.includes("2v cell")) {
          categoryId = industrialCat?.id || null;
        } else if (categoryText.includes("passenger") || categoryText.includes("car") || categoryText.includes("suv") || categoryText.includes("sedan") || categoryText.includes("taxi")) {
          categoryId = carCat?.id || null;
        } else {
          categoryId = tubularCat?.id || null;
        }

        // Parse Stock
        const isInStock = inStockVal === undefined 
          ? true 
          : (String(inStockVal).toLowerCase() === "true" || String(inStockVal).toLowerCase() === "yes" || String(inStockVal).toLowerCase() === "active" || Number(inStockVal) > 0);
        
        const initialQty = parseInt(String(qtyVal || (isInStock ? "15" : "0")), 10) || 0;

        const defaultImage = "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80";

        // Layout / Specs features parsing
        const layoutText = String(layoutVal || "").trim();
        const featuresArray = layoutText ? layoutText.split(/[,|;]/).map((s) => s.trim()).filter(Boolean) : [];

        const prodPayload = {
          link: slug,
          imageUrl: imageUrlVal ? String(imageUrlVal) : defaultImage,
          categoryId,
          brandName: brand,
          brandSeries: seriesVal ? String(seriesVal) : null,
          modelSku: sku,
          capacity: capacityVal ? String(capacityVal) : null,
          voltage: String(voltageVal),
          plateTechnology: String(techVal),
          totalWarrantyMonths: totalWarranty,
          focMonths: foc,
          proRataMonths: proRata,
          approxMrp: String(parsedMrp),
          isInStock: Boolean(isInStock),
          status: "active" as const,
          detailedLayout: {
            application: layoutText || undefined,
            features: featuresArray,
          },
          updatedAt: new Date(),
        };

        // Check if product exists by SKU
        const existing = await db.query.products.findFirst({
          where: eq(products.modelSku, sku),
        });

        let productId: string;

        if (existing) {
          const [updated] = await db
            .update(products)
            .set(prodPayload)
            .where(eq(products.id, existing.id))
            .returning();
          productId = updated.id;
        } else {
          const [inserted] = await db
            .insert(products)
            .values(prodPayload)
            .returning();
          productId = inserted.id;
        }

        // Upsert inventory
        const existingInv = await db.query.inventory.findFirst({
          where: eq(inventory.productId, productId),
        });

        if (existingInv) {
          await db
            .update(inventory)
            .set({
              quantityAvailable: initialQty > 0 ? initialQty : existingInv.quantityAvailable,
              lastUpdatedAt: new Date(),
            })
            .where(eq(inventory.id, existingInv.id));
        } else {
          await db.insert(inventory).values({
            productId: productId,
            warehouseLocation: "Varanasi Main Hub",
            quantityAvailable: initialQty,
            quantityReserved: 0,
            reorderLevel: 5,
            lastRestockedAt: new Date(),
          });
        }

        successCount++;
      } catch (rowErr: any) {
        failedCount++;
        errors.push({
          sku: row["Model / SKU"] || row.model_sku || row.sku || `Row #${rowNumber}`,
          error: rowErr.message || "Row ingestion failed",
          rowNumber,
        });
      }
    }

    // Finalize Bulk Upload Log Record Status
    if (logId) {
      try {
        await db
          .update(productBulkUploadLog)
          .set({
            successCount,
            failedCount,
            errorLog: errors,
            status: failedCount === 0 ? "completed" : failedCount < rawRows.length ? "completed" : "failed",
          })
          .where(eq(productBulkUploadLog.id, logId));
      } catch (logFinalErr) {
        console.warn("Could not update final upload log record:", logFinalErr);
      }
    }

    logInfo(`Bulk upload completed: ${successCount} successful, ${failedCount} failed from file ${file.name}`);

    return NextResponse.json({
      success: true,
      totalRows: rawRows.length,
      successCount,
      failedCount,
      errors: errors.slice(0, 50),
      logId,
    });
  } catch (error: any) {
    logError(error, { route: "/api/admin/products/bulk-upload", method: "POST", action: "Bulk Upload" }, "API_ERROR");
    return NextResponse.json({ error: error.message || "Failed to process bulk upload." }, { status: 500 });
  }
}
