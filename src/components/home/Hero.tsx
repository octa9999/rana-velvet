"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center bg-[var(--charcoal)] overflow-hidden">
      {/* Background Image with padding */}
      <div
        className="absolute inset-2 sm:inset-4 lg:inset-8 rounded-xl sm:rounded-2xl bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/hero.png)",
          transform: loaded ? "scale(1)" : "scale(1.05)",
          transition: "transform 1.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60 rounded-xl sm:rounded-2xl" />
      </div>

      {/* Content */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-24 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content - Text */}
          <div className="max-w-xl lg:max-w-2xl z-10">
            {/* Uppercase label - slide in from left */}
            <div
              className="flex items-center gap-3 mb-6 sm:mb-10"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateX(0)" : "translateX(-30px)",
                transition: "all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) 0.2s",
              }}
            >
              <span className="w-10 sm:w-16 h-[1px] bg-[var(--gold)]" />
              <span className="label-uppercase text-[var(--gold)] text-xs sm:text-sm">
                Since 1960
              </span>
            </div>

            {/* Large serif heading - fade up */}
            <h1
              className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-[5rem] font-light text-white tracking-tight leading-[1.1] sm:leading-[1.05] mb-6 sm:mb-8 lg:mb-10"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(40px)",
                transition: "all 1s cubic-bezier(0.25, 0.1, 0.25, 1) 0.4s",
              }}
            >
              Luxury That
              <br />
              Feels Like Home
            </h1>

            {/* Description - fade up */}
            <p
              className="font-[family-name:var(--font-sans)] text-base sm:text-lg lg:text-xl text-white/60 leading-relaxed mb-8 sm:mb-12 lg:mb-14 max-w-md font-light"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(30px)",
                transition: "all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) 0.6s",
              }}
            >
              Premium furniture and signature velvets crafted since 1960. Experience the difference of true craftsmanship and quality.
            </p>

            {/* CTA buttons - fade up staggered */}
            <div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-5"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(30px)",
                transition: "all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) 0.8s",
              }}
            >
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-white text-[var(--charcoal)] font-[family-name:var(--font-sans)] text-xs sm:text-sm font-medium uppercase tracking-[0.15em] px-6 sm:px-8 lg:px-12 py-4 sm:py-5 hover:bg-[var(--gold)] transition-all duration-500"
              >
                Shop Now
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
              <Link
                href="/categories"
                className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-transparent border border-white/30 text-white font-[family-name:var(--font-sans)] text-xs sm:text-sm font-medium uppercase tracking-[0.15em] px-6 sm:px-8 lg:px-12 py-4 sm:py-5 hover:bg-white hover:text-[var(--charcoal)] transition-all duration-500"
              >
                Explore Collections
              </Link>
            </div>
          </div>

          {/* Right side empty */}
          <div className="hidden lg:block" />
        </div>
      </div>
    </section>
  );
}
