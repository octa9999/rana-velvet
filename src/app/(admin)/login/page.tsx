"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // For demo - in production would use Supabase auth
    setTimeout(() => {
      router.push("/admin");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[var(--cream)] flex items-center justify-center p-6">
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
        <div className="bg-white border border-[var(--border)] p-8">
          <h1 className="font-[family-name:var(--font-playfair)] text-2xl font-light text-[var(--charcoal)] mb-2">
            Welcome Back
          </h1>
          <p className="font-[family-name:var(--font-sans)] text-sm text-[var(--warm-gray)] mb-8">
            Sign in to access your admin dashboard
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-[family-name:var(--font-sans)] text-sm font-medium text-[var(--charcoal)] mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-[var(--border)] font-[family-name:var(--font-sans)] text-sm focus:outline-none focus:border-[var(--warm-taupe)]"
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
                className="w-full px-4 py-3 border border-[var(--border)] font-[family-name:var(--font-sans)] text-sm focus:outline-none focus:border-[var(--warm-taupe)]"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-[var(--border)]"
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
              className="w-full bg-[var(--charcoal)] text-white font-[family-name:var(--font-sans)] font-medium py-3 hover:bg-[var(--deep-brown)] transition-colors disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-center mt-6 font-[family-name:var(--font-sans)] text-sm text-[var(--warm-gray)]">
          <Link href="/" className="text-[var(--warm-taupe)] hover:underline">
            ← Back to Website
          </Link>
        </p>
      </div>
    </div>
  );
}