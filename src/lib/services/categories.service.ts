import { createClient } from "@/utils/supabase/client";
import { Category } from "@/types/database";

export const SAMPLE_CATEGORIES: Category[] = [
  {
    id: "b0000000-0000-0000-0000-000000000001",
    category_name: "Inverter Tubular Batteries",
    description: "Heavy duty deep-cycle inverter backup batteries",
    status: "active",
    created_at: new Date().toISOString(),
  },
  {
    id: "b0000000-0000-0000-0000-000000000002",
    category_name: "Inverters & Home UPS",
    description: "Pure sine wave inverters and computer UPS backup systems",
    status: "active",
    created_at: new Date().toISOString(),
  },
  {
    id: "b0000000-0000-0000-0000-000000000003",
    category_name: "Automotive Batteries",
    description: "Car, truck and motorcycle maintenance-free batteries",
    status: "active",
    created_at: new Date().toISOString(),
  },
];

export async function getCategories(): Promise<Category[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("status", "active")
      .order("category_name");

    if (error || !data || data.length === 0) {
      return SAMPLE_CATEGORIES;
    }
    return data as Category[];
  } catch (err) {
    return SAMPLE_CATEGORIES;
  }
}
