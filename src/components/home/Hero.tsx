import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-[var(--cream)]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--charcoal) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-12 h-[2px] bg-[var(--warm-taupe)]"></span>
              <span className="font-[family-name:var(--font-sans)] text-sm font-medium uppercase tracking-[0.2em] text-[var(--warm-taupe)]">
                Since 1960
              </span>
            </div>
            <h1 className="font-[family-name:var(--font-playfair)] text-5xl lg:text-7xl font-light text-[var(--charcoal)] leading-[1.1] mb-6">
              Luxury That
              <br />
              Feels Like Home
            </h1>
            <p className="font-[family-name:var(--font-sans)] text-lg text-[var(--warm-gray)] leading-relaxed mb-10 max-w-md">
              Premium furniture & signature velvets crafted since 1960. Experience the difference of true craftsmanship and quality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/categories"
                className="inline-flex items-center justify-center gap-2 bg-[var(--charcoal)] text-white font-[family-name:var(--font-sans)] font-medium px-8 py-4 hover:bg-[var(--deep-brown)] transition-colors duration-300"
              >
                Shop Collection
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/consultation"
                className="inline-flex items-center justify-center gap-2 bg-transparent border border-[var(--charcoal)] text-[var(--charcoal)] font-[family-name:var(--font-sans)] font-medium px-8 py-4 hover:bg-[var(--charcoal)] hover:text-white transition-colors duration-300"
              >
                Book Free Consultation
              </Link>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative hidden lg:block">
            <div className="aspect-[4/5] bg-gradient-to-br from-[#E8E6E1] to-[#D4D0C8] rounded-sm overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[60%] h-[70%] bg-gradient-to-br from-[#C4A77D]/20 to-[#8B7355]/10 rounded-sm transform rotate-3"></div>
              </div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-8 -left-8 w-32 h-32 border border-[var(--gold)]/30"></div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[var(--warm-taupe)]/10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}