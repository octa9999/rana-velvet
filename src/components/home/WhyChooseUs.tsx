import { Check } from "lucide-react";

const features = [
  {
    title: "Heritage Since 1960",
    description: "Decades of craftsmanship and expertise in furniture making",
  },
  {
    title: "Affordable Luxury",
    description: "Premium quality at accessible prices for everyone",
  },
  {
    title: "Premium Craftsmanship",
    description: "Meticulous attention to detail in every piece",
  },
  {
    title: "In-House Fabrics",
    description: "Complete control over quality and design",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-[family-name:var(--font-sans)] text-sm font-medium uppercase tracking-[0.2em] text-[var(--warm-taupe)] mb-4 block">
            Why Choose Us
          </span>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl lg:text-5xl font-light text-[var(--charcoal)]">
            Experience the difference of true craftsmanship and quality
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[var(--cream)] flex items-center justify-center">
                <Check className="w-8 h-8 text-[var(--warm-taupe)]" />
              </div>
              <h3 className="font-[family-name:var(--font-playfair)] text-xl font-medium text-[var(--charcoal)] mb-3">
                {feature.title}
              </h3>
              <p className="font-[family-name:var(--font-sans)] text-sm text-[var(--warm-gray)] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}