import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { createAdminSupabase } from "@/lib/supabase/server";

function parseCsv(text: string) {
  const lines = text.split(/\r?\n/).filter(Boolean);
  const headers = lines.shift()?.split(",").map((item) => item.trim()) || [];
  return lines.map((line) => {
    const values = line.split(",").map((item) => item.trim().replace(/^"|"$/g, ""));
    return Object.fromEntries(headers.map((header, index) => [header, values[index] || ""]));
  });
}

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const supabase = createAdminSupabase();
  if (!supabase) return NextResponse.json({ error: "Supabase admin client is not configured" }, { status: 503 });

  const form = await request.formData();
  const file = form.get("file");
  const target = String(form.get("target") || "products");
  if (!(file instanceof File)) return NextResponse.json({ error: "CSV file is required" }, { status: 400 });
  if (!["products", "categories"].includes(target)) return NextResponse.json({ error: "Only products and categories imports are supported" }, { status: 400 });

  const rows = parseCsv(await file.text());
  const payload = rows.map((row) =>
    target === "products"
      ? {
          name: row.name,
          slug: row.slug || row.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
          price: Number(row.price || 0),
          sku: row.sku,
          category_name: row.category || row.category_name,
          subcategory: row.subcategory,
          image_url: row.image || row.image_url,
          stock_quantity: Number(row.stock || row.stock_quantity || 0),
          stock: Number(row.stock || row.stock_quantity || 0),
          is_active: row.status !== "archived",
          status: row.status || "active",
        }
      : {
          name: row.name,
          slug: row.slug || row.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
          image_url: row.image || row.image_url,
          sort_order: Number(row.sort_order || 0),
          is_active: row.status !== "inactive",
        }
  );

  const { data, error } = await supabase.from(target).upsert(payload, { onConflict: "slug" }).select("*");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ imported: data?.length || 0, rows: data || [] });
}
