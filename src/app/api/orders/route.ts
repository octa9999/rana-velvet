import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { checkoutOrderSchema, createOrder, listOrders } from "@/lib/orders";

export async function GET() {
  const orders = await listOrders();
  return NextResponse.json({ orders });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = checkoutOrderSchema.parse(body);
    const order = await createOrder(input);
    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: "Invalid checkout data", details: error.issues }, { status: 400 });
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Order creation failed" },
      { status: 500 }
    );
  }
}
