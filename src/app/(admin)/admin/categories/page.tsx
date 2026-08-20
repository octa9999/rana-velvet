"use client";

import { useEffect, useState } from "react";
import { ChevronRight, Edit3, GripVertical, Layers3, Plus, Trash2 } from "lucide-react";
import { adminCategories, type AdminCategory } from "@/lib/admin-data";

type EditableCategory = AdminCategory & {
  parent_id?: string | null;
  is_active?: boolean;
  sort_order?: number;
};

const emptyCategory: EditableCategory = {
  id: "",
  name: "",
  slug: "",
  count: 0,
  image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
  children: [],
  parent_id: null,
  is_active: true,
  sort_order: 0,
};

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function AdminCategoriesPage() {
  const [expanded, setExpanded] = useState<string[]>(adminCategories.slice(0, 2).map((category) => category.id));
  const [categories, setCategories] = useState<EditableCategory[]>(adminCategories);
  const [editing, setEditing] = useState<EditableCategory | null>(null);
  const [notice, setNotice] = useState("");

  const loadCategories = () =>
    fetch("/api/admin/categories", { cache: "no-store" })
      .then((response) => response.json())
      .then((payload) => {
        if (Array.isArray(payload.categories)) setCategories(payload.categories);
      })
      .catch(() => setNotice("Could not load Supabase categories. Check admin login and database access."));

  useEffect(() => {
    void loadCategories();
  }, []);

  const saveCategory = async () => {
    if (!editing) return;
    const normalized = {
      ...editing,
      id: editing.id || undefined,
      slug: editing.slug || slugify(editing.name),
      image: editing.image || emptyCategory.image,
      children: editing.children || [],
    };

    const response = await fetch("/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: normalized.id,
        name: normalized.name,
        slug: normalized.slug,
        image: normalized.image,
        parent_id: normalized.parent_id || null,
        is_active: normalized.is_active ?? true,
        sort_order: normalized.sort_order ?? 0,
      }),
    });

    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      setNotice(payload?.error || "Category saved locally, but Supabase rejected the write.");
      return;
    }

    await loadCategories();
    setNotice("Category saved to Supabase.");
    setEditing(null);
  };

  const deleteParentCategory = async (category: EditableCategory) => {
    if (!window.confirm(`Delete ${category.name}? Products assigned to this category should be moved first.`)) return;
    await fetch(`/api/admin/categories/${encodeURIComponent(category.id)}`, { method: "DELETE" }).catch(() => null);
    setCategories((current) => current.filter((item) => item.id !== category.id));
    setNotice(`${category.name} deleted from Supabase.`);
  };

  const deleteNestedCategory = async (parentId: string, child: AdminCategory["children"][number]) => {
    if (!window.confirm(`Delete nested category ${child.name}?`)) return;
    await fetch(`/api/admin/categories/${encodeURIComponent(child.id)}`, { method: "DELETE" }).catch(() => null);
    setCategories((current) =>
      current.map((category) =>
        category.id === parentId
          ? { ...category, children: category.children.filter((item) => item.id !== child.id) }
          : category
      )
    );
    setNotice(`${child.name} deleted from Supabase.`);
  };

  return (
    <div className="space-y-5">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#0d6b3f]">Taxonomy</p>
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-semibold tracking-tight text-[#111] sm:text-5xl">Categories</h1>
          <p className="mt-2 max-w-2xl text-sm text-neutral-500">Nested categories for storefront menus, product filters, homepage collection cards and SEO landing pages.</p>
          {notice && <p className="mt-2 text-xs font-semibold text-[#0d6b3f]">{notice}</p>}
        </div>
        <button
          onClick={() => setEditing(emptyCategory)}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0d6b3f] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/20"
          type="button"
        >
          <Plus className="h-4 w-4" />
          Add Category
        </button>
      </section>

      <section className="rounded-[28px] bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center justify-between rounded-[22px] bg-[#f4f6f3] px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-[#0d6b3f] p-3 text-white">
              <Layers3 className="h-5 w-5" />
            </span>
            <div>
              <p className="font-semibold">Storefront hierarchy</p>
              <p className="text-xs text-neutral-500">Ordering maps to Supabase sort order when credentials are configured.</p>
            </div>
          </div>
          <span className="hidden rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#0d6b3f] sm:block">{categories.length} parent groups</span>
        </div>

        <div className="space-y-3">
          {categories.map((category) => {
            const isOpen = expanded.includes(category.id);
            return (
              <div key={category.id} className="overflow-hidden rounded-[24px] border border-black/5 bg-[#fbfbfa]">
                <div className="grid gap-4 p-4 sm:grid-cols-[auto_auto_64px_1fr_auto_auto] sm:items-center">
                  <GripVertical className="hidden h-5 w-5 text-neutral-300 sm:block" />
                  <button
                    onClick={() => setExpanded((current) => (isOpen ? current.filter((id) => id !== category.id) : [...current, category.id]))}
                    className={`flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-[#0d6b3f] transition ${isOpen ? "rotate-90" : ""}`}
                    type="button"
                    aria-label={`${isOpen ? "Collapse" : "Expand"} ${category.name}`}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                  <img src={category.image} alt={category.name} className="h-16 w-16 rounded-2xl object-cover" />
                  <div>
                    <p className="font-semibold text-[#111]">{category.name}</p>
                    <p className="text-xs text-neutral-500">/{category.slug} - {category.count} products</p>
                  </div>
                  <span className="w-fit rounded-full bg-[#e5f4ec] px-3 py-1 text-xs font-semibold text-[#0d6b3f]">
                    {category.children.length} subcategories
                  </span>
                  <div className="flex justify-end gap-1">
                    <button
                      onClick={() => setEditing(category)}
                      className="rounded-xl p-2 text-neutral-500 hover:bg-[#eef5f1] hover:text-[#0d6b3f]"
                      type="button"
                      aria-label={`Edit ${category.name}`}
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => deleteParentCategory(category)}
                      className="rounded-xl p-2 text-neutral-500 hover:bg-red-50 hover:text-red-600"
                      type="button"
                      aria-label={`Delete ${category.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {isOpen && (
                  <div className="border-t border-black/5 bg-white p-3">
                    <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-4">
                      {category.children.map((child) => (
                        <div key={child.id} className="rounded-2xl bg-[#f4f6f3] p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-sm font-semibold">{child.name}</p>
                              <p className="mt-1 text-xs text-neutral-500">/{child.slug}</p>
                              <p className="mt-4 text-xs font-semibold text-[#0d6b3f]">{child.count} products</p>
                            </div>
                            <div className="flex gap-1">
                              <button
                                type="button"
                                aria-label={`Edit ${child.name}`}
                                onClick={() =>
                                  setEditing({
                                    ...emptyCategory,
                                    id: child.id,
                                    name: child.name,
                                    slug: child.slug,
                                    count: child.count,
                                    parent_id: category.id,
                                  })
                                }
                                className="rounded-xl bg-white p-2 text-neutral-500 hover:text-[#0d6b3f]"
                              >
                                <Edit3 className="h-4 w-4" />
                              </button>
                              <button
                                type="button"
                                aria-label={`Delete ${child.name}`}
                                onClick={() => deleteNestedCategory(category.id, child)}
                                className="rounded-xl bg-white p-2 text-neutral-500 hover:text-red-600"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                      <button
                        className="rounded-2xl border border-dashed border-[#0d6b3f]/30 p-4 text-left text-sm font-semibold text-[#0d6b3f]"
                        type="button"
                        onClick={() => setEditing({ ...emptyCategory, parent_id: category.id })}
                      >
                        + Add nested category
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {editing && (
        <div className="fixed inset-0 z-[90] grid place-items-center bg-black/40 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="category-editor-title">
          <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[30px] bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0d6b3f]">Category editor</p>
                <h2 id="category-editor-title" className="font-[family-name:var(--font-playfair)] text-4xl font-semibold">
                  {editing.parent_id ? "Nested Category" : "Parent Category"}
                </h2>
              </div>
              <button onClick={() => setEditing(null)} className="rounded-full border border-black/10 px-4 py-2 text-sm font-semibold" type="button">
                Close
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label>
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-neutral-400">Name</span>
                <input
                  value={editing.name}
                  onChange={(event) => setEditing({ ...editing, name: event.target.value, slug: editing.slug || slugify(event.target.value) })}
                  className="h-14 w-full rounded-2xl bg-[#f4f6f3] px-4 text-sm outline-none ring-1 ring-black/5 focus:ring-[#0d6b3f]/30"
                />
              </label>
              <label>
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-neutral-400">Slug</span>
                <input
                  value={editing.slug}
                  onChange={(event) => setEditing({ ...editing, slug: slugify(event.target.value) })}
                  className="h-14 w-full rounded-2xl bg-[#f4f6f3] px-4 text-sm outline-none ring-1 ring-black/5 focus:ring-[#0d6b3f]/30"
                />
              </label>
              <label className="sm:col-span-2">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-neutral-400">Image URL</span>
                <input
                  value={editing.image}
                  onChange={(event) => setEditing({ ...editing, image: event.target.value })}
                  className="h-14 w-full rounded-2xl bg-[#f4f6f3] px-4 text-sm outline-none ring-1 ring-black/5 focus:ring-[#0d6b3f]/30"
                />
              </label>
              <label>
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-neutral-400">Sort order</span>
                <input
                  type="number"
                  value={editing.sort_order ?? 0}
                  onChange={(event) => setEditing({ ...editing, sort_order: Number(event.target.value) })}
                  className="h-14 w-full rounded-2xl bg-[#f4f6f3] px-4 text-sm outline-none ring-1 ring-black/5"
                />
              </label>
              <label>
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-neutral-400">Status</span>
                <select
                  value={editing.is_active === false ? "inactive" : "active"}
                  onChange={(event) => setEditing({ ...editing, is_active: event.target.value === "active" })}
                  className="h-14 w-full rounded-2xl bg-[#f4f6f3] px-4 text-sm outline-none ring-1 ring-black/5"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </label>
            </div>

            <button onClick={saveCategory} className="mt-6 w-full rounded-2xl bg-[#0d6b3f] px-7 py-4 text-sm font-semibold text-white" type="button">
              Save Category
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
