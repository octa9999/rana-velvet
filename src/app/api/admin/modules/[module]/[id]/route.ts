import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { deleteMedia, deleteModuleRow, getModuleDefinition, updateModuleRow, type AdminModuleKey } from "@/lib/admin-modules";

async function guard() {
  const auth = await requireAdmin();
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });
  return null;
}

export async function PATCH(request: Request, context: { params: Promise<{ module: string; id: string }> }) {
  const blocked = await guard();
  if (blocked) return blocked;

  try {
    const { module, id } = await context.params;
    if (!getModuleDefinition(module)) return NextResponse.json({ error: "Unknown admin module" }, { status: 404 });
    const row = await updateModuleRow(module as AdminModuleKey, id, await request.json());
    return NextResponse.json({ row });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Update failed" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: { params: Promise<{ module: string; id: string }> }) {
  const blocked = await guard();
  if (blocked) return blocked;

  try {
    const { module, id } = await context.params;
    if (!getModuleDefinition(module)) return NextResponse.json({ error: "Unknown admin module" }, { status: 404 });
    const result = module === "media" ? await deleteMedia(decodeURIComponent(id)) : await deleteModuleRow(module as AdminModuleKey, id);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Delete failed" }, { status: 500 });
  }
}
