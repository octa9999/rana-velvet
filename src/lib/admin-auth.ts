import { createServerSupabase } from "@/lib/supabase/server";

export type AdminRole = "super_admin" | "admin" | "editor";

export async function requireAdmin() {
  const supabase = await createServerSupabase();
  if (!supabase) return { ok: false as const, status: 503, error: "Supabase is not configured" };

  const auth = supabase.auth as unknown as {
    getUser(): Promise<{ data: { user: { id: string } | null }; error: Error | null }>;
  };

  const {
    data: { user },
    error: userError,
  } = await auth.getUser();

  if (userError || !user) return { ok: false as const, status: 401, error: "Admin login required" };

  const { data: adminUser, error } = await supabase
    .from("admin_users")
    .select("id, user_id, email, name, role, is_active")
    .eq("user_id", user.id)
    .eq("is_active", true)
    .in("role", ["super_admin", "admin", "editor"])
    .maybeSingle();

  if (error || !adminUser) return { ok: false as const, status: 403, error: "Admin access required" };

  return { ok: true as const, user, adminUser };
}
