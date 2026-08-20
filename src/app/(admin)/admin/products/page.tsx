"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Edit3, Eye, ImagePlus, PackagePlus, Search, SlidersHorizontal, Trash2 } from "lucide-react";
import { AdminProduct, adminCategories, adminProducts, formatAdminPrice, type AdminCategory } from "@/lib/admin-data";

const emptyProduct: AdminProduct = {
  id: "",
  name: "",
  slug: "",
  category: "Home Decor",
  subcategory: "Decor",
  price: 0,
  stock: 0,
  reserved: 0,
  status: "draft",
  featured: false,
  image: "",
  sku: "",
  material: "",
  color: "",
  description: "",
  images: [],
};

function parseImageUrls(value: string) {
  return Array.from(new Set(value.split(/\r?\n/).map((url) => url.trim()).filter(Boolean)));
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState(adminProducts);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [editing, setEditing] = useState<AdminProduct | null>(null);
  const [categories, setCategories] = useState<AdminCategory[]>(adminCategories);
  const [notice, setNotice] = useState("");
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const loadProducts = () =>
    fetch("/api/admin/products")
      .then((response) => response.json())
      .then((payload) => {
        if (Array.isArray(payload.products)) setProducts(payload.products);
      })
      .catch(() => setNotice("Could not load Supabase products. Check admin login and database access."));

  const loadCategories = () =>
    fetch("/api/admin/categories", { cache: "no-store" })
      .then((response) => response.json())
      .then((payload) => {
        if (Array.isArray(payload.categories)) setCategories(payload.categories);
      })
      .catch(() => setNotice("Could not load Supabase categories. Check admin login and database access."));

  useEffect(() => {
    loadProducts();
    void loadCategories();
  }, []);

  const categoryOptions = useMemo(
    () =>
      categories.flatMap((category) => [
        { id: category.id, name: category.name },
        ...category.children.map((child) => ({ id: child.id, name: child.name })),
      ]),
    [categories],
  );

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesQuery = [product.name, product.sku, product.category].join(" ").toLowerCase().includes(query.toLowerCase());
      const matchesStatus = status === "all" || product.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [products, query, status]);

  const saveProduct = async () => {
    if (!editing) return;
    const selectedCategory = categoryOptions.find((category) => category.name === editing.category);
    const normalized = {
      ...editing,
      id: editing.id || undefined,
      slug: editing.slug || editing.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      sku: editing.sku || `RV-${Date.now().toString().slice(-5)}`,
      images: editing.images?.length ? editing.images : parseImageUrls(editing.image),
      image: editing.images?.[0] || editing.image || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
      reserved: editing.reserved || 0,
      category_id: selectedCategory?.id,
    };
    const response = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(normalized),
    });

    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      setNotice(payload?.error || "Supabase rejected the product save. Please review the fields and try again.");
      return;
    }

    await loadProducts();
    setNotice("Product saved to Supabase.");
    setEditing(null);
  };

  const removeProduct = async (id: string) => {
    const product = products.find((item) => item.id === id);
    if (!window.confirm(`Delete ${product?.name || "this product"}? This cannot be undone in production.`)) return;
    const response = await fetch(`/api/admin/products/${encodeURIComponent(id)}`, { method: "DELETE" }).catch(() => null);
    if (!response?.ok) {
      const payload = await response?.json().catch(() => null);
      setNotice(payload?.error || "Supabase rejected the product deletion. The product is still listed.");
      return;
    }
    setProducts((current) => current.filter((item) => item.id !== id));
    setNotice(`${product?.name || "Product"} deleted from Supabase.`);
  };

  const uploadProductImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !editing) return;
    const form = new FormData();
    form.append("file", file);
    form.append("bucket", "products");
    const response = await fetch("/api/admin/modules/media", { method: "POST", body: form });
    const payload = await response.json().catch(() => null);
    if (!response.ok) {
      setNotice(payload?.error || "Image upload failed.");
      return;
    }
    const images = Array.from(new Set([...(editing.images || []), payload.row.url]));
    setEditing({ ...editing, image: images[0], images });
    setNotice("Image uploaded and added to this product gallery draft.");
    event.target.value = "";
  };

  return (
    <div className="space-y-5">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#0d6b3f]">Catalog CMS</p>
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-semibold tracking-tight text-[#111] sm:text-5xl">Products</h1>
          <p className="mt-2 max-w-2xl text-sm text-neutral-500">
            Add products, assign categories, manage stock, variants, featured status and images. Writes go to Supabase when credentials are configured.
          </p>
          {notice && <p className="mt-2 text-xs font-semibold text-[#0d6b3f]">{notice}</p>}
        </div>
        <button
          onClick={() => {
            void loadCategories();
            setEditing(emptyProduct);
          }}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0d6b3f] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/20"
        >
          <PackagePlus className="h-4 w-4" />
          Add Product
        </button>
      </section>

      <section className="rounded-[28px] bg-white p-4 shadow-sm">
        <div className="grid gap-3 lg:grid-cols-[1fr_180px_180px]">
          <label className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="h-14 w-full rounded-[20px] bg-[#f4f6f3] pl-11 pr-4 text-sm outline-none ring-1 ring-black/5 focus:ring-[#0d6b3f]/30"
              placeholder="Search by product, SKU, category..."
            />
          </label>
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="h-14 rounded-[20px] bg-[#f4f6f3] px-4 text-sm outline-none ring-1 ring-black/5"
          >
            <option value="all">All status</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
          <button className="inline-flex h-14 items-center justify-center gap-2 rounded-[20px] border border-black/10 px-4 text-sm font-semibold">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </button>
        </div>
      </section>

      <section className="overflow-hidden rounded-[28px] bg-white shadow-sm">
        <div className="hidden grid-cols-[1.6fr_1fr_0.7fr_0.7fr_0.8fr_120px] border-b border-black/5 px-5 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-400 lg:grid">
          <span>Product</span>
          <span>Category</span>
          <span>Price</span>
          <span>Stock</span>
          <span>Status</span>
          <span className="text-right">Actions</span>
        </div>

        <div className="divide-y divide-black/5">
          {filteredProducts.map((product) => (
            <div key={product.id} className="grid gap-4 p-4 transition hover:bg-[#f8faf7] lg:grid-cols-[1.6fr_1fr_0.7fr_0.7fr_0.8fr_120px] lg:items-center lg:px-5">
              <div className="flex items-center gap-4">
                <img src={product.image} alt={product.name} className="h-16 w-16 rounded-2xl object-cover" />
                <div>
                  <p className="font-semibold text-[#111]">{product.name}</p>
                  <p className="text-xs text-neutral-500">{product.sku} - /{product.slug}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold">{product.category}</p>
                <p className="text-xs text-neutral-500">{product.subcategory}</p>
              </div>
              <p className="text-sm font-semibold">{formatAdminPrice(product.price)}</p>
              <div>
                <p className="text-sm font-semibold">{Math.max(0, product.stock - product.reserved)} available</p>
                <p className="text-xs text-neutral-500">{product.reserved} reserved</p>
              </div>
              <span className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${product.status === "active" ? "bg-[#e5f4ec] text-[#0d6b3f]" : "bg-neutral-100 text-neutral-500"}`}>
                {product.status}
              </span>
              <div className="flex items-center justify-end gap-1">
                <Link href={`/products/${product.slug}`} className="rounded-xl p-2 text-neutral-500 hover:bg-[#eef5f1] hover:text-[#0d6b3f]" aria-label={`View ${product.name}`}>
                  <Eye className="h-4 w-4" />
                </Link>
                <button onClick={() => {
                  void loadCategories();
                  setEditing(product);
                }} className="rounded-xl p-2 text-neutral-500 hover:bg-[#eef5f1] hover:text-[#0d6b3f]" type="button" aria-label={`Edit ${product.name}`}>
                  <Edit3 className="h-4 w-4" />
                </button>
                <button onClick={() => removeProduct(product.id)} className="rounded-xl p-2 text-neutral-500 hover:bg-red-50 hover:text-red-600" type="button" aria-label={`Delete ${product.name}`}>
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {editing && (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[30px] bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0d6b3f]">Product editor</p>
                <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-semibold">Create / Edit Product</h2>
              </div>
              <button onClick={() => setEditing(null)} className="rounded-full border border-black/10 px-4 py-2 text-sm font-semibold">Close</button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["name", "Product name"],
                ["slug", "Slug"],
                ["sku", "Product code"],
                ["material", "Material"],
                ["color", "Color"],
              ].map(([key, label]) => (
                <label key={key}>
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-neutral-400">{label}</span>
                  <input
                    aria-label={label}
                    value={String(editing[key as keyof AdminProduct] ?? "")}
                    onChange={(event) => setEditing({ ...editing, [key]: event.target.value })}
                    className="h-14 w-full rounded-2xl bg-[#f4f6f3] px-4 text-sm outline-none ring-1 ring-black/5 focus:ring-[#0d6b3f]/30"
                  />
                </label>
              ))}
              <label className="sm:col-span-2">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-neutral-400">Product description</span>
                <textarea
                  aria-label="Product description"
                  value={editing.description}
                  onChange={(event) => setEditing({ ...editing, description: event.target.value })}
                  className="min-h-28 w-full rounded-2xl bg-[#f4f6f3] px-4 py-3 text-sm outline-none ring-1 ring-black/5 focus:ring-[#0d6b3f]/30"
                  placeholder="Describe the product exactly as it should appear on the public product page."
                />
              </label>
              <label className="sm:col-span-2">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-neutral-400">Picture URLs</span>
                <textarea
                  aria-label="Picture URLs"
                  value={(editing.images?.length ? editing.images : [editing.image]).filter(Boolean).join("\n")}
                  onChange={(event) => {
                    const images = parseImageUrls(event.target.value);
                    setEditing({ ...editing, images, image: images[0] || "" });
                  }}
                  className="min-h-28 w-full rounded-2xl bg-[#f4f6f3] px-4 py-3 text-sm outline-none ring-1 ring-black/5 focus:ring-[#0d6b3f]/30"
                  placeholder="One picture URL per line. The first picture is the primary product image."
                />
              </label>
              <label>
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-neutral-400">Category</span>
                <select
                  aria-label="Category"
                  value={editing.category}
                  onChange={(event) => setEditing({ ...editing, category: event.target.value })}
                  className="h-14 w-full rounded-2xl bg-[#f4f6f3] px-4 text-sm outline-none ring-1 ring-black/5"
                >
                  {categoryOptions.map((category) => (
                    <option key={category.id}>{category.name}</option>
                  ))}
                </select>
              </label>
              <label>
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-neutral-400">Status</span>
                <select
                  aria-label="Status"
                  value={editing.status}
                  onChange={(event) => setEditing({ ...editing, status: event.target.value as AdminProduct["status"] })}
                  className="h-14 w-full rounded-2xl bg-[#f4f6f3] px-4 text-sm outline-none ring-1 ring-black/5"
                >
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </label>
              <label>
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-neutral-400">Price</span>
                <input
                  aria-label="Price"
                  type="number"
                  value={editing.price}
                  onChange={(event) => setEditing({ ...editing, price: Number(event.target.value) })}
                  className="h-14 w-full rounded-2xl bg-[#f4f6f3] px-4 text-sm outline-none ring-1 ring-black/5"
                />
              </label>
              <label>
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-neutral-400">Stock</span>
                <input
                  aria-label="Stock"
                  type="number"
                  value={editing.stock}
                  onChange={(event) => setEditing({ ...editing, stock: Number(event.target.value) })}
                  className="h-14 w-full rounded-2xl bg-[#f4f6f3] px-4 text-sm outline-none ring-1 ring-black/5"
                />
              </label>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
              <button
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-dashed border-black/20 px-5 py-4 text-sm font-semibold text-neutral-500"
                type="button"
                onClick={() => imageInputRef.current?.click()}
              >
                <ImagePlus className="h-4 w-4" />
                Upload images via Supabase Storage
              </button>
              <input ref={imageInputRef} type="file" accept="image/*" className="hidden" onChange={uploadProductImage} />
              <button onClick={saveProduct} className="rounded-2xl bg-[#0d6b3f] px-7 py-4 text-sm font-semibold text-white">
                Save Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
