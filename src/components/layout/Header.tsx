"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Search, ShoppingBag, User } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Collections", href: "/categories" },
  { label: "Products", href: "/products" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[var(--background)]/95 backdrop-blur-sm border-b border-[var(--border)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="font-[family-name:var(--font-playfair)] text-2xl font-semibold tracking-tight text-[var(--foreground)]"
          >
            Rana Velvet
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-[family-name:var(--font-sans)] text-sm font-medium text-[var(--warm-gray)] hover:text-[var(--foreground)] transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-5">
            <button
              className="p-2 text-[var(--warm-gray)] hover:text-[var(--foreground)] transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              className="p-2 text-[var(--warm-gray)] hover:text-[var(--foreground)] transition-colors"
              aria-label="Account"
            >
              <User className="w-5 h-5" />
            </button>
            <button
              className="p-2 text-[var(--warm-gray)] hover:text-[var(--foreground)] transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
            </button>
            <Link
              href="/consultation"
              className="hidden lg:inline-flex items-center justify-center bg-[var(--charcoal)] text-white font-[family-name:var(--font-sans)] text-sm font-medium px-6 py-3 rounded-none hover:bg-[var(--deep-brown)] transition-colors duration-300"
            >
              Book Consultation
            </Link>
            <button
              className="lg:hidden p-2 text-[var(--warm-gray)]"
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
        <div className="lg:hidden border-t border-[var(--border)] bg-[var(--background)]">
          <nav className="max-w-[1400px] mx-auto px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-[family-name:var(--font-sans)] text-base font-medium text-[var(--foreground)] py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/consultation"
              className="inline-flex items-center justify-center bg-[var(--charcoal)] text-white font-[family-name:var(--font-sans)] text-sm font-medium px-6 py-3 mt-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              Book Consultation
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}