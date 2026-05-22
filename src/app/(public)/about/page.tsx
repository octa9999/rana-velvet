import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-24 lg:py-32 bg-[var(--cream)]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="max-w-3xl mx-auto text-center">
              <span className="font-[family-name:var(--font-sans)] text-sm font-medium uppercase tracking-[0.2em] text-[var(--warm-taupe)] mb-4 block">
                About Rana Velvet
              </span>
              <h1 className="font-[family-name:var(--font-playfair)] text-4xl lg:text-6xl font-light text-[var(--charcoal)] mb-8">
                A Legacy of Craftsmanship Since 1960
              </h1>
              <p className="font-[family-name:var(--font-sans)] text-lg text-[var(--warm-gray)] leading-relaxed">
                For over six decades, Rana Velvet has been at the heart of Pakistani homes, crafting premium furniture and signature velvets that blend heritage with modern living.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-24 lg:py-32 bg-white">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="font-[family-name:var(--font-playfair)] text-3xl lg:text-4xl font-light text-[var(--charcoal)] mb-6">
                  Our Story
                </h2>
                <p className="font-[family-name:var(--font-sans)] text-base text-[var(--warm-gray)] leading-relaxed mb-6">
                  Founded in 1960, Rana Velvet began as a small workshop dedicated to the art of velvet-making. What started as a passion for textile excellence has grown into one of Pakistan's most trusted names in luxury furniture.
                </p>
                <p className="font-[family-name:var(--font-sans)] text-base text-[var(--warm-gray)] leading-relaxed mb-6">
                  Today, we continue our founder's vision of combining traditional craftsmanship with contemporary design. Every piece that leaves our workshop carries the same dedication to quality that defined us from the very beginning.
                </p>
                <p className="font-[family-name:var(--font-sans)] text-base text-[var(--warm-gray)] leading-relaxed">
                  Our team of skilled artisans brings decades of experience to every creation, ensuring that each furniture piece meets our exacting standards of excellence.
                </p>
              </div>
              <div className="aspect-square bg-gradient-to-br from-[#E8E6E1] to-[#D4D0C8]"></div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 lg:py-32 bg-[var(--cream)]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl lg:text-4xl font-light text-[var(--charcoal)]">
                Our Values
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-white rounded-full flex items-center justify-center">
                  <span className="text-3xl">🏭</span>
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] text-xl font-medium text-[var(--charcoal)] mb-3">
                  Craftsmanship
                </h3>
                <p className="font-[family-name:var(--font-sans)] text-sm text-[var(--warm-gray)] leading-relaxed">
                  Every piece is crafted with meticulous attention to detail by skilled artisans who have dedicated their lives to the craft.
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-white rounded-full flex items-center justify-center">
                  <span className="text-3xl">🌿</span>
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] text-xl font-medium text-[var(--charcoal)] mb-3">
                  Sustainability
                </h3>
                <p className="font-[family-name:var(--font-sans)] text-sm text-[var(--warm-gray)] leading-relaxed">
                  We source materials responsibly and create furniture designed to last generations, reducing our environmental footprint.
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-white rounded-full flex items-center justify-center">
                  <span className="text-3xl">❤️</span>
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] text-xl font-medium text-[var(--charcoal)] mb-3">
                  Heritage
                </h3>
                <p className="font-[family-name:var(--font-sans)] text-sm text-[var(--warm-gray)] leading-relaxed">
                  Our legacy spans over 60 years, built on trust, quality, and a deep commitment to our customers' satisfaction.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}