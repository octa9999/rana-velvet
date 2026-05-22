"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Search, ShoppingBag, ChevronDown, ArrowRight } from "lucide-react";

const categories = [
  {
    name: "Bedroom Furniture",
    slug: "bedroom",
    subcategories: ["Beds", "Wardrobes", "Nightstands", "Dressers", "Vanity"],
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&q=80",
  },
  {
    name: "Living Room",
    slug: "living-room",
    subcategories: ["Sofas", "Coffee Tables", "TV Units", " Cabinets", "Side Tables"],
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80",
  },
  {
    name: "Sofas & Seating",
    slug: "sofas",
    subcategories: ["3-Seater Sofas", "2-Seater Sofas", "Armchairs", "Ottomans", "Chaise Lounges"],
    image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=400&q=80",
  },
  {
    name: "Curtains & Fabrics",
    slug: "curtains",
    subcategories: ["Velvet", "Jacquard", "Silk", "Linen", "Sheer Curtains"],
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&q=80",
  },
  {
    name: "Home Accessories",
    slug: "accessories",
    subcategories: ["Lamps", "Mirrors", "Vases", "Decorative", "Cushions"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  },
  {
    name: "Custom Furniture",
    slug: "custom",
    subcategories: ["Bespoke Pieces", "Made to Measure", "Consultation"],
    image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=400&q=80",
  },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[var(--border)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="font-[family-name:var(--font-playfair)] text-2xl font-semibold tracking-tight text-[var(--charcoal)]"
          >
            Rana Velvet
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-[family-name:var(--font-sans)] text-sm font-medium text-[var(--charcoal)] hover:text-[var(--warm-taupe)] transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}

            {/* Collections Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCollectionsOpen(true)}
              onMouseLeave={() => setCollectionsOpen(false)}
            >
              <button className="flex items-center gap-1 font-[family-name:var(--font-sans)] text-sm font-medium text-[var(--charcoal)] hover:text-[var(--warm-taupe)] transition-colors duration-200">
                Collections
                <ChevronDown className={`w-4 h-4 transition-transform ${collectionsOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Mega Menu Dropdown */}
              {collectionsOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[900px] bg-white shadow-2xl border border-[var(--border)] rounded-xl overflow-hidden">
                  <div className="p-8">
                    <div className="grid grid-cols-3 gap-8">
                      {/* Left side - Categories Grid */}
                      <div className="col-span-2">
                        <h3 className="font-[family-name:var(--font-sans)] text-xs font-semibold uppercase tracking-wider text-[var(--warm-gray)] mb-6">
                          Browse Categories
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                          {categories.map((category) => (
                            <div key={category.slug} className="group">
                              <Link
                                href={`/categories/${category.slug}`}
                                className="block p-4 rounded-lg hover:bg-[var(--cream)] transition-colors"
                              >
                                <h4 className="font-[family-name:var(--font-sans)] text-sm font-semibold text-[var(--charcoal)] mb-3 group-hover:text-[var(--warm-taupe)] transition-colors">
                                  {category.name}
                                </h4>
                                <ul className="space-y-2">
                                  {category.subcategories.slice(0, 4).map((sub) => (
                                    <li key={sub}>
                                      <Link
                                        href={`/categories/${category.slug}?type=${sub.toLowerCase()}`}
                                        className="font-[family-name:var(--font-sans)] text-xs text-[var(--warm-gray)] hover:text-[var(--charcoal)] transition-colors"
                                      >
                                        {sub}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right side - Featured Image */}
                      <div className="relative rounded-lg overflow-hidden">
                        <img
                          src="https://images.unsplash.com/photo-1618220179428-22790b265013?w=400&q=80"
                          alt="Featured Collection"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                          <span className="font-[family-name:var(--font-sans)] text-xs text-white/80 uppercase tracking-wider mb-2">
                            New Arrivals
                          </span>
                          <h4 className="font-[family-name:var(--font-playfair)] text-lg font-medium text-white mb-3">
                            Spring Collection 2025
                          </h4>
                          <Link
                            href="/categories"
                            className="inline-flex items-center gap-2 text-white text-sm font-medium hover:gap-3 transition-all"
                          >
                            Explore
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/products"
              className="font-[family-name:var(--font-sans)] text-sm font-medium text-[var(--charcoal)] hover:text-[var(--warm-taupe)] transition-colors duration-200"
            >
              Products
            </Link>
            <Link
              href="/contact"
              className="font-[family-name:var(--font-sans)] text-sm font-medium text-[var(--charcoal)] hover:text-[var(--warm-taupe)] transition-colors duration-200"
            >
              Contact
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-5">
            <button
              className="p-2 text-[var(--warm-gray)] hover:text-[var(--charcoal)] transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
                        <button
              className="p-2 text-[var(--warm-gray)] hover:text-[var(--charcoal)] transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
            </button>
            <button
              className="lg:hidden p-2 text-[var(--charcoal)]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[var(--border)] bg-white">
          <nav className="max-w-[1400px] mx-auto px-6 py-6 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-[family-name:var(--font-sans)] text-base font-medium text-[var(--charcoal)] py-3 border-b border-[var(--border)]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Categories */}
            <div className="py-3 border-b border-[var(--border)]">
              <p className="font-[family-name:var(--font-sans)] text-xs font-semibold uppercase tracking-wider text-[var(--warm-gray)] mb-3">
                Collections
              </p>
              {categories.map((category) => (
                <div key={category.slug} className="py-2">
                  <Link
                    href={`/categories/${category.slug}`}
                    className="font-[family-name:var(--font-sans)] text-base font-medium text-[var(--charcoal)]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {category.subcategories.slice(0, 4).map((sub) => (
                      <Link
                        key={sub}
                        href={`/categories/${category.slug}?type=${sub.toLowerCase()}`}
                        className="font-[family-name:var(--font-sans)] text-xs text-[var(--warm-gray)] bg-[var(--cream)] px-2 py-1 rounded"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {sub}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/products"
              className="font-[family-name:var(--font-sans)] text-base font-medium text-[var(--charcoal)] py-3 border-b border-[var(--border)]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/contact"
              className="font-[family-name:var(--font-sans)] text-base font-medium text-[var(--charcoal)] py-3 border-b border-[var(--border)]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
                      </nav>
        </div>
      )}
    </header>
  );
}