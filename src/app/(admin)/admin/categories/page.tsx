"use client";

import { useState } from "react";
import { Plus, ChevronRight, Edit, Trash2, GripVertical } from "lucide-react";

const mockCategories = [
  {
    id: "1",
    name: "Bedroom Furniture",
    slug: "bedroom",
    image: null,
    productCount: 24,
    order: 1,
    children: [
      { id: "1a", name: "Beds", slug: "beds", productCount: 12 },
      { id: "1b", name: "Wardrobes", slug: "wardrobes", productCount: 8 },
      { id: "1c", name: "Nightstands", slug: "nightstands", productCount: 4 },
    ],
  },
  {
    id: "2",
    name: "Living Room",
    slug: "living-room",
    image: null,
    productCount: 32,
    order: 2,
    children: [
      { id: "2a", name: "Sofas", slug: "sofas", productCount: 15 },
      { id: "2b", name: "Coffee Tables", slug: "coffee-tables", productCount: 10 },
      { id: "2c", name: "TV Units", slug: "tv-units", productCount: 7 },
    ],
  },
  {
    id: "3",
    name: "Sofas & Seating",
    slug: "sofas",
    image: null,
    productCount: 18,
    order: 3,
    children: [],
  },
  {
    id: "4",
    name: "Curtains & Fabrics",
    slug: "curtains",
    image: null,
    productCount: 45,
    order: 4,
    children: [
      { id: "4a", name: "Velvet", slug: "velvet", productCount: 15 },
      { id: "4b", name: "Jacquard", slug: "jacquard", productCount: 12 },
      { id: "4c", name: "Silk", slug: "silk", productCount: 8 },
      { id: "4d", name: "Sheer Curtains", slug: "sheer", productCount: 10 },
    ],
  },
];

export default function AdminCategoriesPage() {
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-light text-[var(--charcoal)]">
            Categories
          </h1>
          <p className="font-[family-name:var(--font-sans)] text-sm text-[var(--warm-gray)] mt-1">
            Manage your product categories and subcategories
          </p>
        </div>
        <button className="inline-flex items-center gap-2 bg-[var(--charcoal)] text-white font-[family-name:var(--font-sans)] text-sm font-medium px-5 py-3 hover:bg-[var(--deep-brown)] transition-colors">
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      {/* Categories Tree */}
      <div className="bg-white border border-[var(--border)]">
        {mockCategories.map((category) => (
          <div key={category.id}>
            {/* Main Category Row */}
            <div className="flex items-center gap-4 p-6 border-b border-[var(--border)] hover:bg-[var(--cream)]/30 transition-colors">
              <button className="cursor-move text-[var(--warm-gray)] hover:text-[var(--charcoal)]">
                <GripVertical className="w-5 h-5" />
              </button>
              <button
                onClick={() => toggleExpand(category.id)}
                className={`w-6 h-6 flex items-center justify-center text-[var(--warm-gray)] hover:text-[var(--charcoal)] transition-transform ${expandedIds.includes(category.id) ? "rotate-90" : ""}`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <div className="w-12 h-12 bg-[var(--cream)] rounded flex items-center justify-center flex-shrink-0">
                {category.image ? (
                  <img src={category.image} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-lg">📁</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-[family-name:var(--font-sans)] text-sm font-medium text-[var(--charcoal)]">
                  {category.name}
                </p>
                <p className="font-[family-name:var(--font-sans)] text-xs text-[var(--warm-gray)]">
                  /{category.slug}
                </p>
              </div>
              <div className="hidden sm:block text-center px-4">
                <p className="font-[family-name:var(--font-sans)] text-sm font-medium text-[var(--charcoal)]">
                  {category.productCount}
                </p>
                <p className="font-[family-name:var(--font-sans)] text-xs text-[var(--warm-gray)]">
                  Products
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-[var(--warm-gray)] hover:text-[var(--charcoal)] transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-red-600 hover:text-red-700 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Children */}
            {expandedIds.includes(category.id) && category.children.length > 0 && (
              <div className="bg-[var(--cream)]/30">
                {category.children.map((child) => (
                  <div
                    key={child.id}
                    className="flex items-center gap-4 p-4 pl-20 border-b border-[var(--border)] last:border-0"
                  >
                    <div className="w-8 h-8 bg-white rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-sm">📄</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-[family-name:var(--font-sans)] text-sm text-[var(--charcoal)]">
                        {child.name}
                      </p>
                      <p className="font-[family-name:var(--font-sans)] text-xs text-[var(--warm-gray)]">
                        /{child.slug}
                      </p>
                    </div>
                    <div className="text-center px-4">
                      <p className="font-[family-name:var(--font-sans)] text-sm text-[var(--charcoal)]">
                        {child.productCount}
                      </p>
                      <p className="font-[family-name:var(--font-sans)] text-xs text-[var(--warm-gray)]">
                        Products
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-[var(--warm-gray)] hover:text-[var(--charcoal)] transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:text-red-700 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}