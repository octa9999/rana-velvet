import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { deleteProduct } from "@/lib/catalog";

export async function DELETE(_: Request, context: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin();
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const { id } = await context.params;
  const { error } = await deleteProduct(id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
