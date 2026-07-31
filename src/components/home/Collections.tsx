"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const collections = [
  {
    title: "Bedroom",
    subtitle: "Sanctuary Collection",
    description: "Transform your sanctuary with our curated bedroom pieces",
    href: "/categories/bedroom",
    count: 24,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",
  },
  {
    title: "Living Room",
    subtitle: "Gathering Collection",
    description: "Create inviting spaces for family and guests",
    href: "/categories/living-room",
    count: 32,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
  },
  {
    title: "Sofas & Seating",
    subtitle: "Comfort Collection",
    description: "Comfort meets elegance in every stitch",
    href: "/categories/sofas",
    count: 18,
    image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800&q=80",
  },
  {
    title: "Ready-Made Curtains",
    subtitle: "Velvet Collection",
    description: "Signature velvets and premium textiles",
    href: "/categories/curtains",
    count: 45,
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80",
  },
  {
    title: "Home Decor",
    subtitle: "Artisan Collection",
    description: "The finishing touches that complete your space",
    href: "/categories/accessories",
    count: 56,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
  },
  {
    title: "Custom Furniture",
    subtitle: "Bespoke Collection",
    description: "Bespoke pieces tailored to your vision",
    href: "/custom-furniture",
    count: 12,
    image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&q=80",
  },
];

function AnimatedItem({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(50px)",
        transition: `opacity 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}ms, transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export function Collections() {
  return (
    <section className="py-16 lg:py-24 bg-[var(--charcoal)]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-20">
          <AnimatedItem>
            <span className="label-uppercase text-[var(--gold)] mb-4 lg:mb-6 block">
              Discover
            </span>
          </AnimatedItem>
          <AnimatedItem delay={100}>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-light text-white tracking-tight">
              Our Collections
            </h2>
          </AnimatedItem>
          <AnimatedItem delay={200}>
            <p className="font-[family-name:var(--font-sans)] text-base lg:text-lg text-[var(--text-secondary)] mt-4 lg:mt-6 max-w-xl mx-auto px-4 font-light">
              Handcrafted luxury pieces designed to transform your space into a sanctuary of elegance
            </p>
          </AnimatedItem>
        </div>

        {/* Collections Grid - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {collections.map((collection, index) => (
            <AnimatedItem key={collection.title} delay={index * 100}>
              <Link href={collection.href} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-[var(--card)] rounded-xl sm:rounded-2xl">
                  {/* Background Image */}
                  <img
                    src={collection.image}
                    alt={collection.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {/* Product Count Badge - Gold Theme */}
                  <div className="absolute top-3 right-3 sm:top-5 sm:right-5">
                    <span className="px-3 py-1.5 sm:px-5 sm:py-2.5 bg-[var(--gold)] rounded-full font-[family-name:var(--font-sans)] text-[10px] sm:text-xs uppercase tracking-wider text-[var(--charcoal)] font-medium">
                      {collection.count} Pieces
                    </span>
                  </div>

                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
                    <h3 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl lg:text-4xl font-light text-white mb-2 sm:mb-3">
                      {collection.title}
                    </h3>
                    <p className="font-[family-name:var(--font-sans)] text-xs sm:text-sm uppercase tracking-[0.15em] text-white/60 mb-4 sm:mb-6 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      {collection.subtitle}
                    </p>
                    <div className="flex items-center gap-2 sm:gap-3 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                      <span className="label-uppercase text-white text-[10px] sm:text-xs">
                        Explore
                      </span>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                  </div>

                  {/* Left Border Accent */}
                  <div className="absolute left-0 top-1/4 bottom-1/4 w-[2px] bg-[var(--gold)] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                </div>
              </Link>
            </AnimatedItem>
          ))}
        </div>
      </div>
    </section>
  );
}
