"use client";

import { useState } from "react";
import { Plus, Search, Edit, Trash2, MoreVertical, Eye } from "lucide-react";

const mockProducts = [
  {
    id: "1",
    name: "Velvet Royale Bed",
    slug: "velvet-royale-bed",
    category: "Bedroom",
    price: 89999,
    stock: 12,
    status: "active",
    featured: true,
    image: null,
  },
  {
    id: "2",
    name: "Cloud Comfort Sofa",
    slug: "cloud-comfort-sofa",
    category: "Living Room",
    price: 129999,
    stock: 8,
    status: "active",
    featured: true,
    image: null,
  },
  {
    id: "3",
    name: "Elite Ottoman",
    slug: "elite-ottoman",
    category: "Seating",
    price: 34999,
    stock: 15,
    status: "active",
    featured: false,
    image: null,
  },
  {
    id: "4",
    name: "Imperial Curtains",
    slug: "imperial-curtains",
    category: "Curtains",
    price: 12999,
    stock: 30,
    status: "active",
    featured: false,
    image: null,
  },
  {
    id: "5",
    name: "Royal Armchair",
    slug: "royal-armchair",
    category: "Seating",
    price: 54999,
    stock: 0,
    status: "draft",
    featured: false,
    image: null,
  },
];

function formatPrice(price: number) {
  return `Rs. ${price.toLocaleString("en-PK")}`;
}

export default function AdminProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = mockProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-light text-[var(--charcoal)]">
            Products
          </h1>
          <p className="font-[family-name:var(--font-sans)] text-sm text-[var(--warm-gray)] mt-1">
            Manage your product inventory and listings
          </p>
        </div>
        <button className="inline-flex items-center gap-2 bg-[var(--charcoal)] text-white font-[family-name:var(--font-sans)] text-sm font-medium px-5 py-3 hover:bg-[var(--deep-brown)] transition-colors">
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Search & Filters */}
      <div className="bg-white border border-[var(--border)] p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--warm-gray)]" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-[var(--border)] font-[family-name:var(--font-sans)] text-sm focus:outline-none focus:border-[var(--warm-taupe)]"
            />
          </div>
          <select className="px-4 py-3 border border-[var(--border)] font-[family-name:var(--font-sans)] text-sm focus:outline-none focus:border-[var(--warm-taupe)]">
            <option value="">All Categories</option>
            <option value="bedroom">Bedroom</option>
            <option value="living-room">Living Room</option>
            <option value="seating">Seating</option>
            <option value="curtains">Curtains</option>
          </select>
          <select className="px-4 py-3 border border-[var(--border)] font-[family-name:var(--font-sans)] text-sm focus:outline-none focus:border-[var(--warm-taupe)]">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white border border-[var(--border)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--cream)]">
                <th className="text-left px-6 py-4 font-[family-name:var(--font-sans)] text-sm font-semibold text-[var(--charcoal)]">
                  Product
                </th>
                <th className="text-left px-6 py-4 font-[family-name:var(--font-sans)] text-sm font-semibold text-[var(--charcoal)]">
                  Category
                </th>
                <th className="text-left px-6 py-4 font-[family-name:var(--font-sans)] text-sm font-semibold text-[var(--charcoal)]">
                  Price
                </th>
                <th className="text-left px-6 py-4 font-[family-name:var(--font-sans)] text-sm font-semibold text-[var(--charcoal)]">
                  Stock
                </th>
                <th className="text-left px-6 py-4 font-[family-name:var(--font-sans)] text-sm font-semibold text-[var(--charcoal)]">
                  Status
                </th>
                <th className="text-left px-6 py-4 font-[family-name:var(--font-sans)] text-sm font-semibold text-[var(--charcoal)]">
                  Featured
                </th>
                <th className="text-right px-6 py-4 font-[family-name:var(--font-sans)] text-sm font-semibold text-[var(--charcoal)]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b border-[var(--border)] hover:bg-[var(--cream)]/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[var(--cream)] rounded flex items-center justify-center">
                        {product.image ? (
                          <img src={product.image} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-lg">🛏️</span>
                        )}
                      </div>
                      <div>
                        <p className="font-[family-name:var(--font-sans)] text-sm font-medium text-[var(--charcoal)]">
                          {product.name}
                        </p>
                        <p className="font-[family-name:var(--font-sans)] text-xs text-[var(--warm-gray)]">
                          /{product.slug}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-[family-name:var(--font-sans)] text-sm text-[var(--warm-gray)]">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-[family-name:var(--font-sans)] text-sm font-medium text-[var(--charcoal)]">
                      {formatPrice(product.price)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-[family-name:var(--font-sans)] text-sm ${
                      product.stock === 0 ? "text-red-600" : product.stock < 5 ? "text-yellow-600" : "text-[var(--charcoal)]"
                    }`}>
                      {product.stock === 0 ? "Out of Stock" : `${product.stock} units`}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      product.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {product.featured ? (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-[var(--gold)]">
                        ★ Featured
                      </span>
                    ) : (
                      <span className="text-xs text-[var(--warm-gray)]">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-[var(--warm-gray)] hover:text-[var(--charcoal)] transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-[var(--warm-gray)] hover:text-[var(--charcoal)] transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:text-red-700 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-[var(--border)] flex items-center justify-between">
          <p className="font-[family-name:var(--font-sans)] text-sm text-[var(--warm-gray)]">
            Showing {filteredProducts.length} of {mockProducts.length} products
          </p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-2 border border-[var(--border)] font-[family-name:var(--font-sans)] text-sm text-[var(--charcoal)] disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-3 py-2 border border-[var(--border)] bg-[var(--charcoal)] text-white font-[family-name:var(--font-sans)] text-sm">
              1
            </button>
            <button className="px-3 py-2 border border-[var(--border)] font-[family-name:var(--font-sans)] text-sm text-[var(--charcoal)] hover:bg-[var(--cream)]">
              2
            </button>
            <button className="px-3 py-2 border border-[var(--border)] font-[family-name:var(--font-sans)] text-sm text-[var(--charcoal)] hover:bg-[var(--cream)]">
              3
            </button>
            <button className="px-3 py-2 border border-[var(--border)] font-[family-name:var(--font-sans)] text-sm text-[var(--charcoal)] hover:bg-[var(--cream)]">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}