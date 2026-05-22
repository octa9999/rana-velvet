import Link from "next/link";
import { ArrowRight } from "lucide-react";

const collections = [
  {
    title: "Bedroom Furniture",
    description: "Transform your sanctuary with our curated bedroom pieces",
    href: "/categories/bedroom",
  },
  {
    title: "Living Room",
    description: "Create inviting spaces for family and guests",
    href: "/categories/living-room",
  },
  {
    title: "Sofas & Seating",
    description: "Comfort meets elegance in every stitch",
    href: "/categories/sofas",
  },
  {
    title: "Curtains & Fabrics",
    description: "Signature velvets and premium textiles",
    href: "/categories/curtains",
  },
  {
    title: "Home Accessories",
    description: "The finishing touches that complete your space",
    href: "/categories/accessories",
  },
  {
    title: "Custom Furniture",
    description: "Bespoke pieces tailored to your vision",
    href: "/custom-furniture",
  },
];

export function Collections() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-[family-name:var(--font-sans)] text-sm font-medium uppercase tracking-[0.2em] text-[var(--warm-taupe)] mb-4 block">
            Our Collections
          </span>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl lg:text-5xl font-light text-[var(--charcoal)]">
            Explore our carefully curated collections
          </h2>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <Link
              key={collection.title}
              href={collection.href}
              className="group bg-[var(--cream)] p-8 lg:p-10 hover:bg-[var(--light-stone)] transition-colors duration-500"
            >
              <div className="w-14 h-14 rounded-full bg-[var(--warm-taupe)]/10 flex items-center justify-center mb-6">
                <ArrowRight className="w-6 h-6 text-[var(--warm-taupe)] group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-medium text-[var(--charcoal)] mb-3">
                {collection.title}
              </h3>
              <p className="font-[family-name:var(--font-sans)] text-sm text-[var(--warm-gray)] leading-relaxed mb-6">
                {collection.description}
              </p>
              <span className="inline-flex items-center gap-2 font-[family-name:var(--font-sans)] text-sm font-medium text-[var(--warm-taupe)] group-hover:gap-4 transition-all duration-300">
                Explore Collection
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}