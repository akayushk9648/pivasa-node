-- ============================================================================
-- PIVASA POWER SEED DATA
-- ============================================================================

DO $$
DECLARE
    v_admin_id UUID := 'a0000000-0000-0000-0000-000000000001'::uuid;
    v_customer_id UUID := 'c0000000-0000-0000-0000-000000000001'::uuid;
    
    v_cat_inv_batteries UUID := 'b0000000-0000-0000-0000-000000000001'::uuid;
    v_cat_ups UUID := 'b0000000-0000-0000-0000-000000000002'::uuid;
    v_cat_automotive UUID := 'b0000000-0000-0000-0000-000000000003'::uuid;
    
    v_prod_battery UUID := 'd0000000-0000-0000-0000-000000000001'::uuid;
    v_prod_inverter UUID := 'd0000000-0000-0000-0000-000000000002'::uuid;
    v_prod_ups UUID := 'd0000000-0000-0000-0000-000000000003'::uuid;
    
    v_order_id UUID := 'e0000000-0000-0000-0000-000000000001'::uuid;
BEGIN

    -- 1. Seed Categories
    INSERT INTO public.categories (id, category_name, description, status)
    VALUES 
    (v_cat_inv_batteries, 'Inverter Tubular Batteries', 'Heavy duty deep-cycle inverter backup batteries', 'active'),
    (v_cat_ups, 'Inverters & Home UPS', 'Pure sine wave inverters and computer UPS backup systems', 'active'),
    (v_cat_automotive, 'Automotive Batteries', 'Car, truck and motorcycle maintenance-free batteries', 'active')
    ON CONFLICT (id) DO NOTHING;

    -- 2. Seed Products
    INSERT INTO public.products (
        id, image_url, link, category_id, status, brand_series, brand_name, model_sku,
        capacity, voltage, plate_technology, total_warranty_months, foc_months, pro_rata_months,
        approx_mrp, detailed_layout, is_in_stock
    )
    VALUES 
    (
        v_prod_battery,
        'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80',
        'exide-inva-tubular-it500-150ah',
        v_cat_inv_batteries,
        'active',
        'Inva Tubular Heavy Duty',
        'Exide',
        'EX-IT500-150AH',
        '150 Ah',
        '12V',
        'Tall Tubular Technology',
        60, 36, 24,
        18500.00,
        '{"features": ["Thick tubular spine cast at 100 bar", "Low water loss technology", "Factory charged"]}'::jsonb,
        true
    ),
    (
        v_prod_inverter,
        'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=800&q=80',
        'luminous-eco-volt-neo-1050-sine-wave',
        v_cat_ups,
        'active',
        'Eco Volt Neo Series',
        'Luminous',
        'LUM-EV-NEO-1050',
        '900 VA / 756W',
        '12V DC / 230V AC',
        'Pure Sine Wave Microcontroller',
        24, 24, 0,
        7200.00,
        '{"features": ["Pure sine wave output", "Adaptive fast charging"]}'::jsonb,
        true
    ),
    (
        v_prod_ups,
        'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=800&q=80',
        'apc-back-ups-bx600c-in',
        v_cat_ups,
        'active',
        'Back-UPS Compact',
        'APC by Schneider Electric',
        'APC-BX600C-IN',
        '600 VA / 360W',
        '230V AC',
        'Sealed Maintenance Free (SMF)',
        24, 24, 0,
        3850.00,
        '{"features": ["Compact desktop UPS", "3 output sockets"]}'::jsonb,
        false
    )
    ON CONFLICT (id) DO NOTHING;

    -- 3. Adjust Inventory Quantities
    UPDATE public.inventory SET quantity_available = 25, reorder_level = 5 WHERE product_id = v_prod_battery;
    UPDATE public.inventory SET quantity_available = 15, reorder_level = 3 WHERE product_id = v_prod_inverter;

END $$;
