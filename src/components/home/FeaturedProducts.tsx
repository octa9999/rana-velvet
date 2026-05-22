import Link from "next/link";
import { ArrowRight } from "lucide-react";

const products = [
  {
    id: "1",
    name: "Velvet Royale Bed",
    description: "Luxurious velvet upholstered bed with premium frame",
    price: 89999,
    category: "Bedroom",
    href: "/products/velvet-royale-bed",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&q=80",
  },
  {
    id: "2",
    name: "Cloud Comfort Sofa",
    description: "3-seater plush sofa in premium velvet fabric",
    price: 129999,
    category: "Living Room",
    href: "/products/cloud-comfort-sofa",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
  },
  {
    id: "3",
    name: "Elite Ottoman",
    description: "Multi-functional ottoman with storage space",
    price: 34999,
    category: "Seating",
    href: "/products/elite-ottoman",
    image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=600&q=80",
  },
  {
    id: "4",
    name: "Imperial Curtains",
    description: "Premium heavy velvet curtains with elegant drapes",
    price: 12999,
    category: "Curtains",
    href: "/products/imperial-curtains",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80",
  },
];

function formatPrice(price: number) {
  return `Rs. ${price.toLocaleString("en-PK")}`;
}

export function FeaturedProducts() {
  return (
    <section className="py-24 lg:py-32 bg-[var(--cream)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
          <div>
            <span className="font-[family-name:var(--font-sans)] text-sm font-medium uppercase tracking-[0.2em] text-[var(--warm-taupe)] mb-4 block">
              Featured Products
            </span>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl lg:text-5xl font-light text-[var(--charcoal)]">
              Discover our most loved pieces
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 font-[family-name:var(--font-sans)] text-sm font-medium text-[var(--warm-taupe)] hover:text-[var(--charcoal)] transition-colors mt-6 lg:mt-0"
          >
            View All Products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link
              key={product.id}
              href={product.href}
              className="group bg-white"
            >
              {/* Image */}
              <div className="aspect-[3/4] bg-[var(--light-stone)] mb-6 overflow-hidden rounded-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Product Info */}
              <div className="px-2">
                <span className="font-[family-name:var(--font-sans)] text-xs text-[var(--warm-gray)] uppercase tracking-wider">
                  {product.category}
                </span>
                <h3 className="font-[family-name:var(--font-playfair)] text-lg font-medium text-[var(--charcoal)] mt-1 mb-2">
                  {product.name}
                </h3>
                <p className="font-[family-name:var(--font-sans)] text-sm text-[var(--warm-gray)] leading-relaxed mb-3">
                  {product.description}
                </p>
                <p className="font-[family-name:var(--font-sans)] text-base font-medium text-[var(--charcoal)]">
                  {formatPrice(product.price)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}