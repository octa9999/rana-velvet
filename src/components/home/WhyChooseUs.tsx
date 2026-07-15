"use client";

import { useEffect, useRef, useState } from "react";
import { Shield, Gem, Truck, Award } from "lucide-react";

const features = [
  {
    icon: Shield,
    stat: "64+",
    title: "Years of Heritage",
    description: "Crafting premium furniture with generations of expertise since 1960",
  },
  {
    icon: Gem,
    stat: "100%",
    title: "Premium Quality",
    description: "Only the finest materials and fabrics in every piece we create",
  },
  {
    icon: Truck,
    stat: "Nationwide",
    title: "Free Delivery",
    description: "Complimentary delivery and installation across Pakistan",
  },
  {
    icon: Award,
    stat: "50K+",
    title: "Happy Customers",
    description: "Trusted by families for their dream homes",
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

export function WhyChooseUs() {
  return (
    <section className="py-16 lg:py-24 bg-[var(--charcoal)]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-20">
          <AnimatedItem>
            <span className="label-uppercase text-[var(--gold)] mb-4 lg:mb-6 block">
              Why Choose Us
            </span>
          </AnimatedItem>
          <AnimatedItem delay={100}>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-white tracking-tight">
              Experience the difference
            </h2>
          </AnimatedItem>
        </div>

        {/* Features Grid - Responsive */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12">
          {features.map((feature, index) => (
            <AnimatedItem key={index} delay={index * 150}>
              <div className="group relative text-center">
                {/* Icon */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-6 lg:mb-8 rounded-full bg-[var(--gold)] flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-[var(--charcoal)]" strokeWidth={1.5} />
                </div>

                {/* Stat */}
                <div className="mb-2 lg:mb-4">
                  <span className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light text-white">
                    {feature.stat}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-[family-name:var(--font-playfair)] text-base sm:text-lg lg:text-2xl font-light text-white mb-2 lg:mb-4">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="font-[family-name:var(--font-sans)] text-xs sm:text-sm lg:text-base text-[var(--text-secondary)] leading-relaxed font-light hidden sm:block">
                  {feature.description}
                </p>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 lg:w-12 h-[2px] bg-[var(--gold)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>
            </AnimatedItem>
          ))}
        </div>
      </div>
    </section>
  );
}