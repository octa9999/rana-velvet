import { NextResponse } from "next/server";
import { createAdminSupabase } from "@/lib/supabase/server";

export async function GET() {
  const fallback = {
    business_name: "Rana Velvet",
    showroom_address: "D Ground, Faisalabad",
    business_phone: "+92 300 1234567",
  };

  const supabase = createAdminSupabase();
  if (!supabase) return NextResponse.json({ settings: fallback });

  const { data, error } = await supabase.from("site_settings").select("key, value");
  if (error) return NextResponse.json({ settings: fallback });

  return NextResponse.json({
    settings: { ...fallback, ...Object.fromEntries((data || []).map((row) => [row.key, row.value])) },
  });
}
