import { createClient } from "@/utils/supabase/client";
import { Order, OrderStatus } from "@/types/database";

export async function getOrders(): Promise<Order[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("orders")
      .select("*, items:order_items(*, product:products(*)), status_history:order_status_history(*)")
      .order("created_at", { ascending: false });

    if (error || !data) {
      return [];
    }
    return data as Order[];
  } catch (err) {
    return [];
  }
}

export async function getOrderById(orderId: string): Promise<Order | null> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("orders")
      .select("*, items:order_items(*, product:products(*)), status_history:order_status_history(*)")
      .eq("id", orderId)
      .single();

    if (error || !data) {
      return null;
    }
    return data as Order;
  } catch (err) {
    return null;
  }
}

export async function updateOrderStatus(orderId: string, status: OrderStatus, remarks?: string): Promise<boolean> {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", orderId);

    if (error) throw error;
    return true;
  } catch (err) {
    console.error("Failed to update order status:", err);
    return false;
  }
}
