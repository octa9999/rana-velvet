"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    if (!supabase) {
      router.push("/admin");
      return;
    }

    const auth = supabase.auth as unknown as {
      signInWithPassword(credentials: { email: string; password: string }): Promise<{ error: { message: string } | null }>;
    };
    const { error: authError } = await auth.signInWithPassword({ email, password });
    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    router.push("/admin");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#e9ebe9] p-4 sm:p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="block text-center mb-8">
          <span className="font-[family-name:var(--font-playfair)] text-3xl font-semibold text-[var(--charcoal)]">
            Rana Velvet
          </span>
          <p className="font-[family-name:var(--font-sans)] text-sm text-[var(--warm-gray)] mt-1">
            Admin Dashboard
          </p>
        </Link>

        {/* Login Form */}
        <div className="rounded-[32px] border border-black/5 bg-white p-6 shadow-2xl shadow-black/10 sm:p-8">
          <h1 className="font-[family-name:var(--font-playfair)] text-2xl font-light text-[var(--charcoal)] mb-2">
            Welcome Back
          </h1>
          <p className="font-[family-name:var(--font-sans)] text-sm text-[var(--warm-gray)] mb-8">
            Sign in to access your admin dashboard
          </p>
          {error && <p className="mb-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-[family-name:var(--font-sans)] text-sm font-medium text-[var(--charcoal)] mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 w-full rounded-[18px] border border-black/10 bg-[#f8f8f6] px-4 font-[family-name:var(--font-sans)] text-sm outline-none transition focus:border-[#0d6b3f] focus:bg-white"
                placeholder="admin@ranavelvet.com"
                required
              />
            </div>
            <div>
              <label className="block font-[family-name:var(--font-sans)] text-sm font-medium text-[var(--charcoal)] mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-14 w-full rounded-[18px] border border-black/10 bg-[#f8f8f6] px-4 font-[family-name:var(--font-sans)] text-sm outline-none transition focus:border-[#0d6b3f] focus:bg-white"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded-[5px] border-black/10"
                />
                <span className="font-[family-name:var(--font-sans)] text-sm text-[var(--warm-gray)]">
                  Remember me
                </span>
              </label>
              <a href="#" className="font-[family-name:var(--font-sans)] text-sm text-[var(--warm-taupe)] hover:underline">
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="h-14 w-full rounded-full bg-[#0d6b3f] font-[family-name:var(--font-sans)] font-semibold text-white shadow-lg shadow-emerald-900/15 transition hover:-translate-y-0.5 hover:bg-[#095b35] disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-center mt-6 font-[family-name:var(--font-sans)] text-sm text-[var(--warm-gray)]">
          <Link href="/" className="text-[var(--warm-taupe)] hover:underline">
            Back to Website
          </Link>
        </p>
      </div>
    </div>
  );
}
