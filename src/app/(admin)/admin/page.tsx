import Link from "next/link";
import { ArrowUpRight, Boxes, CalendarDays, Package, Printer, ShoppingBag } from "lucide-react";
import { listProducts } from "@/lib/catalog";
import { listOrders } from "@/lib/orders";
import { createAdminSupabase } from "@/lib/supabase/server";

function formatPrice(price: number) {
  return `Rs. ${price.toLocaleString("en-PK")}`;
}

export default async function AdminDashboard() {
  const supabase = createAdminSupabase();
  const [products, orders, appointments, inquiries] = await Promise.all([
    listProducts({ activeOnly: false }),
    listOrders(),
    supabase?.from("appointments").select("id, status") ?? Promise.resolve({ data: [] }),
    supabase?.from("inquiries").select("id, status") ?? Promise.resolve({ data: [] }),
  ]);

  const availableUnits = products.reduce((sum, item) => sum + Math.max(0, item.stock - item.reserved), 0);
  const openOrders = orders.filter((order) => order.fulfillment_status !== "delivered");
  const stats = [
    { label: "Products", value: products.length.toString(), note: "Live catalog", icon: Package, active: true },
    { label: "Available Units", value: availableUnits.toString(), note: "Stock minus reserved", icon: Boxes },
    { label: "Open Orders", value: openOrders.length.toString(), note: "Needs action", icon: ShoppingBag },
    { label: "Appointments", value: String(appointments.data?.length || 0), note: "Real bookings", icon: CalendarDays },
  ];

  const taskList = [
    ["Verify low stock products", "Inventory", "/admin/inventory"],
    ["Print pending order slips", "Orders", "/admin/print-orders"],
    ["Review COD settlements", "Payments", "/admin/payments"],
    ["Review inquiries", "Customer Care", "/admin/inquiries"],
    [`${inquiries.data?.length || 0} inquiries in system`, "Inquiries", "/admin/inquiries"],
  ];

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-5 pt-2 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#0d6b3f]">Store overview</p>
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-semibold tracking-tight text-[#111] sm:text-5xl">
            Dashboard
          </h1>
          <p className="mt-2 max-w-xl text-sm text-neutral-500">
            Manage catalog, orders, inventory, checkout and payment settings from one calm commerce workspace.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/products" className="rounded-full bg-[#0d6b3f] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/20">
            + Add Product
          </Link>
          <Link href="/admin/print-orders" className="rounded-full border border-[#0d6b3f]/30 px-5 py-3 text-sm font-semibold text-[#0d6b3f]">
            Print Orders
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`rounded-[26px] p-5 shadow-sm ${
              stat.active ? "bg-gradient-to-br from-[#0d6b3f] to-[#063b25] text-white" : "bg-white text-[#111]"
            }`}
          >
            <div className="mb-6 flex items-center justify-between">
              <p className={`text-sm font-semibold ${stat.active ? "text-white" : "text-[#111]"}`}>{stat.label}</p>
              <span className={`rounded-full p-2 ${stat.active ? "bg-white/15" : "bg-[#eef5f1]"}`}>
                <stat.icon className={`h-4 w-4 ${stat.active ? "text-white" : "text-[#0d6b3f]"}`} />
              </span>
            </div>
            <p className="text-5xl font-semibold tracking-tight">{stat.value}</p>
            <p className={`mt-3 text-xs ${stat.active ? "text-white/70" : "text-neutral-500"}`}>{stat.note}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.25fr_0.85fr]">
        <div className="rounded-[28px] bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Recent Orders</h2>
              <p className="text-xs text-neutral-500">COD, bank transfer and fulfilment status from Supabase.</p>
            </div>
            <Link href="/admin/orders" className="rounded-full border border-black/10 px-4 py-2 text-xs font-semibold">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="grid gap-3 rounded-[22px] bg-[#f6f7f5] p-4 sm:grid-cols-[1fr_auto_auto] sm:items-center">
                <div>
                  <p className="font-semibold">{order.order_number} · {order.customer_name}</p>
                  <p className="text-xs text-neutral-500">{order.items.length} items · {order.city || "No city"} · {new Date(order.created_at).toLocaleDateString("en-PK")}</p>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#0d6b3f]">{order.fulfillment_status}</span>
                <p className="font-semibold">{formatPrice(order.total)}</p>
              </div>
            ))}
            {!orders.length && <p className="rounded-[22px] bg-[#f6f7f5] p-4 text-sm text-neutral-500">No orders yet. Checkout-created orders will appear here.</p>}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[28px] bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Operations</h2>
              <ArrowUpRight className="h-5 w-5 text-[#0d6b3f]" />
            </div>
            <div className="space-y-3">
              {taskList.map(([title, area, href]) => (
                <Link key={title} href={href} className="flex items-center justify-between rounded-2xl border border-black/5 px-4 py-3 transition hover:bg-[#eef5f1]">
                  <div>
                    <p className="text-sm font-semibold">{title}</p>
                    <p className="text-xs text-neutral-500">{area}</p>
                  </div>
                  <span className="h-2 w-2 rounded-full bg-[#0d6b3f]" />
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] bg-[#082f1f] p-5 text-white shadow-sm">
            <Printer className="mb-8 h-8 w-8 text-[#b7d7c7]" />
            <h2 className="mb-2 text-xl font-semibold">Order Desk</h2>
            <p className="mb-5 text-sm leading-relaxed text-white/60">Print packing slips, update fulfilment, and prepare deliveries from a single queue.</p>
            <Link href="/admin/print-orders" className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#082f1f]">
              Open Print Queue
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
