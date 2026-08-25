export type UserRole = 'customer' | 'staff' | 'admin';
export type ProductStatus = 'active' | 'inactive' | 'discontinued';
export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'unpaid' | 'paid' | 'refunded' | 'failed';
export type UploadStatus = 'processing' | 'completed' | 'failed';

export interface Profile {
  id: string;
  full_name: string;
  phone?: string | null;
  role: UserRole;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    pincode?: string;
    landmark?: string;
  } | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  category_name: string;
  parent_category_id?: string | null;
  description?: string | null;
  image_url?: string | null;
  status: 'active' | 'inactive';
  created_at: string;
}

export interface DetailedProductLayout {
  dimensions_mm?: {
    length?: number;
    width?: number;
    height?: number;
  };
  filled_weight_kg?: number;
  weight_kg?: number;
  electrolyte_volume_litres?: number;
  terminal_type?: string;
  battery_type?: string;
  recommended_inverter_va?: string;
  display_type?: string;
  max_charging_current_amp?: number;
  supported_battery_types?: string[];
  recharge_time_hours?: number;
  output_receptacles?: number;
  backup_time_desktop_pc_mins?: number;
  tags?: string[];
  features?: string[];
}

export interface Product {
  id: string;
  image_url?: string | null;
  link: string; // unique slug
  category_id?: string | null;
  status: ProductStatus;
  brand_series?: string | null;
  brand_name: string;
  model_sku: string;
  capacity?: string | null; // e.g. "150 Ah", "1100 VA"
  voltage?: string | null;  // e.g. "12V", "24V"
  plate_technology?: string | null; // e.g. "Tall Tubular", "Flat Plate"
  total_warranty_months: number;
  foc_months: number;
  pro_rata_months: number;
  approx_mrp: number;
  detailed_layout?: DetailedProductLayout | null;
  is_in_stock: boolean;
  created_by?: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  category?: Category | null;
  inventory?: Inventory | null;
}

export interface Inventory {
  id: string;
  product_id: string;
  warehouse_location: string;
  quantity_available: number;
  quantity_reserved: number;
  reorder_level: number;
  last_restocked_at?: string | null;
  last_updated_by?: string | null;
  last_updated_at: string;
}

export interface CartItem {
  id: string;
  user_id?: string | null;
  product_id: string;
  quantity: number;
  added_at: string;
  product?: Product;
}

export interface OrderAddress {
  full_name: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
}

export interface Order {
  id: string;
  user_id?: string | null;
  order_date: string;
  status: OrderStatus;
  payment_status: PaymentStatus;
  payment_method: string;
  shipping_address: OrderAddress;
  billing_address?: OrderAddress | null;
  subtotal: number;
  tax: number;
  shipping_charge: number;
  total_amount: number;
  created_at: string;
  items?: OrderItem[];
  status_history?: OrderStatusHistory[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id?: string | null;
  quantity: number;
  price_at_purchase: number;
  warranty_applicable: string;
  product?: Product;
}

export interface OrderStatusHistory {
  id: string;
  order_id: string;
  status: OrderStatus;
  changed_by?: string | null;
  changed_at: string;
  remarks?: string | null;
}

export interface InventoryAuditLog {
  id: string;
  product_id: string;
  old_stock_status?: boolean | null;
  new_stock_status: boolean;
  changed_by?: string | null;
  changed_at: string;
}

export interface ProductBulkUploadLog {
  id: string;
  uploaded_by?: string | null;
  file_name: string;
  upload_date: string;
  total_rows: number;
  success_count: number;
  failed_count: number;
  error_log?: Array<{
    sku?: string;
    error_message?: string;
    raw_data?: any;
  }> | null;
  status: UploadStatus;
}
