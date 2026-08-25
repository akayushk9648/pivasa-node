import { createClient } from "@/utils/supabase/client";
import { Inventory } from "@/types/database";

export async function getInventoryList(): Promise<any[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("inventory")
      .select("*, product:products(*)")
      .order("quantity_available", { ascending: true });

    if (error || !data) {
      return [];
    }
    return data;
  } catch (err) {
    return [];
  }
}

export async function updateProductStockToggle(productId: string, inStock: boolean): Promise<boolean> {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("products")
      .update({ is_in_stock: inStock })
      .eq("id", productId);

    if (error) throw error;
    return true;
  } catch (err) {
    console.error("Failed to toggle stock status:", err);
    return false;
  }
}

export async function updateInventoryQuantity(productId: string, quantity: number, warehouseLocation?: string): Promise<boolean> {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("inventory")
      .upsert({
        product_id: productId,
        quantity_available: quantity,
        warehouse_location: warehouseLocation || "Varanasi Main Hub",
        last_restocked_at: new Date().toISOString(),
      }, { onConflict: "product_id" });

    if (error) throw error;
    return true;
  } catch (err) {
    console.error("Failed to update inventory quantity:", err);
    return false;
  }
}
