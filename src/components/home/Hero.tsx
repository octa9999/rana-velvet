import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-[var(--cream)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content - Text */}
          <div className="max-w-xl z-10">
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
              Premium furniture and signature velvets crafted since 1960. Experience the difference of true craftsmanship and quality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 bg-[var(--charcoal)] text-white font-[family-name:var(--font-sans)] font-medium px-8 py-4 hover:bg-[var(--deep-brown)] transition-colors duration-300"
              >
                Shop Now
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/categories"
                className="inline-flex items-center justify-center gap-2 bg-transparent border border-[var(--charcoal)] text-[var(--charcoal)] font-[family-name:var(--font-sans)] font-medium px-8 py-4 hover:bg-[var(--charcoal)] hover:text-white transition-colors duration-300"
              >
                Explore Collections
              </Link>
            </div>
          </div>

          {/* Right Visual - Full Rectangle Image with Overlay Text */}
          <div className="relative hidden lg:block">
            <div className="aspect-[4/5] w-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80"
                alt="Luxury sofa in modern living room"
                className="w-full h-full object-cover"
              />
              {/* Overlay Text on Image */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-10">
                <div className="flex items-center gap-4 mb-3">
                  <span className="w-8 h-[2px] bg-[var(--gold)]"></span>
                  <span className="font-[family-name:var(--font-sans)] text-xs text-white/80 uppercase tracking-wider">
                    New Collection 2025
                  </span>
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] text-3xl font-light text-white mb-2">
                  Premium Velvet Sofas
                </h3>
                <p className="font-[family-name:var(--font-sans)] text-sm text-white/70 mb-6 max-w-xs">
                  Handcrafted with the finest materials for lasting comfort
                </p>
                <Link
                  href="/products/cloud-comfort-sofa"
                  className="inline-flex items-center gap-2 bg-white text-[var(--charcoal)] font-[family-name:var(--font-sans)] font-medium px-6 py-3 w-fit hover:bg-[var(--cream)] transition-colors duration-300"
                >
                  View Product
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            {/* Decorative border element */}
            <div className="absolute -top-4 -right-4 w-20 h-20 border border-[var(--warm-taupe)]/30 -z-10"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[var(--warm-taupe)]/10 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}