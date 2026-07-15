import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { createAdminSupabase } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const supabase = createAdminSupabase();
  if (!supabase) return NextResponse.json({ error: "Supabase admin client is not configured" }, { status: 503 });

  const query = new URL(request.url).searchParams.get("q")?.trim() || "";
  if (query.length < 2) return NextResponse.json({ results: [] });

  const pattern = `%${query}%`;
  const [products, categories, orders, inquiries, appointments] = await Promise.all([
    supabase.from("products").select("id, name, slug").or(`name.ilike.${pattern},sku.ilike.${pattern},slug.ilike.${pattern}`).limit(5),
    supabase.from("categories").select("id, name, slug").or(`name.ilike.${pattern},slug.ilike.${pattern}`).limit(5),
    supabase.from("orders").select("id, order_number, customer_name").or(`order_number.ilike.${pattern},customer_name.ilike.${pattern},customer_phone.ilike.${pattern}`).limit(5),
    supabase.from("inquiries").select("id, name, email, subject").or(`name.ilike.${pattern},email.ilike.${pattern},subject.ilike.${pattern}`).limit(5),
    supabase.from("appointments").select("id, name, email, service").or(`name.ilike.${pattern},email.ilike.${pattern},service.ilike.${pattern}`).limit(5),
  ]);

  const results = [
    ...(products.data || []).map((row) => ({ type: "Product", label: row.name, href: `/admin/products`, meta: row.slug })),
    ...(categories.data || []).map((row) => ({ type: "Category", label: row.name, href: `/admin/categories`, meta: row.slug })),
    ...(orders.data || []).map((row) => ({ type: "Order", label: row.order_number, href: `/admin/orders`, meta: row.customer_name })),
    ...(inquiries.data || []).map((row) => ({ type: "Inquiry", label: row.name, href: `/admin/inquiries`, meta: row.subject || row.email })),
    ...(appointments.data || []).map((row) => ({ type: "Appointment", label: row.name, href: `/admin/appointments`, meta: row.service || row.email })),
  ];

  return NextResponse.json({ results });
}
