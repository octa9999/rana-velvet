import { NextResponse } from "next/server";
import { z, ZodError } from "zod";
import { createAdminSupabase } from "@/lib/supabase/server";

const appointmentSchema = z.object({
  name: z.string().min(2),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().min(7),
  date: z.string().min(1),
  time: z.string().min(1),
  service: z.string().min(2),
  message: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const input = appointmentSchema.parse(await request.json());
    const supabase = createAdminSupabase();
    if (!supabase) return NextResponse.json({ error: "Supabase is not configured" }, { status: 503 });
    const { data, error } = await supabase.from("appointments").insert({ ...input, email: input.email || "no-email@ranavelvet.local", status: "pending" }).select("*").single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ appointment: data }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) return NextResponse.json({ error: "Invalid appointment", details: error.issues }, { status: 400 });
    return NextResponse.json({ error: "Appointment booking failed" }, { status: 500 });
  }
}
