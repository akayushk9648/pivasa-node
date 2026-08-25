import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function POST() {
  const cookieStore = cookies();
  cookieStore.delete("pivasa_admin_session");

  try {
    const supabase = createClient();
    await supabase.auth.signOut();
  } catch (err) {
    // Ignore
  }

  return redirect("/login");
}

export async function GET() {
  const cookieStore = cookies();
  cookieStore.delete("pivasa_admin_session");

  try {
    const supabase = createClient();
    await supabase.auth.signOut();
  } catch (err) {
    // Ignore
  }

  return redirect("/login");
}
