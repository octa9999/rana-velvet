import { z } from "zod";
import { createAdminSupabase } from "@/lib/supabase/server";
import { createOrder, type CheckoutOrderInput } from "@/lib/orders";

type JsonRecord = Record<string, unknown>;

export type AdminModuleKey =
  | "banners"
  | "appointments"
  | "inquiries"
  | "testimonials"
  | "payments"
  | "checkout"
  | "settings"
  | "inventory"
  | "print-orders"
  | "orders"
  | "reports"
  | "media";

export type AdminField = {
  name: string;
  label: string;
  type: "text" | "number" | "textarea" | "select" | "checkbox" | "json" | "date" | "time" | "file";
  options?: { label: string; value: string }[];
  required?: boolean;
  full?: boolean;
};

export type AdminModuleDefinition = {
  key: AdminModuleKey;
  title: string;
  eyebrow: string;
  description: string;
  primaryAction: string;
  table?: string;
  orderBy?: string;
  searchable: string[];
  fields: AdminField[];
};

const statusOptions = ["pending", "confirmed", "completed", "cancelled"].map((value) => ({ label: value, value }));
const inquiryStatusOptions = ["new", "read", "responded", "closed"].map((value) => ({ label: value, value }));
const fulfillmentOptions = ["new", "processing", "ready", "delivered", "cancelled"].map((value) => ({ label: value, value }));
const paymentStatusOptions = ["pending_collection", "awaiting_transfer", "paid", "failed", "refunded"].map((value) => ({ label: value, value }));

export const adminModuleDefinitions: Record<AdminModuleKey, AdminModuleDefinition> = {
  banners: {
    key: "banners",
    title: "Banners",
    eyebrow: "Homepage CMS",
    description: "Manage active homepage and campaign banners rendered on the public storefront.",
    primaryAction: "Add Banner",
    table: "banners",
    orderBy: "sort_order",
    searchable: ["title", "subtitle", "link_text"],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "subtitle", label: "Subtitle", type: "textarea", full: true },
      { name: "image_url", label: "Image URL", type: "text", full: true },
      { name: "link_text", label: "CTA Label", type: "text" },
      { name: "link_url", label: "CTA URL", type: "text" },
      { name: "sort_order", label: "Sort Order", type: "number" },
      { name: "is_active", label: "Active", type: "checkbox" },
    ],
  },
  appointments: {
    key: "appointments",
    title: "Appointments",
    eyebrow: "Booking Desk",
    description: "Review showroom visits and consultation bookings submitted from the public site.",
    primaryAction: "Add Appointment",
    table: "appointments",
    orderBy: "created_at",
    searchable: ["name", "email", "phone", "service", "status"],
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "email", label: "Email", type: "text", required: true },
      { name: "phone", label: "Phone", type: "text", required: true },
      { name: "date", label: "Date", type: "date", required: true },
      { name: "time", label: "Time", type: "time", required: true },
      { name: "service", label: "Service", type: "text", required: true },
      { name: "status", label: "Status", type: "select", options: statusOptions },
      { name: "message", label: "Message", type: "textarea", full: true },
    ],
  },
  inquiries: {
    key: "inquiries",
    title: "Inquiries",
    eyebrow: "Customer Care",
    description: "Handle public contact requests, product questions, and showroom inquiries.",
    primaryAction: "Add Inquiry",
    table: "inquiries",
    orderBy: "created_at",
    searchable: ["name", "email", "phone", "subject", "message", "status"],
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "email", label: "Email", type: "text", required: true },
      { name: "phone", label: "Phone", type: "text" },
      { name: "subject", label: "Subject", type: "text" },
      { name: "status", label: "Status", type: "select", options: inquiryStatusOptions },
      { name: "message", label: "Message", type: "textarea", required: true, full: true },
    ],
  },
  testimonials: {
    key: "testimonials",
    title: "Testimonials",
    eyebrow: "Social Proof",
    description: "Create, approve and order customer testimonials shown on the public site.",
    primaryAction: "Add Testimonial",
    table: "testimonials",
    orderBy: "sort_order",
    searchable: ["name", "role", "content"],
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "role", label: "Role", type: "text" },
      { name: "rating", label: "Rating", type: "number" },
      { name: "avatar", label: "Avatar URL", type: "text" },
      { name: "sort_order", label: "Sort Order", type: "number" },
      { name: "is_active", label: "Active", type: "checkbox" },
      { name: "content", label: "Content", type: "textarea", required: true, full: true },
    ],
  },
  payments: {
    key: "payments",
    title: "Payments",
    eyebrow: "Payment Providers",
    description: "Enable COD and bank transfer now, with provider configuration ready for later integrations.",
    primaryAction: "Add Provider",
    table: "payment_providers",
    orderBy: "sort_order",
    searchable: ["name", "provider_key"],
    fields: [
      { name: "name", label: "Provider Name", type: "text", required: true },
      { name: "provider_key", label: "Provider Key", type: "text", required: true },
      { name: "is_enabled", label: "Enabled", type: "checkbox" },
      { name: "sort_order", label: "Sort Order", type: "number" },
      { name: "config", label: "Config JSON", type: "json", full: true },
    ],
  },
  checkout: {
    key: "checkout",
    title: "Checkout",
    eyebrow: "Checkout Rules",
    description: "Persist delivery fees, free delivery thresholds, payment options and customer checkout notes.",
    primaryAction: "Save Checkout Rule",
    table: "checkout_settings",
    orderBy: "key",
    searchable: ["key"],
    fields: [
      { name: "key", label: "Setting Key", type: "text", required: true },
      { name: "value", label: "Value JSON", type: "json", required: true, full: true },
    ],
  },
  settings: {
    key: "settings",
    title: "Settings",
    eyebrow: "Business Settings",
    description: "Manage business contact details, showroom address, hours, social links and SEO defaults.",
    primaryAction: "Add Setting",
    table: "site_settings",
    orderBy: "group_name",
    searchable: ["key", "value", "group_name"],
    fields: [
      { name: "key", label: "Key", type: "text", required: true },
      { name: "value", label: "Value", type: "textarea", required: true, full: true },
      { name: "type", label: "Type", type: "select", options: ["string", "number", "boolean", "json"].map((value) => ({ label: value, value })) },
      { name: "group_name", label: "Group", type: "text" },
    ],
  },
  inventory: {
    key: "inventory",
    title: "Inventory",
    eyebrow: "Stock Control",
    description: "Record stock adjustments and audit reserved/available inventory from real product and order data.",
    primaryAction: "Stock Adjustment",
    table: "inventory_movements",
    orderBy: "created_at",
    searchable: ["movement_type", "note", "reference_type"],
    fields: [
      { name: "product_id", label: "Product ID", type: "text", required: true },
      { name: "movement_type", label: "Movement Type", type: "select", options: ["stock_in", "stock_out", "reserved", "released", "adjustment"].map((value) => ({ label: value, value })) },
      { name: "quantity", label: "Quantity", type: "number", required: true },
      { name: "note", label: "Note", type: "textarea", full: true },
    ],
  },
  "print-orders": {
    key: "print-orders",
    title: "Print Orders",
    eyebrow: "Fulfilment Queue",
    description: "Print real packing slips and keep a print log against each order.",
    primaryAction: "Print Selected",
    searchable: ["order_number", "customer_name", "fulfillment_status"],
    fields: [],
  },
  orders: {
    key: "orders",
    title: "Orders",
    eyebrow: "Fulfilment",
    description: "Track customer orders, COD confirmations, bank transfer verification and delivery status.",
    primaryAction: "Create Manual Order",
    table: "orders",
    orderBy: "created_at",
    searchable: ["order_number", "customer_name", "customer_email", "customer_phone", "payment_status", "fulfillment_status"],
    fields: [
      { name: "customer_name", label: "Customer Name", type: "text", required: true },
      { name: "customer_email", label: "Customer Email", type: "text" },
      { name: "customer_phone", label: "Customer Phone", type: "text", required: true },
      { name: "payment_method", label: "Payment Method", type: "select", options: ["cod", "bank_transfer", "advance_cash"].map((value) => ({ label: value, value })) },
      { name: "payment_status", label: "Payment Status", type: "select", options: paymentStatusOptions },
      { name: "fulfillment_status", label: "Fulfillment Status", type: "select", options: fulfillmentOptions },
      { name: "city", label: "City", type: "text" },
      { name: "province", label: "Province", type: "text" },
      { name: "address", label: "Address", type: "textarea", full: true },
      { name: "product_id", label: "Product ID (optional)", type: "text" },
      { name: "product_name", label: "Product Name (optional)", type: "text" },
      { name: "product_slug", label: "Product Slug (optional)", type: "text" },
      { name: "subtotal", label: "Subtotal", type: "number" },
      { name: "delivery_fee", label: "Delivery Fee", type: "number" },
      { name: "total", label: "Total", type: "number" },
      { name: "admin_notes", label: "Admin Notes", type: "textarea", full: true },
    ],
  },
  reports: {
    key: "reports",
    title: "Reports",
    eyebrow: "Analytics",
    description: "Real order, revenue, product, appointment and inquiry analytics from Supabase.",
    primaryAction: "Export Report",
    searchable: [],
    fields: [],
  },
  media: {
    key: "media",
    title: "Media",
    eyebrow: "Asset Library",
    description: "Upload, list and remove Supabase Storage assets for products, categories, banners and testimonials.",
    primaryAction: "Upload Media",
    searchable: ["name", "bucket"],
    fields: [{ name: "file", label: "File", type: "file", required: true }],
  },
};

export function getModuleDefinition(module: string) {
  return adminModuleDefinitions[module as AdminModuleKey];
}

function adminClient() {
  const supabase = createAdminSupabase();
  if (!supabase) throw new Error("Supabase admin client is not configured");
  return supabase;
}

function parseJson(value: unknown) {
  if (typeof value !== "string") return value ?? {};
  if (!value.trim()) return {};
  try {
    return JSON.parse(value);
  } catch {
    throw new Error("Invalid JSON. Use valid JSON like {\"fee\":2500}, or leave the field empty for {}.");
  }
}

function normalizePayload(definition: AdminModuleDefinition, body: JsonRecord) {
  const payload: JsonRecord = {};
  for (const field of definition.fields) {
    if (field.type === "file") continue;
    if (!(field.name in body)) continue;
    const value = body[field.name];
    if (field.type === "number") payload[field.name] = Number(value || 0);
    else if (field.type === "checkbox") payload[field.name] = Boolean(value);
    else if (field.type === "json") payload[field.name] = parseJson(value);
    else if (field.type === "select") payload[field.name] = value || field.options?.[0]?.value || null;
    else payload[field.name] = value === "" ? null : value;
  }
  return payload;
}

export async function listModuleRows(module: AdminModuleKey) {
  if (module === "reports") return getReports();
  if (module === "media") return listMedia();
  if (module === "print-orders") return getPrintQueue();

  const definition = adminModuleDefinitions[module];
  if (!definition.table) throw new Error("Module has no table");
  const supabase = adminClient();
  let query = supabase.from(definition.table).select("*");
  if (definition.orderBy) query = query.order(definition.orderBy, { ascending: definition.orderBy !== "created_at" });
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return buildModuleResponse(module, data || []);
}

export async function createModuleRow(module: AdminModuleKey, body: JsonRecord) {
  if (module === "orders") return createManualOrder(body);
  if (module === "inventory") return createInventoryMovement(body);
  if (module === "print-orders") return printOrders(body);

  const definition = adminModuleDefinitions[module];
  if (!definition.table) throw new Error("Module cannot be created");
  const payload = normalizePayload(definition, body);
  const schema = z.object(Object.fromEntries(definition.fields.filter((field) => field.required).map((field) => [field.name, z.any()])));
  schema.parse(payload);
  const supabase = adminClient();
  const { data, error } = await supabase.from(definition.table).insert(payload).select("*").single();
  if (error) throw new Error(error.message);
  return data;
}

export async function updateModuleRow(module: AdminModuleKey, id: string, body: JsonRecord) {
  const definition = adminModuleDefinitions[module];
  if (!definition.table) throw new Error("Module cannot be updated");
  const payload = normalizePayload(definition, body);
  const supabase = adminClient();
  const { data, error } = await supabase.from(definition.table).update(payload).eq("id", id).select("*").single();
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteModuleRow(module: AdminModuleKey, id: string) {
  const definition = adminModuleDefinitions[module];
  if (!definition.table) throw new Error("Module cannot be deleted");
  const supabase = adminClient();
  const { error } = await supabase.from(definition.table).delete().eq("id", id);
  if (error) throw new Error(error.message);
  return { ok: true };
}

async function createManualOrder(body: JsonRecord) {
  const productId = String(body.product_id || "");
  if (!productId) {
    const supabase = adminClient();
    const total = Number(body.total || body.subtotal || 0);
    const orderNumber = `RV-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.floor(1000 + Math.random() * 9000)}`;
    const { data, error } = await supabase
      .from("orders")
      .insert({
        order_number: orderNumber,
        customer_name: String(body.customer_name || "Manual Order"),
        customer_email: String(body.customer_email || ""),
        customer_phone: String(body.customer_phone || "0000000000"),
        shipping_address: {
          address: String(body.address || "Manual admin order"),
          city: String(body.city || ""),
          province: String(body.province || "Punjab"),
          postalCode: String(body.postal_code || ""),
        },
        subtotal: Number(body.subtotal || total),
        delivery_fee: Number(body.delivery_fee || 0),
        total,
        payment_method: body.payment_method === "advance_cash" ? "advance_cash" : body.payment_method === "bank_transfer" ? "bank_transfer" : "cod",
        payment_status: String(body.payment_status || "pending_collection"),
        fulfillment_status: String(body.fulfillment_status || "new"),
        admin_notes: String(body.admin_notes || "Created manually from admin panel."),
      })
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    return data;
  }

  const input: CheckoutOrderInput = {
    customer: {
      firstName: String(body.customer_name || "Manual"),
      lastName: "Order",
      email: String(body.customer_email || "manual@ranavelvet.com"),
      phone: String(body.customer_phone || "0000000000"),
      address: String(body.address || "Manual admin order"),
      city: String(body.city || ""),
      province: String(body.province || "Punjab"),
      postalCode: String(body.postal_code || ""),
    },
    paymentMethod: body.payment_method === "advance_cash" ? "advance_cash" : body.payment_method === "bank_transfer" ? "bank_transfer" : "cod",
    items: [
      {
        productId,
        name: String(body.product_name || "Manual order item"),
        slug: String(body.product_slug || "manual-order-item"),
        price: Number(body.subtotal || body.total || 0),
        quantity: 1,
      },
    ],
    deliveryFee: Number(body.delivery_fee || 0),
    subtotal: Number(body.subtotal || body.total || 0),
    total: Number(body.total || body.subtotal || 0),
  };
  return createOrder(input);
}

async function createInventoryMovement(body: JsonRecord) {
  const supabase = adminClient();
  const productId = String(body.product_id || "");
  const quantity = Number(body.quantity || 0);
  const movementType = String(body.movement_type || "adjustment");
  if (!productId || !quantity) throw new Error("Product ID and quantity are required");

  const { data, error } = await supabase
    .from("inventory_movements")
    .insert({
      product_id: productId,
      movement_type: movementType,
      quantity,
      note: body.note ? String(body.note) : "Admin stock adjustment",
      reference_type: "admin",
    })
    .select("*")
    .single();
  if (error) throw new Error(error.message);

  const { data: product } = await supabase.from("products").select("stock_quantity, stock, reserved_stock").eq("id", productId).maybeSingle();
  if (product) {
    const stockDelta = movementType === "reserved" ? 0 : quantity;
    const reservedDelta = movementType === "reserved" ? Math.abs(quantity) : movementType === "released" ? -Math.abs(quantity) : 0;
    const nextStock = Math.max(0, Number(product.stock_quantity || product.stock || 0) + stockDelta);
    const nextReserved = Math.max(0, Number(product.reserved_stock || 0) + reservedDelta);
    await supabase
      .from("products")
      .update({
        stock_quantity: nextStock,
        stock: nextStock,
        reserved_stock: nextReserved,
        stock_status: nextStock - nextReserved <= 0 ? "out_of_stock" : "in_stock",
        status: nextStock - nextReserved <= 0 ? "draft" : "active",
        is_active: nextStock - nextReserved > 0,
      })
      .eq("id", productId);
  }

  return data;
}

async function getPrintQueue() {
  const supabase = adminClient();
  const [{ data: orders, error }, { data: logs }] = await Promise.all([
    supabase.from("orders").select("*, order_items(*)").neq("fulfillment_status", "delivered").order("created_at", { ascending: false }),
    supabase.from("order_print_logs").select("*").order("created_at", { ascending: false }),
  ]);
  if (error) throw new Error(error.message);
  const rows = (orders || []).map((order) => ({
    ...order,
    print_count: (logs || []).filter((log) => log.order_id === order.id).length,
  }));
  return buildModuleResponse("print-orders", rows);
}

async function printOrders(body: JsonRecord) {
  const supabase = adminClient();
  const ids = Array.isArray(body.order_ids) ? body.order_ids.map(String) : String(body.order_ids || "").split(",").filter(Boolean);
  if (!ids.length) throw new Error("Select at least one order");
  const { data, error } = await supabase
    .from("order_print_logs")
    .insert(ids.map((order_id) => ({ order_id, document_type: "packing_slip" })))
    .select("*");
  if (error) throw new Error(error.message);
  return data;
}

export async function listMedia() {
  const supabase = adminClient();
  const buckets = ["products", "categories", "banners", "testimonials", "avatars"];
  const rows = [];
  for (const bucket of buckets) {
    const { data } = await supabase.storage.from(bucket).list("", { limit: 100, sortBy: { column: "created_at", order: "desc" } });
    for (const item of data || []) {
      const { data: publicUrl } = supabase.storage.from(bucket).getPublicUrl(item.name);
      rows.push({ id: `${bucket}/${item.name}`, bucket, name: item.name, size: item.metadata?.size || 0, url: publicUrl.publicUrl, created_at: item.created_at });
    }
  }
  return buildModuleResponse("media", rows);
}

export async function uploadMedia(file: File, bucket = "products") {
  const supabase = adminClient();
  const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]+/g, "-")}`;
  const { error } = await supabase.storage.from(bucket).upload(safeName, file, { upsert: false });
  if (error) throw new Error(error.message);
  const { data } = supabase.storage.from(bucket).getPublicUrl(safeName);
  return { id: `${bucket}/${safeName}`, bucket, name: safeName, url: data.publicUrl };
}

export async function deleteMedia(path: string) {
  const [bucket, ...nameParts] = path.split("/");
  if (!bucket || !nameParts.length) throw new Error("Invalid media path");
  const supabase = adminClient();
  const { error } = await supabase.storage.from(bucket).remove([nameParts.join("/")]);
  if (error) throw new Error(error.message);
  return { ok: true };
}

async function getReports() {
  const supabase = adminClient();
  const [{ data: orders }, { data: products }, { data: appointments }, { data: inquiries }] = await Promise.all([
    supabase.from("orders").select("*, order_items(*)"),
    supabase.from("products").select("*"),
    supabase.from("appointments").select("*"),
    supabase.from("inquiries").select("*"),
  ]);

  const totalRevenue = (orders || []).reduce((sum, order) => sum + Number(order.total || 0), 0);
  const rows = [
    { id: "orders", title: "Total Orders", status: "live", value: String((orders || []).length), meta: "All checkout and manual orders" },
    { id: "revenue", title: "Revenue", status: "live", value: currency(totalRevenue), meta: "Gross order value" },
    { id: "cod", title: "Pending COD", status: "follow-up", value: String((orders || []).filter((order) => order.payment_method === "cod" && order.payment_status !== "paid").length), meta: "Needs collection" },
    { id: "low-stock", title: "Low Stock", status: "inventory", value: String((products || []).filter((product) => Number(product.stock_quantity || product.stock || 0) - Number(product.reserved_stock || 0) <= 5).length), meta: "Five units or less" },
    { id: "appointments", title: "Appointments", status: "bookings", value: String((appointments || []).length), meta: "Showroom and consultation bookings" },
    { id: "inquiries", title: "Inquiries", status: "customer-care", value: String((inquiries || []).length), meta: "Contact submissions" },
  ];
  return buildModuleResponse("reports", rows);
}

function currency(value: number) {
  return `Rs. ${value.toLocaleString("en-PK")}`;
}

function buildModuleResponse(module: AdminModuleKey, rows: JsonRecord[]) {
  const definition = adminModuleDefinitions[module];
  const metrics = buildMetrics(module, rows);
  return { definition, metrics, rows: rows.map((row) => normalizeRow(module, row)) };
}

function buildMetrics(module: AdminModuleKey, rows: JsonRecord[]) {
  if (module === "orders" || module === "print-orders") {
    const total = rows.reduce((sum, row) => sum + Number(row.total || 0), 0);
    return [
      { label: "Records", value: String(rows.length), note: "Real Supabase rows" },
      { label: "Value", value: currency(total), note: "Queue total" },
      { label: "Open", value: String(rows.filter((row) => row.fulfillment_status !== "delivered").length), note: "Needs action" },
    ];
  }
  if (module === "inventory") {
    const totalMovement = rows.reduce((sum, row) => sum + Number(row.quantity || 0), 0);
    return [
      { label: "Movements", value: String(rows.length), note: "Audit events" },
      { label: "Net Units", value: String(totalMovement), note: "Movement sum" },
      { label: "Reservations", value: String(rows.filter((row) => row.movement_type === "reserved").length), note: "Order holds" },
    ];
  }
  if (module === "reports") {
    return rows.slice(0, 3).map((row) => ({ label: String(row.title), value: String(row.value), note: String(row.meta) }));
  }
  return [
    { label: "Records", value: String(rows.length), note: "Stored in Supabase" },
    { label: "Active", value: String(rows.filter((row) => row.is_active === true || row.status === "new" || row.status === "pending").length), note: "Visible or pending" },
    { label: "Updated", value: String(rows.filter((row) => row.updated_at || row.created_at).length), note: "Tracked rows" },
  ];
}

function normalizeRow(module: AdminModuleKey, row: JsonRecord) {
  const title =
    row.title ||
    row.name ||
    row.order_number ||
    row.key ||
    row.provider_key ||
    row.movement_type ||
    "Record";
  const status = row.status || row.fulfillment_status || row.payment_status || (row.is_active === false ? "inactive" : "active");
  const value =
    row.total !== undefined
      ? currency(Number(row.total))
      : row.price !== undefined
        ? currency(Number(row.price))
        : row.value !== undefined && typeof row.value !== "object"
          ? String(row.value)
          : module === "media"
            ? String(row.bucket)
            : String(row.created_at || row.updated_at || "");
  const meta = [
    row.subtitle,
    row.email,
    row.customer_email,
    row.phone || row.customer_phone,
    row.service,
    row.provider_key,
    row.bucket,
    row.note,
  ]
    .filter(Boolean)
    .join(" - ");
  return { ...row, _title: String(title), _status: String(status), _value: String(value), _meta: meta || String(row.created_at || "") };
}

export async function exportModuleCsv(module: AdminModuleKey) {
  const payload = await listModuleRows(module);
  const rows: JsonRecord[] = "rows" in payload ? (payload.rows as JsonRecord[]) : [];
  const keys = Array.from(new Set(rows.flatMap((row) => Object.keys(row).filter((key) => !key.startsWith("_")))));
  const csv = [keys, ...rows.map((row) => keys.map((key) => serializeCsvCell(row[key])))]
    .map((line) => line.join(","))
    .join("\n");
  return csv;
}

function serializeCsvCell(value: unknown) {
  const text = typeof value === "object" && value !== null ? JSON.stringify(value) : String(value ?? "");
  return `"${text.replace(/"/g, '""')}"`;
}
