import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { createAdminSupabase } from "@/lib/supabase/server";

type ActivityRow = {
  id: string;
  created_at?: string;
  title: string;
  message: string;
  type: "appointment" | "inquiry" | "order";
  href: string;
};

export async function GET() {
  const auth = await requireAdmin();
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const supabase = createAdminSupabase();
  if (!supabase) return NextResponse.json({ error: "Supabase admin client is not configured" }, { status: 503 });

  const [appointments, inquiries, orders] = await Promise.all([
    supabase.from("appointments").select("id, name, service, created_at, status").order("created_at", { ascending: false }).limit(5),
    supabase.from("inquiries").select("id, name, subject, created_at, status").order("created_at", { ascending: false }).limit(5),
    supabase.from("orders").select("id, order_number, customer_name, total, created_at, fulfillment_status").order("created_at", { ascending: false }).limit(5),
  ]);

  const rows: ActivityRow[] = [
    ...(appointments.data || []).map((row) => ({
      id: `appointment-${row.id}`,
      created_at: row.created_at,
      type: "appointment" as const,
      href: "/admin/appointments",
      title: "New appointment",
      message: `${row.name} booked ${row.service || "a consultation"}`,
    })),
    ...(inquiries.data || []).map((row) => ({
      id: `inquiry-${row.id}`,
      created_at: row.created_at,
      type: "inquiry" as const,
      href: "/admin/inquiries",
      title: "New inquiry",
      message: `${row.name}${row.subject ? ` asked about ${row.subject}` : " sent a message"}`,
    })),
    ...(orders.data || []).map((row) => ({
      id: `order-${row.id}`,
      created_at: row.created_at,
      type: "order" as const,
      href: "/admin/orders",
      title: "New order",
      message: `${row.order_number} by ${row.customer_name}`,
    })),
  ];

  rows.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());
  return NextResponse.json({ notifications: rows.slice(0, 8) });
}
