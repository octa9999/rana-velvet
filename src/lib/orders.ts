import { z } from "zod";
import { createAdminSupabase, createServerSupabase } from "@/lib/supabase/server";
import { adminOrders } from "@/lib/admin-data";

export const orderItemSchema = z.object({
  productId: z.string().min(1),
  name: z.string().min(1),
  slug: z.string().min(1),
  price: z.number().nonnegative(),
  quantity: z.number().int().positive(),
  image: z.string().optional(),
  color: z.string().optional(),
});

export const checkoutOrderSchema = z.object({
  customer: z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(7),
    address: z.string().min(5),
    city: z.string().min(1),
    province: z.string().min(1),
    postalCode: z.string().optional(),
  }),
  paymentMethod: z.enum(["cod", "bank_transfer", "advance_cash"]),
  items: z.array(orderItemSchema).min(1),
  deliveryFee: z.number().nonnegative(),
  subtotal: z.number().nonnegative(),
  total: z.number().positive(),
}).superRefine((order, context) => {
  if (order.paymentMethod === "advance_cash" && order.subtotal <= 20000) {
    context.addIssue({ code: "custom", path: ["paymentMethod"], message: "Advance Cash is available for orders above Rs. 20,000." });
  }
});

export type CheckoutOrderInput = z.infer<typeof checkoutOrderSchema>;

export type StoreOrder = {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  city: string;
  province: string;
  postal_code?: string | null;
  subtotal: number;
  delivery_fee: number;
  total: number;
  payment_method: "cod" | "bank_transfer" | "advance_cash";
  payment_status: string;
  fulfillment_status: string;
  created_at: string;
  items: Array<{
    id: string;
    product_id: string;
    product_name: string;
    product_slug: string;
    quantity: number;
    unit_price: number;
    total_price: number;
    image?: string | null;
    color?: string | null;
  }>;
};

type DbOrderRow = Record<string, unknown> & {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email?: string;
  customer_phone: string;
  shipping_address?: {
    address?: string;
    city?: string;
    province?: string;
    postalCode?: string;
  };
};

type DbOrderItemRow = Record<string, unknown> & {
  id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  selected_variant?: {
    slug?: string;
    image?: string;
    color?: string;
  };
};

function nextOrderNumber() {
  const now = new Date();
  const date = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
  return `RV-${date}-${Math.floor(1000 + Math.random() * 9000)}`;
}

function fallbackOrder(input: CheckoutOrderInput): StoreOrder {
  return {
    id: crypto.randomUUID(),
    order_number: nextOrderNumber(),
    customer_name: `${input.customer.firstName} ${input.customer.lastName}`,
    customer_email: input.customer.email,
    customer_phone: input.customer.phone,
    shipping_address: input.customer.address,
    city: input.customer.city,
    province: input.customer.province,
    postal_code: input.customer.postalCode,
    subtotal: input.subtotal,
    delivery_fee: input.deliveryFee,
    total: input.total,
    payment_method: input.paymentMethod,
    payment_status: input.paymentMethod === "cod" ? "pending_collection" : input.paymentMethod === "advance_cash" ? "awaiting_advance_70" : "awaiting_transfer",
    fulfillment_status: "new",
    created_at: new Date().toISOString(),
    items: input.items.map((item) => ({
      id: crypto.randomUUID(),
      product_id: item.productId,
      product_name: item.name,
      product_slug: item.slug,
      quantity: item.quantity,
      unit_price: item.price,
      total_price: item.price * item.quantity,
      image: item.image,
      color: item.color,
    })),
  };
}

function orderFromRows(order: DbOrderRow, items: DbOrderItemRow[] = []): StoreOrder {
  const shipping = typeof order.shipping_address === "object" && order.shipping_address ? order.shipping_address : {};

  return {
    id: String(order.id),
    order_number: order.order_number,
    customer_name: order.customer_name,
    customer_email: order.customer_email || "",
    customer_phone: order.customer_phone,
    shipping_address: shipping.address || "",
    city: shipping.city || "",
    province: shipping.province || "",
    postal_code: shipping.postalCode || null,
    subtotal: Number(order.subtotal ?? 0),
    delivery_fee: Number(order.delivery_fee ?? 0),
    total: Number(order.total ?? 0),
    payment_method: order.payment_method === "advance_cash" ? "advance_cash" : order.payment_method === "bank_transfer" ? "bank_transfer" : "cod",
    payment_status: typeof order.payment_status === "string" ? order.payment_status : "pending",
    fulfillment_status: typeof order.fulfillment_status === "string" ? order.fulfillment_status : "new",
    created_at: typeof order.created_at === "string" ? order.created_at : new Date().toISOString(),
    items: items.map((item) => ({
      id: String(item.id),
      product_id: String(item.product_id),
      product_name: item.product_name,
      product_slug: item.selected_variant?.slug || "",
      quantity: Number(item.quantity),
      unit_price: Number(item.unit_price),
      total_price: Number(item.unit_price) * Number(item.quantity),
      image: item.selected_variant?.image,
      color: item.selected_variant?.color,
    })),
  };
}

function fallbackOrders(): StoreOrder[] {
  return adminOrders.map((order) => ({
    id: order.id,
    order_number: order.id,
    customer_name: order.customer,
    customer_email: "",
    customer_phone: "",
    shipping_address: "",
    city: order.city,
    province: "",
    subtotal: order.amount,
    delivery_fee: 0,
    total: order.amount,
    payment_method: order.payment === "Bank" ? "bank_transfer" : "cod",
    payment_status: order.payment === "COD" ? "pending_collection" : "awaiting_transfer",
    fulfillment_status: order.status,
    created_at: new Date().toISOString(),
    items: [],
  }));
}

export async function createOrder(input: CheckoutOrderInput) {
  const parsed = checkoutOrderSchema.parse(input);
  const supabase = createAdminSupabase();
  if (!supabase) return fallbackOrder(parsed);

  const reservationQuantities = new Map<string, number>();
  parsed.items.forEach((item) => {
    reservationQuantities.set(item.productId, (reservationQuantities.get(item.productId) || 0) + item.quantity);
  });
  const productIds = Array.from(reservationQuantities.keys());
  const { data: reservationProducts, error: reservationLookupError } = await supabase
    .from("products")
    .select("id, stock, stock_quantity, reserved_stock")
    .in("id", productIds);
  if (reservationLookupError || reservationProducts?.length !== productIds.length) {
    throw new Error(reservationLookupError?.message || "One or more products are unavailable");
  }

  reservationProducts.forEach((product) => {
    const stock = Number(product.stock_quantity ?? product.stock ?? 0);
    const available = Math.max(0, stock - Number(product.reserved_stock || 0));
    if ((reservationQuantities.get(product.id) || 0) > available) {
      throw new Error("Requested quantity is no longer available");
    }
  });

  const order_number = nextOrderNumber();
  const { data: order, error } = await supabase
    .from("orders")
    .insert({
      order_number,
      customer_name: `${parsed.customer.firstName} ${parsed.customer.lastName}`,
      customer_email: parsed.customer.email,
      customer_phone: parsed.customer.phone,
      shipping_address: {
        address: parsed.customer.address,
        city: parsed.customer.city,
        province: parsed.customer.province,
        postalCode: parsed.customer.postalCode,
      },
      subtotal: parsed.subtotal,
      delivery_fee: parsed.deliveryFee,
      total: parsed.total,
      payment_method: parsed.paymentMethod,
      payment_status: parsed.paymentMethod === "cod" ? "pending_collection" : parsed.paymentMethod === "advance_cash" ? "awaiting_advance_70" : "awaiting_transfer",
      fulfillment_status: "new",
    })
    .select()
    .single();

  if (error || !order) throw new Error(error?.message || "Order creation failed");

  const orderItems = parsed.items.map((item) => ({
    order_id: order.id,
    product_id: item.productId,
    product_name: item.name,
    quantity: item.quantity,
    unit_price: item.price,
    selected_variant: {
      slug: item.slug,
      image: item.image,
      color: item.color,
      lineTotal: item.price * item.quantity,
    },
  }));

  const { data: items, error: itemError } = await supabase.from("order_items").insert(orderItems).select();
  if (itemError) throw new Error(itemError.message);

  const movements = parsed.items.map((item) => ({
    product_id: item.productId,
    movement_type: "reserved",
    quantity: -item.quantity,
    reference_type: "order",
    reference_id: order.id,
    note: `Reserved by ${order_number}`,
  }));
  const { error: movementError } = await supabase.from("inventory_movements").insert(movements);
  if (movementError) throw new Error(movementError.message);

  for (const product of reservationProducts) {
    const quantity = reservationQuantities.get(product.id) || 0;
    const stock = Number(product.stock_quantity ?? product.stock ?? 0);
    const nextReserved = Math.max(0, Number(product.reserved_stock || 0) + quantity);
    const { error: productError } = await supabase
      .from("products")
      .update({
        reserved_stock: nextReserved,
        stock_status: stock - nextReserved <= 0 ? "out_of_stock" : "in_stock",
      })
      .eq("id", product.id);
    if (productError) throw new Error(productError.message);
  }

  return orderFromRows(order, items || []);
}

export async function getOrderByNumber(orderNumber: string) {
  const supabase = await createServerSupabase();
  if (!supabase) return null;

  const { data: order, error } = await supabase
    .from("orders")
    .select("*")
    .eq("order_number", orderNumber)
    .maybeSingle();

  if (error || !order) return null;

  const { data: items } = await supabase
    .from("order_items")
    .select("*")
    .eq("order_id", order.id)
    .order("created_at", { ascending: true });

  return orderFromRows(order, items || []);
}

export async function listOrders() {
  const supabase = await createServerSupabase();
  if (!supabase) return fallbackOrders();

  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .order("created_at", { ascending: false });

  if (error || !data) return fallbackOrders();
  return data.map((order) => orderFromRows(order, order.order_items || []));
}
