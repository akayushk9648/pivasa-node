const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env.local") });
const postgres = require("postgres");

const catalogData = require(path.join(__dirname, "../src/lib/constants/exide-products.json"));
const EXIDE_CATEGORIES = catalogData.categories;
const EXIDE_PRODUCTS = catalogData.products;

if (!process.env.DATABASE_URL) {
  console.error("ERROR: DATABASE_URL is not set in .env.local");
  process.exit(1);
}

const connUrl = process.env.DATABASE_URL.replace(":5432", ":6543");
const sql = postgres(connUrl, { prepare: false, max: 10 });

async function seed() {
  console.log("Starting database seeding with full Exide catalog...");

  try {
    // 1. Seed / Upsert Categories
    console.log(`Upserting ${EXIDE_CATEGORIES.length} primary categories...`);
    for (const cat of EXIDE_CATEGORIES) {
      await sql`
        INSERT INTO categories (id, category_name, description, status)
        VALUES (${cat.id}, ${cat.category_name}, ${cat.description || null}, ${cat.status || "active"})
        ON CONFLICT (id) DO UPDATE SET
          category_name = EXCLUDED.category_name,
          description = EXCLUDED.description,
          status = EXCLUDED.status;
      `;
    }
    console.log("✓ Categories upserted successfully.");

    // 2. Seed / Upsert Products
    console.log(`Upserting ${EXIDE_PRODUCTS.length} products...`);
    let prodCount = 0;

    for (const prod of EXIDE_PRODUCTS) {
      const approxMrpStr = String(prod.approx_mrp);

      await sql`
        INSERT INTO products (
          id, link, image_url, category_id, status, brand_series, brand_name,
          model_sku, capacity, voltage, plate_technology, total_warranty_months,
          foc_months, pro_rata_months, approx_mrp, is_in_stock, detailed_layout,
          updated_at
        ) VALUES (
          ${prod.id}, ${prod.link}, ${prod.image_url}, ${prod.category_id},
          ${prod.status}::product_status, ${prod.brand_series}, ${prod.brand_name},
          ${prod.model_sku}, ${prod.capacity}, ${prod.voltage}, ${prod.plate_technology},
          ${prod.total_warranty_months}, ${prod.foc_months}, ${prod.pro_rata_months},
          ${approxMrpStr}, ${prod.is_in_stock}, ${JSON.stringify(prod.detailed_layout)},
          NOW()
        )
        ON CONFLICT (model_sku) DO UPDATE SET
          link = EXCLUDED.link,
          image_url = EXCLUDED.image_url,
          category_id = EXCLUDED.category_id,
          status = EXCLUDED.status,
          brand_series = EXCLUDED.brand_series,
          brand_name = EXCLUDED.brand_name,
          capacity = EXCLUDED.capacity,
          voltage = EXCLUDED.voltage,
          plate_technology = EXCLUDED.plate_technology,
          total_warranty_months = EXCLUDED.total_warranty_months,
          foc_months = EXCLUDED.foc_months,
          pro_rata_months = EXCLUDED.pro_rata_months,
          approx_mrp = EXCLUDED.approx_mrp,
          is_in_stock = EXCLUDED.is_in_stock,
          detailed_layout = EXCLUDED.detailed_layout,
          updated_at = NOW();
      `;

      // Fetch the actual product id in case of collision
      const [dbProd] = await sql`SELECT id FROM products WHERE model_sku = ${prod.model_sku}`;

      if (dbProd) {
        // 3. Upsert inventory
        await sql`
          INSERT INTO inventory (
            product_id, warehouse_location, quantity_available, quantity_reserved,
            reorder_level, last_restocked_at, last_updated_at
          ) VALUES (
            ${dbProd.id}, 'Varanasi Main Hub', 15, 0, 5, NOW(), NOW()
          )
          ON CONFLICT (product_id) DO UPDATE SET
            warehouse_location = EXCLUDED.warehouse_location,
            quantity_available = CASE WHEN inventory.quantity_available = 0 THEN 15 ELSE inventory.quantity_available END,
            last_updated_at = NOW();
        `;
      }

      prodCount++;
    }

    console.log(`✓ ${prodCount} products & inventory records successfully processed.`);

    // 4. Verify Final Counts
    const [cCount] = await sql`SELECT count(*) as count FROM categories`;
    const [pCount] = await sql`SELECT count(*) as count FROM products`;
    const [iCount] = await sql`SELECT count(*) as count FROM inventory`;

    console.log("\n================ SEEDING COMPLETE ================");
    console.log(`Categories in DB: ${cCount.count}`);
    console.log(`Products in DB:   ${pCount.count}`);
    console.log(`Inventory in DB:  ${iCount.count}`);
    console.log("===================================================\n");

    await sql.end();
  } catch (err) {
    console.error("Seeding failed with error:", err);
    await sql.end();
    process.exit(1);
  }
}

seed();
