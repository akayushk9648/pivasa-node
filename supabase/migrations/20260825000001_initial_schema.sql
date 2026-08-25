-- ============================================================================
-- PIVASA POWER - SUPABASE POSTGRESQL PRODUCTION SCHEMA
-- PostgreSQL 15+ / Supabase Schema Migration
-- ============================================================================

-- Step 1: Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Step 2: Custom Enum Types
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('customer', 'staff', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE product_status AS ENUM ('active', 'inactive', 'discontinued');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE payment_status AS ENUM ('unpaid', 'paid', 'refunded', 'failed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE upload_status AS ENUM ('processing', 'completed', 'failed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ============================================================================
-- 3. CORE TABLES DEFINITION
-- ============================================================================

-- Table 1: profiles
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    phone TEXT,
    role user_role NOT NULL DEFAULT 'customer',
    address JSONB DEFAULT '{}'::jsonb,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Table 2: categories
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_name TEXT NOT NULL,
    parent_category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    description TEXT,
    image_url TEXT,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Table 3: products
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    image_url TEXT,
    link TEXT UNIQUE NOT NULL,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    status product_status NOT NULL DEFAULT 'active',
    brand_series TEXT,
    brand_name TEXT NOT NULL,
    model_sku TEXT UNIQUE NOT NULL,
    capacity TEXT,
    voltage TEXT,
    plate_technology TEXT,
    total_warranty_months INTEGER NOT NULL DEFAULT 0 CHECK (total_warranty_months >= 0),
    foc_months INTEGER NOT NULL DEFAULT 0 CHECK (foc_months >= 0),
    pro_rata_months INTEGER NOT NULL DEFAULT 0 CHECK (pro_rata_months >= 0),
    approx_mrp NUMERIC(12, 2) NOT NULL CHECK (approx_mrp > 0),
    detailed_layout JSONB DEFAULT '{}'::jsonb,
    is_in_stock BOOLEAN NOT NULL DEFAULT false,
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT check_warranty_breakdown CHECK (total_warranty_months = (foc_months + pro_rata_months))
);

-- Table 4: inventory
CREATE TABLE IF NOT EXISTS public.inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL UNIQUE REFERENCES public.products(id) ON DELETE CASCADE,
    warehouse_location TEXT NOT NULL DEFAULT 'Varanasi Main Hub',
    quantity_available INTEGER NOT NULL DEFAULT 0 CHECK (quantity_available >= 0),
    quantity_reserved INTEGER NOT NULL DEFAULT 0 CHECK (quantity_reserved >= 0),
    reorder_level INTEGER NOT NULL DEFAULT 5 CHECK (reorder_level >= 0),
    last_restocked_at TIMESTAMPTZ,
    last_updated_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    last_updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Table 5: cart_items
CREATE TABLE IF NOT EXISTS public.cart_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
    added_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT uq_user_product_cart UNIQUE(user_id, product_id)
);

-- Table 6: orders
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    order_date TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    status order_status NOT NULL DEFAULT 'pending',
    payment_status payment_status NOT NULL DEFAULT 'unpaid',
    payment_method TEXT NOT NULL DEFAULT 'COD',
    shipping_address JSONB NOT NULL,
    billing_address JSONB,
    subtotal NUMERIC(12, 2) NOT NULL CHECK (subtotal >= 0),
    tax NUMERIC(12, 2) NOT NULL DEFAULT 0.00 CHECK (tax >= 0),
    shipping_charge NUMERIC(12, 2) NOT NULL DEFAULT 0.00 CHECK (shipping_charge >= 0),
    total_amount NUMERIC(12, 2) NOT NULL CHECK (total_amount >= 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Table 7: order_items
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
    price_at_purchase NUMERIC(12, 2) NOT NULL CHECK (price_at_purchase >= 0),
    warranty_applicable TEXT NOT NULL
);

-- Table 8: order_status_history
CREATE TABLE IF NOT EXISTS public.order_status_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    status order_status NOT NULL,
    changed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    changed_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    remarks TEXT
);

-- Table 9: inventory_audit_log
CREATE TABLE IF NOT EXISTS public.inventory_audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    old_stock_status BOOLEAN,
    new_stock_status BOOLEAN NOT NULL,
    changed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    changed_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Table 10: product_bulk_upload_log
CREATE TABLE IF NOT EXISTS public.product_bulk_upload_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    uploaded_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    file_name TEXT NOT NULL,
    upload_date TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    total_rows INTEGER NOT NULL DEFAULT 0 CHECK (total_rows >= 0),
    success_count INTEGER NOT NULL DEFAULT 0 CHECK (success_count >= 0),
    failed_count INTEGER NOT NULL DEFAULT 0 CHECK (failed_count >= 0),
    error_log JSONB DEFAULT '[]'::jsonb,
    status upload_status NOT NULL DEFAULT 'processing'
);

-- ============================================================================
-- 4. PERFORMANCE & LOOKUP INDEXES
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_products_category_id ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_brand_name ON public.products(brand_name);
CREATE INDEX IF NOT EXISTS idx_products_model_sku ON public.products(model_sku);
CREATE INDEX IF NOT EXISTS idx_products_is_in_stock ON public.products(is_in_stock);
CREATE INDEX IF NOT EXISTS idx_products_link ON public.products(link);
CREATE INDEX IF NOT EXISTS idx_products_status ON public.products(status);

CREATE INDEX IF NOT EXISTS idx_inventory_product_id ON public.inventory(product_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_user_id ON public.cart_items(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_status_history_order_id ON public.order_status_history(order_id);
CREATE INDEX IF NOT EXISTS idx_inventory_audit_product_id ON public.inventory_audit_log(product_id);
CREATE INDEX IF NOT EXISTS idx_bulk_upload_uploaded_by ON public.product_bulk_upload_log(uploaded_by);

-- ============================================================================
-- 5. SECURITY & ROLE HELPER FUNCTIONS
-- ============================================================================
CREATE OR REPLACE FUNCTION public.get_auth_role()
RETURNS user_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT role FROM public.profiles WHERE id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND role = 'admin' AND is_active = true
    );
$$;

CREATE OR REPLACE FUNCTION public.is_staff_or_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND role IN ('admin', 'staff') AND is_active = true
    );
$$;

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_products_updated_at
    BEFORE UPDATE ON public.products
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER tr_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Auto-provision profile on auth.users signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, phone, role, is_active)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'New Customer'),
        NEW.raw_user_meta_data->>'phone',
        COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'customer'::user_role),
        true
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- 6. BUSINESS LOGIC & AUTOMATION TRIGGERS
-- ============================================================================

-- Logic A: Stock-Toggle -> Inventory Sync & Audit Logging
CREATE OR REPLACE FUNCTION public.process_product_stock_toggle()
RETURNS TRIGGER AS $$
DECLARE
    v_user_id UUID;
BEGIN
    v_user_id := auth.uid();

    IF (TG_OP = 'UPDATE' AND OLD.is_in_stock IS DISTINCT FROM NEW.is_in_stock) OR (TG_OP = 'INSERT') THEN
        
        -- 1. Sync matching inventory record
        IF NEW.is_in_stock = true THEN
            INSERT INTO public.inventory (
                product_id, 
                warehouse_location, 
                quantity_available, 
                quantity_reserved, 
                last_restocked_at, 
                last_updated_by, 
                last_updated_at
            )
            VALUES (
                NEW.id, 
                'Varanasi Main Hub', 
                10, 
                0, 
                timezone('utc'::text, now()), 
                v_user_id, 
                timezone('utc'::text, now())
            )
            ON CONFLICT (product_id) DO UPDATE 
            SET quantity_available = CASE 
                    WHEN public.inventory.quantity_available = 0 THEN 10 
                    ELSE public.inventory.quantity_available 
                END,
                last_updated_by = v_user_id,
                last_updated_at = timezone('utc'::text, now());
        ELSE
            UPDATE public.inventory
            SET quantity_available = 0,
                last_updated_by = v_user_id,
                last_updated_at = timezone('utc'::text, now())
            WHERE product_id = NEW.id;
        END IF;

        -- 2. Auto-insert immutable audit log entry
        INSERT INTO public.inventory_audit_log (
            product_id,
            old_stock_status,
            new_stock_status,
            changed_by,
            changed_at
        )
        VALUES (
            NEW.id,
            CASE WHEN TG_OP = 'UPDATE' THEN OLD.is_in_stock ELSE NULL END,
            NEW.is_in_stock,
            v_user_id,
            timezone('utc'::text, now())
        );

    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER tr_product_stock_toggle
    AFTER INSERT OR UPDATE OF is_in_stock ON public.products
    FOR EACH ROW EXECUTE FUNCTION public.process_product_stock_toggle();

-- Logic B: Order Confirmation & Shipment Inventory Transition
CREATE OR REPLACE FUNCTION public.process_order_inventory_transition()
RETURNS TRIGGER AS $$
DECLARE
    item RECORD;
BEGIN
    -- Automatic Order Status History Trail
    IF (TG_OP = 'INSERT') OR (TG_OP = 'UPDATE' AND OLD.status IS DISTINCT FROM NEW.status) THEN
        INSERT INTO public.order_status_history (
            order_id,
            status,
            changed_by,
            changed_at,
            remarks
        )
        VALUES (
            NEW.id,
            NEW.status,
            auth.uid(),
            timezone('utc'::text, now()),
            'Status transitioned to ' || NEW.status::text
        );
    END IF;

    -- Inventory Reservation on Order Confirmation ('pending' -> 'confirmed')
    IF (TG_OP = 'UPDATE' AND OLD.status = 'pending' AND NEW.status = 'confirmed') THEN
        FOR item IN SELECT product_id, quantity FROM public.order_items WHERE order_id = NEW.id LOOP
            IF item.product_id IS NOT NULL THEN
                UPDATE public.inventory
                SET quantity_reserved = quantity_reserved + item.quantity,
                    last_updated_at = timezone('utc'::text, now())
                WHERE product_id = item.product_id;
            END IF;
        END LOOP;
    END IF;

    -- Stock Depletion on Shipment ('confirmed'/'processing' -> 'shipped')
    IF (TG_OP = 'UPDATE' AND OLD.status IN ('confirmed', 'processing') AND NEW.status = 'shipped') THEN
        FOR item IN SELECT product_id, quantity FROM public.order_items WHERE order_id = NEW.id LOOP
            IF item.product_id IS NOT NULL THEN
                UPDATE public.inventory
                SET quantity_available = GREATEST(0, quantity_available - item.quantity),
                    quantity_reserved = GREATEST(0, quantity_reserved - item.quantity),
                    last_updated_at = timezone('utc'::text, now())
                WHERE product_id = item.product_id;

                UPDATE public.products
                SET is_in_stock = false
                WHERE id = item.product_id 
                  AND (SELECT quantity_available FROM public.inventory WHERE product_id = item.product_id) = 0;
            END IF;
        END LOOP;
    END IF;

    -- Release Reserved Stock on Cancellation
    IF (TG_OP = 'UPDATE' AND OLD.status IN ('confirmed', 'processing') AND NEW.status = 'cancelled') THEN
        FOR item IN SELECT product_id, quantity FROM public.order_items WHERE order_id = NEW.id LOOP
            IF item.product_id IS NOT NULL THEN
                UPDATE public.inventory
                SET quantity_reserved = GREATEST(0, quantity_reserved - item.quantity),
                    last_updated_at = timezone('utc'::text, now())
                WHERE product_id = item.product_id;
            END IF;
        END LOOP;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER tr_order_inventory_transition
    AFTER INSERT OR UPDATE OF status ON public.orders
    FOR EACH ROW EXECUTE FUNCTION public.process_order_inventory_transition();

-- ============================================================================
-- 7. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_bulk_upload_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own profile or staff/admin view all"
    ON public.profiles FOR SELECT USING (auth.uid() = id OR public.is_staff_or_admin());

CREATE POLICY "Users update own profile"
    ON public.profiles FOR UPDATE USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "Public view active categories; Staff/Admin view all"
    ON public.categories FOR SELECT USING (status = 'active' OR public.is_staff_or_admin());

CREATE POLICY "Staff/Admin manage categories"
    ON public.categories FOR ALL USING (public.is_staff_or_admin());

CREATE POLICY "Public storefront views active in-stock products; Staff/Admin see all"
    ON public.products FOR SELECT USING ((status = 'active' AND is_in_stock = true) OR public.is_staff_or_admin());

CREATE POLICY "Staff/Admin manage products"
    ON public.products FOR ALL USING (public.is_staff_or_admin());

CREATE POLICY "Staff and Admin full access to inventory"
    ON public.inventory FOR ALL USING (public.is_staff_or_admin());

CREATE POLICY "Users access own cart items"
    ON public.cart_items FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Customers view own orders; Staff/Admin view all"
    ON public.orders FOR SELECT USING (auth.uid() = user_id OR public.is_staff_or_admin());

CREATE POLICY "Authenticated users create own orders"
    ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id OR public.is_staff_or_admin() OR user_id IS NULL);

CREATE POLICY "Staff/Admin update all orders; Customers update pending"
    ON public.orders FOR UPDATE USING (public.is_staff_or_admin() OR (auth.uid() = user_id AND status = 'pending'));

CREATE POLICY "Customers view own order items; Staff/Admin view all"
    ON public.order_items FOR SELECT USING (
        EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND (orders.user_id = auth.uid() OR public.is_staff_or_admin()))
    );

CREATE POLICY "Users insert items to own order; Staff/Admin insert to any"
    ON public.order_items FOR INSERT WITH CHECK (
        EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND (orders.user_id = auth.uid() OR public.is_staff_or_admin()))
    );

CREATE POLICY "Staff/Admin manage order items"
    ON public.order_items FOR ALL USING (public.is_staff_or_admin());

CREATE POLICY "Customers view own order history; Staff/Admin view all"
    ON public.order_status_history FOR SELECT USING (
        EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_status_history.order_id AND (orders.user_id = auth.uid() OR public.is_staff_or_admin()))
    );

CREATE POLICY "Staff/Admin manage order history"
    ON public.order_status_history FOR ALL USING (public.is_staff_or_admin());

CREATE POLICY "Staff/Admin view inventory audit logs"
    ON public.inventory_audit_log FOR SELECT USING (public.is_staff_or_admin());

CREATE POLICY "System and Staff insert inventory audit logs"
    ON public.inventory_audit_log FOR INSERT WITH CHECK (public.is_staff_or_admin() OR auth.uid() IS NOT NULL);

CREATE POLICY "Staff/Admin manage bulk upload logs"
    ON public.product_bulk_upload_log FOR ALL USING (public.is_staff_or_admin());
