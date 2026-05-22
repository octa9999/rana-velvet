"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Layers,
  Image,
  Calendar,
  MessageSquare,
  Star,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const sidebarLinks = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "Categories",
    href: "/admin/categories",
    icon: Layers,
  },
  {
    title: "Banners",
    href: "/admin/banners",
    icon: Image,
  },
  {
    title: "Appointments",
    href: "/admin/appointments",
    icon: Calendar,
  },
  {
    title: "Inquiries",
    href: "/admin/inquiries",
    icon: MessageSquare,
  },
  {
    title: "Testimonials",
    href: "/admin/testimonials",
    icon: Star,
  },
  {
    title: "Media Library",
    href: "/admin/media",
    icon: Image,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--cream)]">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-[var(--border)] z-50 px-4 flex items-center justify-between">
        <span className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-[var(--charcoal)]">
          Rana Velvet Admin
        </span>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2">
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-[var(--border)] z-40 transform transition-transform lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-[var(--border)]">
          <Link
            href="/"
            className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-[var(--charcoal)]"
          >
            Rana Velvet
          </Link>
          <p className="font-[family-name:var(--font-sans)] text-xs text-[var(--warm-gray)] mt-1">
            Admin Dashboard
          </p>
        </div>

        <nav className="p-4 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-[family-name:var(--font-sans)] text-sm transition-colors ${
                  isActive
                    ? "bg-[var(--charcoal)] text-white"
                    : "text-[var(--warm-gray)] hover:bg-[var(--cream)] hover:text-[var(--charcoal)]"
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <link.icon className="w-5 h-5" />
                {link.title}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[var(--border)]">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg font-[family-name:var(--font-sans)] text-sm text-[var(--warm-gray)] hover:bg-[var(--cream)] hover:text-[var(--charcoal)] transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Back to Website
          </Link>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}