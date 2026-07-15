"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Boxes,
  CalendarDays,
  CreditCard,
  FileText,
  Home,
  Image,
  Layers3,
  Menu,
  MessageSquare,
  Package,
  Printer,
  Ruler,
  Search,
  Settings,
  ShoppingBag,
  Star,
  Truck,
  UserRound,
  Handshake,
  Armchair,
  X,
} from "lucide-react";
import { useState } from "react";
import { AdminNotifications } from "@/components/admin/AdminNotifications";

const primaryLinks = [
  { title: "Dashboard", href: "/admin", icon: Home },
  { title: "Products", href: "/admin/products", icon: Package },
  { title: "Categories", href: "/admin/categories", icon: Layers3 },
  { title: "Inventory", href: "/admin/inventory", icon: Boxes },
  { title: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { title: "Print Orders", href: "/admin/print-orders", icon: Printer },
  { title: "Checkout", href: "/admin/checkout", icon: Truck },
  { title: "Payments", href: "/admin/payments", icon: CreditCard },
];

const secondaryLinks = [
  { title: "Banners", href: "/admin/banners", icon: Image },
  { title: "Appointments", href: "/admin/appointments", icon: CalendarDays },
  { title: "Inquiries", href: "/admin/inquiries", icon: MessageSquare },
  { title: "Curtain Requests", href: "/admin/curtain-requests", icon: Ruler },
  { title: "Measurement Visits", href: "/admin/measurement-visits", icon: CalendarDays },
  { title: "Custom Furniture", href: "/admin/custom-furniture", icon: Armchair },
  { title: "Partner Applications", href: "/admin/partners", icon: Handshake },
  { title: "Testimonials", href: "/admin/testimonials", icon: Star },
  { title: "Media", href: "/admin/media", icon: Image },
  { title: "Reports", href: "/admin/reports", icon: BarChart3 },
  { title: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Array<{ type: string; label: string; href: string; meta: string }>>([]);
  const [notice, setNotice] = useState("");

  const runSearch = async (value: string) => {
    setSearch(value);
    if (value.trim().length < 2) {
      setResults([]);
      return;
    }
    const response = await fetch(`/api/admin/search?q=${encodeURIComponent(value)}`);
    const payload = await response.json().catch(() => ({ results: [] }));
    setResults(payload.results || []);
  };

  const importCsv = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const target = file.name.toLowerCase().includes("categor") ? "categories" : "products";
    const form = new FormData();
    form.append("file", file);
    form.append("target", target);
    const response = await fetch("/api/admin/import", { method: "POST", body: form });
    const payload = await response.json().catch(() => null);
    setNotice(response.ok ? `Imported ${payload.imported} ${target} rows.` : payload?.error || "CSV import failed.");
    event.target.value = "";
  };

  const renderLink = (link: (typeof primaryLinks)[number]) => {
    const isActive = pathname === link.href;
    return (
      <Link
        key={link.href}
        href={link.href}
        onClick={() => setSidebarOpen(false)}
        className={`group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition-all ${
          isActive
            ? "bg-[#0d6b3f] text-white shadow-lg shadow-emerald-900/20"
            : "text-neutral-500 hover:bg-[#eef5f1] hover:text-[#0d6b3f]"
        }`}
      >
        <link.icon className="h-4 w-4" />
        <span className="font-medium">{link.title}</span>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-[#e9ebe9] p-0 text-[#111] lg:p-6">
      <div className="mx-auto flex min-h-screen max-w-[1480px] overflow-hidden bg-[#f8f8f6] shadow-2xl shadow-black/10 lg:min-h-[calc(100vh-3rem)] lg:rounded-[28px] lg:p-4">
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#f4f5f2] p-4 transition-transform duration-300 lg:static lg:translate-x-0 lg:rounded-[24px] ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col">
            <Link href="/" className="mb-10 flex items-center gap-3 rounded-2xl bg-white px-4 py-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0d6b3f] text-sm font-bold text-white">
                RV
              </span>
              <div>
                <p className="font-[family-name:var(--font-playfair)] text-xl text-[#111]">Rana Velvet</p>
                <p className="text-xs text-neutral-500">Commerce OS</p>
              </div>
            </Link>

            <div className="mb-4 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-400">Menu</div>
            <nav className="space-y-1">{primaryLinks.map(renderLink)}</nav>

            <div className="mb-4 mt-8 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-400">General</div>
            <nav className="space-y-1">{secondaryLinks.map(renderLink)}</nav>

            <div className="mt-auto rounded-[24px] bg-[#082f1f] p-4 text-white">
              <FileText className="mb-5 h-6 w-6 text-[#b7d7c7]" />
              <p className="mb-1 text-sm font-semibold">Need product data?</p>
              <p className="mb-5 text-xs leading-relaxed text-white/55">Use CSV import for inventory, pricing, and category updates.</p>
              <label className="block w-full cursor-pointer rounded-full bg-white px-4 py-3 text-center text-xs font-semibold text-[#082f1f]">
                Import CSV
                <input type="file" accept=".csv,text/csv" onChange={importCsv} className="hidden" />
              </label>
              {notice && <p className="mt-3 text-xs text-white/70">{notice}</p>}
            </div>
          </div>
        </aside>

        {sidebarOpen && (
          <button
            aria-label="Close sidebar"
            className="fixed inset-0 z-40 bg-black/30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 flex items-center gap-4 bg-[#f8f8f6]/90 px-4 py-4 backdrop-blur lg:top-6 lg:px-6">
            <button
              className="rounded-2xl bg-white p-3 shadow-sm lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle admin menu"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <input
                value={search}
                onChange={(event) => runSearch(event.target.value)}
                className="h-14 w-full rounded-[22px] border-0 bg-white pl-11 pr-4 text-sm outline-none ring-1 ring-black/5 transition focus:ring-[#0d6b3f]/30"
                placeholder="Search products, orders, customers..."
              />
              {results.length > 0 && (
                <div className="absolute left-0 right-0 top-16 z-50 overflow-hidden rounded-[22px] bg-white p-2 shadow-xl ring-1 ring-black/5">
                  {results.map((result, index) => (
                    <Link
                      key={`${result.type}-${result.label}-${index}`}
                      href={result.href}
                      onClick={() => {
                        setResults([]);
                        setSearch("");
                      }}
                      className="block rounded-2xl px-4 py-3 text-sm hover:bg-[#eef5f1]"
                    >
                      <span className="font-semibold text-[#111]">{result.label}</span>
                      <span className="ml-2 text-xs font-semibold text-[#0d6b3f]">{result.type}</span>
                      <p className="mt-1 text-xs text-neutral-500">{result.meta}</p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <div className="ml-auto hidden items-center gap-3 sm:flex">
              <button className="rounded-2xl bg-white p-4 shadow-sm" type="button" aria-label="Open appointment calendar">
                <CalendarDays className="h-4 w-4 text-[#0d6b3f]" />
              </button>
              <button className="rounded-2xl bg-white p-4 shadow-sm" type="button" aria-label="Open order queue">
                <ShoppingBag className="h-4 w-4 text-[#0d6b3f]" />
              </button>
              <div className="flex items-center gap-3 rounded-[22px] bg-white px-3 py-2 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0d6b3f]/10">
                  <UserRound className="h-5 w-5 text-[#0d6b3f]" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-semibold">Rana Admin</p>
                  <p className="text-xs text-neutral-500">store@ranavelvet.com</p>
                </div>
              </div>
            </div>
          </header>

          <main className="px-4 pb-6 lg:px-6">{children}</main>
          <AdminNotifications />
        </div>
      </div>
    </div>
  );
}
