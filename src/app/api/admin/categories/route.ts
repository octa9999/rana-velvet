import { NextResponse } from "next/server";
import { z, ZodError } from "zod";
import { requireAdmin } from "@/lib/admin-auth";
import { listCategories, upsertCategory } from "@/lib/catalog";

const adminCategorySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  slug: z.string().min(1),
  image: z.string().optional(),
  parent_id: z.string().nullable().optional(),
  is_active: z.boolean().optional(),
  sort_order: z.number().int().optional(),
});

export async function GET() {
  const auth = await requireAdmin();
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });
  const categories = await listCategories();
  return NextResponse.json({ categories });
}

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  try {
    const category = adminCategorySchema.parse(await request.json());
    const { data, error } = await upsertCategory(category);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ category: data ?? category });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: "Invalid category", details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Category save failed" }, { status: 500 });
  }
}
