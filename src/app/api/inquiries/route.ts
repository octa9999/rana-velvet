import { NextResponse } from "next/server";
import { z, ZodError } from "zod";
import { createAdminSupabase } from "@/lib/supabase/server";

const inquirySchema = z.object({
  name: z.string().min(2),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(5),
});

export async function POST(request: Request) {
  try {
    const input = inquirySchema.parse(await request.json());
    const supabase = createAdminSupabase();
    if (!supabase) return NextResponse.json({ error: "Supabase is not configured" }, { status: 503 });
    const { data, error } = await supabase.from("inquiries").insert({ ...input, email: input.email || "no-email@ranavelvet.local", status: "new" }).select("*").single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ inquiry: data }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) return NextResponse.json({ error: "Invalid inquiry", details: error.issues }, { status: 400 });
    return NextResponse.json({ error: "Inquiry submission failed" }, { status: 500 });
  }
}
