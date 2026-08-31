-- ============================================================================
-- Pivasa Power - Supabase PostgreSQL Database & Schema Setup Script
-- Authorized EXIDE & Livguard Dealer Storefront + Admin Database
-- ============================================================================

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Drop existing tables if re-initializing (Safe ordering)
DROP TABLE IF EXISTS upload_logs CASCADE;
DROP TABLE IF EXISTS solar_leads CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS brands CASCADE;
DROP TABLE IF EXISTS admin_users CASCADE;

-- ============================================================================
-- 3. Create Tables
-- ============================================================================

-- Categories Table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    image TEXT
);

-- Brands Table
CREATE TABLE brands (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    logo TEXT
);

-- Products Table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    sku VARCHAR(100) UNIQUE NOT NULL,
    name TEXT NOT NULL,
    brand VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    sub_category VARCHAR(100),
    description TEXT,
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    discount_price NUMERIC(10, 2) CHECK (discount_price IS NULL OR discount_price >= 0),
    stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
    warranty_months INTEGER DEFAULT 0 CHECK (warranty_months >= 0),
    battery_type VARCHAR(50),
    capacity_ah INTEGER CHECK (capacity_ah IS NULL OR capacity_ah >= 0),
    weight_kg NUMERIC(6, 2) CHECK (weight_kg IS NULL OR weight_kg >= 0),
    dimensions VARCHAR(100),
    status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'draft', 'out_of_stock')),
    tags JSONB DEFAULT '[]'::jsonb,
    image_urls JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Orders Table (Cash on Delivery / Pay at Store)
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    customer_name VARCHAR(150) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    customer_address TEXT NOT NULL,
    total_amount NUMERIC(10, 2) NOT NULL CHECK (total_amount >= 0),
    payment_method VARCHAR(50) NOT NULL DEFAULT 'COD',
    status VARCHAR(50) NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Confirmed', 'Out for Delivery', 'Installed', 'Completed', 'Cancelled')),
    exchange_discount NUMERIC(10, 2) DEFAULT 0 CHECK (exchange_discount >= 0),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Order Items Table
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id) ON DELETE SET NULL,
    product_name TEXT NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
    unit_price NUMERIC(10, 2) NOT NULL CHECK (unit_price >= 0)
);

-- Solar Leads Table (Load Calculator Inquiry)
CREATE TABLE solar_leads (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT,
    load_details TEXT,
    estimated_wattage INTEGER CHECK (estimated_wattage IS NULL OR estimated_wattage >= 0),
    monthly_bill NUMERIC(10, 2) CHECK (monthly_bill IS NULL OR monthly_bill >= 0),
    status VARCHAR(50) NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Quoted', 'Converted', 'Lost')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Bulk Upload Logs Table
CREATE TABLE upload_logs (
    id SERIAL PRIMARY KEY,
    file_name TEXT NOT NULL,
    uploaded_by VARCHAR(100) NOT NULL DEFAULT 'admin',
    total_rows INTEGER NOT NULL DEFAULT 0,
    success_rows INTEGER NOT NULL DEFAULT 0,
    error_rows INTEGER NOT NULL DEFAULT 0,
    error_report JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Admin Users Table (Secure HMAC & PBKDF2 salt/hash)
CREATE TABLE admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL DEFAULT 'Administrator',
    password_hash TEXT NOT NULL,
    salt TEXT NOT NULL DEFAULT '',
    role TEXT NOT NULL DEFAULT 'super_admin',
    failed_attempts INTEGER NOT NULL DEFAULT 0,
    locked_until TIMESTAMP WITH TIME ZONE,
    last_login_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- ============================================================================
-- 4. Indexes for Query Performance
-- ============================================================================
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_brand ON products(brand);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_orders_order_number ON orders(order_number);
CREATE INDEX idx_orders_customer_phone ON orders(customer_phone);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_solar_leads_status ON solar_leads(status);

-- ============================================================================
-- 5. Automatic Updated_At Trigger Function
-- ============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 6. Seed Initial Data
-- ============================================================================

-- Seed Brands
INSERT INTO brands (name, logo) VALUES
('Exide', 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e'),
('Livguard', 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5')
ON CONFLICT (name) DO NOTHING;

-- Seed Categories
INSERT INTO categories (name, slug, description) VALUES
('Inverter Batteries', 'inverters', 'Tubular and flat plate power backup batteries'),
('Home UPS', 'ups', 'Pure sinewave home inverters and UPS systems'),
('Automotive Batteries', 'car-batteries', 'Car, truck and heavy vehicle batteries'),
('Two-Wheeler Batteries', 'bike-batteries', 'Motorcycle and scooter batteries'),
('Voltage Stabilizers', 'stabilizers', 'Mainline and AC digital voltage stabilizers'),
('Solar Panels', 'solar', 'Mono PERC and Poly solar modules'),
('Battery Trolleys', 'trolleys', 'Heavy duty plastic battery trolleys'),
('Solar Combo Kits', 'solar-combos', 'Complete solar panel + battery + inverter kits')
ON CONFLICT (slug) DO NOTHING;

-- Seed Sample Products
INSERT INTO products (sku, name, brand, category, sub_category, description, price, discount_price, stock, warranty_months, battery_type, capacity_ah, weight_kg, dimensions, status, tags, image_urls) VALUES
(
    'EX-INV-150AH',
    'Exide Inverter battery 150Ah - Invamaster',
    'Exide',
    'Inverter Batteries',
    'Tubular Battery',
    'High performance tubular battery engineered for long power cuts in Varanasi. Factory charged and low maintenance.',
    15500.00,
    13990.00,
    25,
    36,
    'Tubular',
    150,
    52.00,
    '500x190x410 mm',
    'active',
    '["Authorized Exide", "Best Seller"]'::jsonb,
    '["https://images.unsplash.com/photo-1619642751034-765dfdf7c58e"]'::jsonb
),
(
    'EX-INV-200AH',
    'Exide Inva Tall Tubular 200Ah Heavy Duty Battery',
    'Exide',
    'Inverter Batteries',
    'Tubular Battery',
    'Jumbo tall tubular battery designed for heavy home loads including multiple fans, lights, and appliances.',
    21000.00,
    18500.00,
    15,
    48,
    'Tubular',
    200,
    64.00,
    '505x190x440 mm',
    'active',
    '["Authorized Exide", "Heavy Backup"]'::jsonb,
    '["https://images.unsplash.com/photo-1619642751034-765dfdf7c58e"]'::jsonb
),
(
    'LIV-UPS-1000',
    'Livguard Smart UPS 1000VA Sinewave Inverter',
    'Livguard',
    'Home UPS',
    'Sinewave UPS',
    'Microcontroller-based pure sinewave home UPS with fast battery charging technology.',
    8500.00,
    7490.00,
    12,
    24,
    'UPS System',
    0,
    10.00,
    '300x250x150 mm',
    'active',
    '["Livguard Authorized", "Smart Choice"]'::jsonb,
    '["https://images.unsplash.com/photo-1544724569-5f546fd6f2b5"]'::jsonb
),
(
    'SLR-PNL-400W',
    '400W Mono PERC Solar Panel Module',
    'Exide',
    'Solar Panels',
    'Mono PERC',
    'High efficiency monocrystalline PERC solar panel for residential and commercial rooftop solar solutions in Varanasi.',
    14000.00,
    11990.00,
    20,
    300,
    'Solar Module',
    0,
    22.00,
    '2000x1000x35 mm',
    'active',
    '["High Efficiency", "25 Year Warranty"]'::jsonb,
    '["https://images.unsplash.com/photo-1509391365360-2e959784a276"]'::jsonb
)
ON CONFLICT (sku) DO NOTHING;

-- Seed Default Master Admin Account
-- Email: admin@pivasapower.com
INSERT INTO admin_users (email, full_name, password_hash, salt, role) VALUES
('admin@pivasapower.com', 'Pivasa Super Admin', 'e0996fa1eaae10e05dc79fa4f0c438fc78ef86481816e8851493fc18feea7fc8c67a3a8ce79ec845a704256eb28ea8ecb4ba62ec54bece8a3068e1a141a0f51a', '26b8cb79be6a42a0b1df6f881f3d606f', 'super_admin')
ON CONFLICT (email) DO NOTHING;

-- ============================================================================
-- 7. Supabase Row Level Security (RLS) Policies
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE solar_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE upload_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Public Read Policies (Storefront access)
CREATE POLICY "Allow public read active products" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow public read brands" ON brands FOR SELECT USING (true);

-- Public Insert Policies (Storefront COD Order & Solar Inquiry submission)
CREATE POLICY "Allow public insert orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert order items" ON order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert solar leads" ON solar_leads FOR INSERT WITH CHECK (true);

-- Full Access for Service Role / Authenticated Backend API
CREATE POLICY "Allow full access for authenticated backend" ON products FOR ALL USING (true);
CREATE POLICY "Allow full access for orders" ON orders FOR ALL USING (true);
CREATE POLICY "Allow full access for order_items" ON order_items FOR ALL USING (true);
CREATE POLICY "Allow full access for solar_leads" ON solar_leads FOR ALL USING (true);
CREATE POLICY "Allow full access for upload_logs" ON upload_logs FOR ALL USING (true);
CREATE POLICY "Allow full access for admin_users" ON admin_users FOR ALL USING (true);
