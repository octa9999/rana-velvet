import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const categories = [
  {
    name: "Bedroom Furniture",
    slug: "bedroom",
    description: "Transform your sanctuary with our curated bedroom pieces",
    count: 24,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&q=80",
  },
  {
    name: "Living Room",
    slug: "living-room",
    description: "Create inviting spaces for family and guests",
    count: 32,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
  },
  {
    name: "Sofas & Seating",
    slug: "sofas",
    description: "Comfort meets elegance in every stitch",
    count: 18,
    image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=600&q=80",
  },
  {
    name: "Curtains & Fabrics",
    slug: "curtains",
    description: "Signature velvets and premium textiles",
    count: 45,
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80",
  },
  {
    name: "Home Accessories",
    slug: "accessories",
    description: "The finishing touches that complete your space",
    count: 56,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
  },
  {
    name: "Custom Furniture",
    slug: "custom",
    description: "Bespoke pieces tailored to your vision",
    count: 12,
    image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=600&q=80",
  },
];

export default function CategoriesPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-24 lg:py-32 bg-[var(--cream)]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="max-w-3xl mx-auto text-center">
              <span className="font-[family-name:var(--font-sans)] text-sm font-medium uppercase tracking-[0.2em] text-[var(--warm-taupe)] mb-4 block">
                Our Collections
              </span>
              <h1 className="font-[family-name:var(--font-playfair)] text-4xl lg:text-6xl font-light text-[var(--charcoal)] mb-8">
                Explore Our Collections
              </h1>
              <p className="font-[family-name:var(--font-sans)] text-lg text-[var(--warm-gray)] leading-relaxed">
                Browse through our carefully curated collections of premium furniture and fabrics, designed to transform your space.
              </p>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-24 lg:py-32 bg-white">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/categories/${category.slug}`}
                  className="group relative overflow-hidden bg-[var(--cream)] hover:bg-[var(--light-stone)] transition-colors duration-500"
                >
                  {/* Background Image */}
                  <div className="aspect-[4/5] relative">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-medium text-white mb-2">
                        {category.name}
                      </h2>
                      <p className="font-[family-name:var(--font-sans)] text-sm text-white/80 leading-relaxed mb-4">
                        {category.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-[family-name:var(--font-sans)] text-sm text-white/60">
                          {category.count} Products
                        </span>
                        <ArrowRight className="w-5 h-5 text-white/60 group-hover:translate-x-2 group-hover:text-white transition-all" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}