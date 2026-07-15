"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Heart, ShoppingBag } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

type FeaturedProduct = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  href?: string;
  image: string;
};

const seedProducts: FeaturedProduct[] = [
  {
    id: "1",
    name: "Velvet Royale Bed",
    slug: "velvet-royale-bed",
    description: "Luxurious velvet upholstered bed with premium frame",
    price: 89999,
    category: "Bedroom",
    href: "/products/velvet-royale-bed",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",
  },
  {
    id: "2",
    name: "Cloud Comfort Sofa",
    slug: "cloud-comfort-sofa",
    description: "3-seater plush sofa in premium velvet fabric",
    price: 129999,
    category: "Living Room",
    href: "/products/cloud-comfort-sofa",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
  },
  {
    id: "3",
    name: "Elite Ottoman",
    slug: "elite-ottoman",
    description: "Multi-functional ottoman with storage space",
    price: 34999,
    category: "Seating",
    href: "/products/elite-ottoman",
    image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800&q=80",
  },
  {
    id: "4",
    name: "Imperial Curtains",
    slug: "imperial-curtains",
    description: "Premium heavy velvet curtains with elegant drapes",
    price: 12999,
    category: "Curtains",
    href: "/products/imperial-curtains",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80",
  },
];

function formatPrice(price: number) {
  return `Rs. ${price.toLocaleString("en-PK")}`;
}

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

export function FeaturedProducts() {
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();
  const { addItem: addToCart } = useCart();
  const [products, setProducts] = useState<FeaturedProduct[]>(seedProducts);

  useEffect(() => {
    fetch("/api/catalog/products?featured=true")
      .then((response) => response.json())
      .then((payload) => {
        if (Array.isArray(payload.products) && payload.products.length) {
          setProducts(payload.products.map((product: FeaturedProduct) => ({ ...product, href: `/products/${product.slug}` })));
        }
      })
      .catch(() => setProducts(seedProducts));
  }, []);

  return (
    <section className="py-16 lg:py-24 bg-[var(--charcoal)] relative overflow-hidden">
      {/* Subtle Radial Gold Glow */}
      <div className="absolute inset-0 bg-radial-gold opacity-[0.04] pointer-events-none" />

      {/* Decorative Corner Frames */}
      <div className="absolute top-4 left-4 w-12 h-12 border-l border-t border-[var(--gold)]/20" />
      <div className="absolute top-4 right-4 w-12 h-12 border-r border-t border-[var(--gold)]/20" />
      <div className="absolute bottom-4 left-4 w-12 h-12 border-l border-b border-[var(--gold)]/20" />
      <div className="absolute bottom-4 right-4 w-12 h-12 border-r border-b border-[var(--gold)]/20" />

      {/* Floating Gold Accent Lines */}
      <div className="absolute top-0 left-1/4 w-px h-24 bg-gradient-to-b from-[var(--gold)]/30 to-transparent" />
      <div className="absolute top-0 right-1/4 w-px h-24 bg-gradient-to-b from-[var(--gold)]/30 to-transparent" />
      <div className="absolute bottom-0 left-1/3 w-px h-16 bg-gradient-to-t from-[var(--gold)]/20 to-transparent" />
      <div className="absolute bottom-0 right-1/3 w-px h-16 bg-gradient-to-t from-[var(--gold)]/20 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 lg:mb-20 gap-4">
          <div className="text-center lg:text-left">
            <AnimatedItem>
              <span className="label-uppercase text-[var(--gold)] mb-4 lg:mb-6 block">
                Curated
              </span>
            </AnimatedItem>
            <AnimatedItem delay={100}>
              <h2 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-white tracking-tight">
                Featured Pieces
              </h2>
            </AnimatedItem>
            <AnimatedItem delay={200}>
              <p className="font-[family-name:var(--font-sans)] text-base lg:text-lg text-[var(--text-secondary)] mt-4 max-w-xl font-light hidden sm:block">
                Discover our most loved pieces, crafted with premium materials for lasting comfort
              </p>
            </AnimatedItem>
          </div>
          <AnimatedItem delay={300}>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 lg:gap-3 font-[family-name:var(--font-sans)] text-xs lg:text-sm uppercase tracking-wider text-white hover:text-[var(--gold)] transition-colors mt-4 lg:mt-0 self-center lg:self-auto group"
            >
              View All
              <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </AnimatedItem>
        </div>

        {/* Products Grid - Responsive */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          {products.map((product, index) => (
            <AnimatedItem key={product.id} delay={index * 100}>
              <Link href={product.href || `/products/${product.slug}`} className="group block">
                <div className="relative overflow-hidden bg-[var(--charcoal)] rounded-xl sm:rounded-2xl border border-white/[0.03] hover:border-[var(--gold)]/30 transition-all duration-500">
                  <div className="aspect-[3/4] relative">
                    {/* Product Image */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-[800ms] ease-out group-hover:scale-105 group-hover:brightness-110"
                    />

                    {/* Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                    {/* Category Tag - Gold Theme */}
                    <div className="absolute top-3 left-3 sm:top-5 sm:left-5">
                      <span className="px-3 py-1.5 sm:px-5 sm:py-2.5 bg-[var(--gold)] rounded-full font-[family-name:var(--font-sans)] text-[10px] sm:text-xs uppercase tracking-wider text-[var(--charcoal)] font-medium">
                        {product.category}
                      </span>
                    </div>

                    {/* Shimmer Sweep Overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-[1400ms] ease-out" />
                    </div>

                    {/* Action Buttons - Gold Theme */}
                    <div className="absolute top-3 right-3 sm:top-5 sm:right-5 flex flex-col gap-2 sm:gap-3 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          if (isInWishlist(product.id)) {
                            removeFromWishlist(product.id);
                          } else {
                            addToWishlist({ id: product.id, name: product.name, slug: product.slug, price: product.price, category: product.category, image: product.image, color: product.category });
                          }
                        }}
                        className="w-10 h-10 sm:w-12 sm:h-12 bg-[var(--gold)] rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg"
                      >
                        <Heart className={`w-4 h-4 sm:w-5 sm:h-5 text-[var(--charcoal)] ${isInWishlist(product.id) ? "fill-current" : ""}`} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart({ id: product.id, name: product.name, slug: product.slug, price: product.price, category: product.category, image: product.image, quantity: 1, color: product.category });
                        }}
                        className="w-10 h-10 sm:w-12 sm:h-12 bg-[var(--gold)] rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg"
                      >
                        <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--charcoal)]" />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 lg:p-8">
                      <h3 className="font-[family-name:var(--font-playfair)] text-lg sm:text-xl lg:text-2xl font-light text-white mb-1 sm:mb-2">
                        {product.name}
                      </h3>
                      <p className="font-[family-name:var(--font-sans)] text-xs sm:text-sm lg:text-base text-white/60 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </AnimatedItem>
          ))}
        </div>
      </div>
    </section>
  );
}
