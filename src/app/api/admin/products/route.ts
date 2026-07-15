import { NextResponse } from "next/server";
import { z, ZodError } from "zod";
import { requireAdmin } from "@/lib/admin-auth";
import { listProducts, upsertProduct } from "@/lib/catalog";

const adminProductSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  slug: z.string().min(1),
  category_id: z.string().nullable().optional(),
  category: z.string().optional(),
  subcategory: z.string().optional(),
  price: z.number().nonnegative(),
  stock: z.number().int().nonnegative().optional(),
  reserved: z.number().int().nonnegative().optional(),
  status: z.enum(["active", "draft", "archived"]),
  featured: z.boolean().optional(),
  image: z.string().optional(),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  details: z.array(z.string()).optional(),
  colors: z.array(z.string()).optional(),
  seo_title: z.string().optional(),
  seo_description: z.string().optional(),
  sku: z.string().optional(),
  material: z.string().optional(),
  color: z.string().optional(),
});

export async function GET() {
  const auth = await requireAdmin();
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });
  const products = await listProducts({ activeOnly: false });
  return NextResponse.json({ products });
}

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  try {
    const product = adminProductSchema.parse(await request.json());
    const { data, error } = await upsertProduct(product);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ product: data ?? product });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: "Invalid product", details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Product save failed" }, { status: 500 });
  }
}
