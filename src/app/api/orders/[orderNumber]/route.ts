import { NextResponse } from "next/server";
import { getOrderByNumber } from "@/lib/orders";

export async function GET(_: Request, context: { params: Promise<{ orderNumber: string }> }) {
  const { orderNumber } = await context.params;
  const order = await getOrderByNumber(orderNumber);
  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });
  return NextResponse.json({ order });
}
