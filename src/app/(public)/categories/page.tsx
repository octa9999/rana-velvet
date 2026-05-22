import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const categories = [
  {
    name: "Bedroom Furniture",
    slug: "bedroom",
    description: "Transform your sanctuary with our curated bedroom pieces",
    icon: "🛏️",
    count: 24,
  },
  {
    name: "Living Room",
    slug: "living-room",
    description: "Create inviting spaces for family and guests",
    icon: "🛋️",
    count: 32,
  },
  {
    name: "Sofas & Seating",
    slug: "sofas",
    description: "Comfort meets elegance in every stitch",
    icon: "🪑",
    count: 18,
  },
  {
    name: "Curtains & Fabrics",
    slug: "curtains",
    description: "Signature velvets and premium textiles",
    icon: "🧵",
    count: 45,
  },
  {
    name: "Home Accessories",
    slug: "accessories",
    description: "The finishing touches that complete your space",
    icon: "✨",
    count: 56,
  },
  {
    name: "Custom Furniture",
    slug: "custom",
    description: "Bespoke pieces tailored to your vision",
    icon: "🎨",
    count: 12,
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
                  className="group bg-[var(--cream)] p-8 lg:p-10 hover:bg-[var(--light-stone)] transition-colors duration-500"
                >
                  <span className="text-5xl mb-6 block">{category.icon}</span>
                  <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-medium text-[var(--charcoal)] mb-3">
                    {category.name}
                  </h2>
                  <p className="font-[family-name:var(--font-sans)] text-sm text-[var(--warm-gray)] leading-relaxed mb-4">
                    {category.description}
                  </p>
                  <span className="font-[family-name:var(--font-sans)] text-sm text-[var(--warm-taupe)]">
                    {category.count} Products
                  </span>
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