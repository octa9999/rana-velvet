import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { requireAdmin } from "@/lib/admin-auth";
import { createModuleRow, exportModuleCsv, getModuleDefinition, listModuleRows, uploadMedia, type AdminModuleKey } from "@/lib/admin-modules";

async function guard() {
  const auth = await requireAdmin();
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });
  return null;
}

export async function GET(request: Request, context: { params: Promise<{ module: string }> }) {
  const blocked = await guard();
  if (blocked) return blocked;

  const { module } = await context.params;
  const definition = getModuleDefinition(module);
  if (!definition) return NextResponse.json({ error: "Unknown admin module" }, { status: 404 });

  const url = new URL(request.url);
  if (url.searchParams.get("format") === "csv") {
    const csv = await exportModuleCsv(module as AdminModuleKey);
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv;charset=utf-8",
        "Content-Disposition": `attachment; filename="${module}.csv"`,
      },
    });
  }

  const payload = await listModuleRows(module as AdminModuleKey);
  return NextResponse.json(payload);
}

export async function POST(request: Request, context: { params: Promise<{ module: string }> }) {
  const blocked = await guard();
  if (blocked) return blocked;

  try {
    const { module } = await context.params;
    const definition = getModuleDefinition(module);
    if (!definition) return NextResponse.json({ error: "Unknown admin module" }, { status: 404 });

    if (module === "media") {
      const form = await request.formData();
      const file = form.get("file");
      const bucket = String(form.get("bucket") || "products");
      if (!(file instanceof File)) return NextResponse.json({ error: "File is required" }, { status: 400 });
      const media = await uploadMedia(file, bucket);
      return NextResponse.json({ row: media }, { status: 201 });
    }

    const row = await createModuleRow(module as AdminModuleKey, await request.json());
    return NextResponse.json({ row }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) return NextResponse.json({ error: "Invalid module data", details: error.issues }, { status: 400 });
    return NextResponse.json({ error: error instanceof Error ? error.message : "Module action failed" }, { status: 500 });
  }
}
