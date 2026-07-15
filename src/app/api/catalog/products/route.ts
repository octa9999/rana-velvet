import { NextResponse } from "next/server";
import { listProducts } from "@/lib/catalog";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const featured = searchParams.get("featured") === "true";
  const products = await listProducts({ featured, activeOnly: true });
  return NextResponse.json({ products });
}
