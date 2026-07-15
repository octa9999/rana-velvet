import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { deleteCategory } from "@/lib/catalog";

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin();
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const { id } = await params;
  const { error } = await deleteCategory(id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
