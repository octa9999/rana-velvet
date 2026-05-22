import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight } from "lucide-react";

const products = [
  {
    id: "1",
    name: "Velvet Royale Bed",
    slug: "velvet-royale-bed",
    price: 89999,
    category: "Bedroom",
    description: "Luxurious velvet upholstered bed with premium frame",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&q=80",
  },
  {
    id: "2",
    name: "Cloud Comfort Sofa",
    slug: "cloud-comfort-sofa",
    price: 129999,
    category: "Living Room",
    description: "3-seater plush sofa in premium velvet fabric",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
  },
  {
    id: "3",
    name: "Elite Ottoman",
    slug: "elite-ottoman",
    price: 34999,
    category: "Seating",
    description: "Multi-functional ottoman with storage space",
    image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=600&q=80",
  },
  {
    id: "4",
    name: "Imperial Curtains",
    slug: "imperial-curtains",
    price: 12999,
    category: "Curtains",
    description: "Premium heavy velvet curtains with elegant drapes",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80",
  },
  {
    id: "5",
    name: "Royal Armchair",
    slug: "royal-armchair",
    price: 54999,
    category: "Seating",
    description: "Classic armchair with gold accents and premium velvet",
    image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&q=80",
  },
  {
    id: "6",
    name: "Diamond Coffee Table",
    slug: "diamond-coffee-table",
    price: 45999,
    category: "Living Room",
    description: "Elegant glass top coffee table with marble base",
    image: "https://images.unsplash.com/photo-1533090481720-856c6e5f6e2d?w=600&q=80",
  },
  {
    id: "7",
    name: "Silk Drape Collection",
    slug: "silk-drape-collection",
    price: 18999,
    category: "Curtains",
    description: "Pure silk curtains with intricate embroidery",
    image: "https://images.unsplash.com/photo-1513710286909-6534c8b2af9e?w=600&q=80",
  },
  {
    id: "8",
    name: "Prestige Dining Set",
    slug: "prestige-dining-set",
    price: 189999,
    category: "Dining",
    description: "6-seater dining set in premium mahogany wood",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80",
  },
];

function formatPrice(price: number) {
  return `Rs. ${price.toLocaleString("en-PK")}`;
}

export default function ProductsPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-24 lg:py-32 bg-[var(--cream)]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="max-w-3xl mx-auto text-center">
              <span className="font-[family-name:var(--font-sans)] text-sm font-medium uppercase tracking-[0.2em] text-[var(--warm-taupe)] mb-4 block">
                Our Products
              </span>
              <h1 className="font-[family-name:var(--font-playfair)] text-4xl lg:text-6xl font-light text-[var(--charcoal)] mb-8">
                Premium Furniture Collection
              </h1>
              <p className="font-[family-name:var(--font-sans)] text-lg text-[var(--warm-gray)] leading-relaxed">
                Discover our curated selection of luxury furniture and furnishings, crafted with precision and care.
              </p>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-24 lg:py-32 bg-white">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12 pb-8 border-b border-[var(--border)]">
              <p className="font-[family-name:var(--font-sans)] text-sm text-[var(--warm-gray)]">
                Showing {products.length} products
              </p>
              <div className="flex gap-4">
                <select className="px-4 py-3 bg-[var(--cream)] border border-[var(--border)] font-[family-name:var(--font-sans)] text-sm text-[var(--charcoal)] focus:outline-none">
                  <option value="">All Categories</option>
                  <option value="bedroom">Bedroom</option>
                  <option value="living-room">Living Room</option>
                  <option value="seating">Sofas & Seating</option>
                  <option value="curtains">Curtains & Fabrics</option>
                </select>
                <select className="px-4 py-3 bg-[var(--cream)] border border-[var(--border)] font-[family-name:var(--font-sans)] text-sm text-[var(--charcoal)] focus:outline-none">
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="group"
                >
                  {/* Image */}
                  <div className="aspect-[3/4] bg-[var(--light-stone)] mb-6 overflow-hidden rounded-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  {/* Info */}
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

        {/* CTA Section */}
        <section className="py-24 lg:py-32 bg-[var(--cream)]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl lg:text-4xl font-light text-[var(--charcoal)] mb-6">
                Can't Find What You're Looking For?
              </h2>
              <p className="font-[family-name:var(--font-sans)] text-lg text-[var(--warm-gray)] leading-relaxed mb-8">
                We offer custom furniture design services. Our expert craftsmen can create the perfect piece tailored to your specifications.
              </p>
              <Link
                href="/consultation"
                className="inline-flex items-center gap-2 bg-[var(--charcoal)] text-white font-[family-name:var(--font-sans)] font-medium px-8 py-4 hover:bg-[var(--deep-brown)] transition-colors duration-300"
              >
                Request Custom Furniture
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}