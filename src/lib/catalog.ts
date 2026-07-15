import { adminCategories, adminProducts, type AdminCategory, type AdminProduct } from "@/lib/admin-data";
import { createAdminSupabase, createServerSupabase } from "@/lib/supabase/server";

export type CatalogProduct = AdminProduct & {
  description: string;
  shortDescription: string;
  images: string[];
  details: string[];
  dimensions: { width: string; depth: string; height: string };
  weight: string;
  colors: string[];
  rating: number;
  reviews: number;
};

type ProductImageRow = {
  url?: string;
  image_url?: string;
  sort_order?: number;
};

type ProductRow = Record<string, unknown> & {
  id: string;
  name: string;
  slug: string;
  price?: number;
  product_images?: ProductImageRow[];
  categories?: { name?: string; slug?: string };
  category?: { name?: string; slug?: string };
};

type CategoryRow = Record<string, unknown> & {
  id: string;
  name: string;
  slug: string;
  children?: CategoryRow[];
};

export type CatalogCategory = AdminCategory & {
  parent_id?: string | null;
  is_active?: boolean;
  sort_order?: number;
};

const fallbackDetails = [
  "Premium upholstery with high-density cushioning",
  "Solid wood frame with reinforced joints",
  "Made to order finishes available from the showroom",
  "Carefully packed for delivery",
];

export const fallbackProducts: CatalogProduct[] = adminProducts.map((product) => ({
  ...product,
  description: product.material,
  shortDescription: `${product.name} finished in ${product.material.toLowerCase()} for a refined Rana Velvet interior.`,
  images: [product.image],
  details: fallbackDetails,
  dimensions: { width: "Custom", depth: "Custom", height: "Custom" },
  weight: "Made to order",
  colors: [product.color, "Ivory", "Charcoal", "Champagne"],
  rating: 4.8,
  reviews: 0,
}));

export const fallbackCategories: CatalogCategory[] = adminCategories.map((category, index) => ({
  ...category,
  is_active: true,
  sort_order: index,
}));

function asString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function asNumber(value: unknown, fallback = 0) {
  return typeof value === "number" ? value : Number(value ?? fallback);
}

function productFromRow(row: ProductRow): CatalogProduct {
  const imageRows = Array.isArray(row.product_images) ? row.product_images : [];
  const images = imageRows
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
    .map((image) => image.url || image.image_url)
    .filter((url): url is string => Boolean(url));
  const primaryImage = images[0] || asString(row.image_url) || asString(row.thumbnail_url) || fallbackProducts[0].image;
  const categoryName =
    row.categories?.name ||
    row.category?.name ||
    asString(row.category_name) ||
    "Furniture";

  return {
    id: String(row.id),
    name: row.name,
    slug: row.slug,
    category: categoryName,
    subcategory: asString(row.subcategory, categoryName),
    price: asNumber(row.price),
    stock: asNumber(row.stock ?? row.stock_quantity),
    reserved: asNumber(row.reserved_stock),
    status: asString(row.status, row.is_active ? "active" : "draft") as AdminProduct["status"],
    featured: Boolean(row.featured || row.is_featured),
    image: primaryImage,
    sku: asString(row.sku),
    material: asString(row.material),
    color: asString(row.color),
    description: asString(row.description),
    shortDescription: asString(row.short_description) || asString(row.description),
    images: images.length ? images : [primaryImage],
    details: Array.isArray(row.details) ? row.details.map((detail) => String(detail)) : fallbackDetails,
    dimensions:
      typeof row.dimensions === "object" && row.dimensions
        ? (row.dimensions as CatalogProduct["dimensions"])
        : { width: asString(row.width, "Custom"), depth: asString(row.depth, "Custom"), height: asString(row.height, "Custom") },
    weight: asString(row.weight, "Made to order"),
    colors: Array.isArray(row.colors) && row.colors.length ? row.colors.map((color) => String(color)) : [asString(row.color, "Custom")],
    rating: asNumber(row.rating, 4.8),
    reviews: asNumber(row.reviews),
  };
}

function categoryFromRow(row: CategoryRow): CatalogCategory {
  return {
    id: String(row.id),
    name: row.name,
    slug: row.slug,
    count: asNumber(row.products_count ?? row.count),
    image: asString(row.image_url) || asString(row.image),
    parent_id: asString(row.parent_id) || null,
    is_active: Boolean(row.is_active ?? true),
    sort_order: asNumber(row.sort_order),
    children: Array.isArray(row.children)
      ? row.children.map((child) => ({
          id: String(child.id),
          name: child.name,
          slug: child.slug,
          count: Number(child.products_count ?? child.count ?? 0),
        }))
      : [],
  };
}

export async function listProducts(options: { featured?: boolean; activeOnly?: boolean } = {}) {
  const supabase = await createServerSupabase();
  if (!supabase) {
    return fallbackProducts.filter((product) => !options.featured || product.featured);
  }

  let query = supabase
    .from("products")
    .select("*, categories(name, slug), product_images(*)")
    .order("order_index", { ascending: true })
    .order("created_at", { ascending: false });

  if (options.activeOnly !== false) query = query.eq("is_active", true);
  if (options.featured) query = query.eq("is_featured", true);

  const { data, error } = await query;
  if (error || !data) {
    console.error("Product list failed", error);
    return fallbackProducts.filter((product) => !options.featured || product.featured);
  }

  return data.map(productFromRow);
}

export async function getProductBySlug(slug: string) {
  const supabase = await createServerSupabase();
  if (!supabase) {
    return fallbackProducts.find((product) => product.slug === slug) ?? null;
  }

  const { data, error } = await supabase
    .from("products")
    .select("*, categories(name, slug), product_images(*)")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) {
    return fallbackProducts.find((product) => product.slug === slug) ?? null;
  }

  return productFromRow(data);
}

export async function listCategories() {
  const supabase = await createServerSupabase();
  if (!supabase) return fallbackCategories;

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  if (error || !data) {
    console.error("Category list failed", error);
    return fallbackCategories;
  }

  const categories = data.map(categoryFromRow);
  const byParent = new Map<string | null, CatalogCategory[]>();
  categories.forEach((category) => {
    const parent = category.parent_id ?? null;
    byParent.set(parent, [...(byParent.get(parent) || []), category]);
  });

  return (byParent.get(null) || categories.filter((category) => !category.parent_id)).map((category) => ({
    ...category,
    children: (byParent.get(category.id) || []).map((child) => ({
      id: child.id,
      name: child.name,
      slug: child.slug,
      count: child.count,
    })),
  }));
}

export async function upsertProduct(input: Partial<CatalogProduct> & { name: string; slug: string }) {
  const supabase = createAdminSupabase();
  if (!supabase) {
    return { data: { ...fallbackProducts[0], ...input, id: input.id || crypto.randomUUID() }, error: null };
  }

  const payload = {
    id: input.id,
    name: input.name,
    slug: input.slug,
    description: input.description,
    short_description: input.shortDescription,
    price: input.price,
    category_id: (input as Record<string, unknown>).category_id || null,
    category_name: input.category,
    subcategory: input.subcategory,
    sku: input.sku,
    material: input.material,
    color: input.color,
    colors: input.colors,
    dimensions: input.dimensions,
    details: input.details,
    image_url: input.image,
    thumbnail_url: input.image,
    seo_title: (input as Record<string, unknown>).seo_title,
    seo_description: (input as Record<string, unknown>).seo_description,
    status: input.status || "active",
    is_active: input.status !== "archived" && input.status !== "draft" && Number(input.stock ?? 0) - Number(input.reserved ?? 0) > 0,
    is_featured: input.featured,
    featured: input.featured,
    stock_quantity: input.stock,
    stock: input.stock,
    reserved_stock: input.reserved,
    stock_status: Number(input.stock ?? 0) - Number(input.reserved ?? 0) <= 0 ? "out_of_stock" : "in_stock",
  };

  const { data, error } = await supabase.from("products").upsert(payload).select().single();
  if (!error && data && input.image) {
    await supabase.from("product_images").delete().eq("product_id", data.id).eq("is_primary", true);
    await supabase.from("product_images").insert({
        product_id: data.id,
        url: input.image,
        image_url: input.image,
        alt_text: input.name,
        is_primary: true,
        sort_order: 0,
      });
  }
  return { data, error };
}

export async function deleteProduct(id: string) {
  const supabase = createAdminSupabase();
  if (!supabase) return { error: null };
  const { error } = await supabase.from("products").delete().eq("id", id);
  return { error };
}

export async function upsertCategory(input: Partial<CatalogCategory> & { name: string; slug: string }) {
  const supabase = createAdminSupabase();
  if (!supabase) {
    return { data: { ...fallbackCategories[0], ...input, id: input.id || crypto.randomUUID() }, error: null };
  }

  const payload = {
    id: input.id,
    name: input.name,
    slug: input.slug,
    image_url: input.image,
    parent_id: input.parent_id || null,
    is_active: input.is_active ?? true,
    sort_order: input.sort_order ?? 0,
  };

  const { data, error } = await supabase.from("categories").upsert(payload).select().single();
  return { data, error };
}

export async function deleteCategory(id: string) {
  const supabase = createAdminSupabase();
  if (!supabase) return { error: null };
  const { error } = await supabase.from("categories").delete().eq("id", id);
  return { error };
}
