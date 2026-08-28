import { createClient } from "@/utils/supabase/client";
import { Category } from "@/types/database";

export const SAMPLE_CATEGORIES: Category[] = [
  {
    id: "b0000000-0000-0000-0000-000000000001",
    category_name: "Inverter Tubular Batteries",
    description: "Heavy duty deep-cycle tall tubular & short tubular backup batteries",
    status: "active",
    created_at: new Date().toISOString(),
  },
  {
    id: "b0000000-0000-0000-0000-000000000002",
    category_name: "Inverters & Home UPS",
    description: "Pure sine wave inverters, copper transformer systems & lithium smart UPS",
    status: "active",
    created_at: new Date().toISOString(),
  },
  {
    id: "b0000000-0000-0000-0000-000000000003",
    category_name: "Car & Passenger Vehicle Batteries",
    description: "Passenger cars, luxury AGM, micro-hybrid ISS, and taxi fleet batteries",
    status: "active",
    created_at: new Date().toISOString(),
  },
  {
    id: "b0000000-0000-0000-0000-000000000004",
    category_name: "Two Wheeler Batteries",
    description: "Factory-charged AGM VRLA motorcycle & scooter starter batteries",
    status: "active",
    created_at: new Date().toISOString(),
  },
  {
    id: "b0000000-0000-0000-0000-000000000005",
    category_name: "Commercial & Heavy Vehicle Batteries",
    description: "Multi-axle trucks, trailers, buses, earthmovers, and farm tractors",
    status: "active",
    created_at: new Date().toISOString(),
  },
  {
    id: "b0000000-0000-0000-0000-000000000006",
    category_name: "Three Wheeler & E-Rickshaw Batteries",
    description: "Auto-rickshaws, cargo loaders, and deep-cycle tubular e-rickshaws",
    status: "active",
    created_at: new Date().toISOString(),
  },
  {
    id: "b0000000-0000-0000-0000-000000000007",
    category_name: "Genset & Solar Batteries",
    description: "Diesel generator instant high-CCA starting and Solar C10 deep-cycle storage",
    status: "active",
    created_at: new Date().toISOString(),
  },
  {
    id: "b0000000-0000-0000-0000-000000000008",
    category_name: "Industrial & Standby Power",
    description: "Powersafe SMF VRLA, 2V deep standby power cells, and Plante battery banks",
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
