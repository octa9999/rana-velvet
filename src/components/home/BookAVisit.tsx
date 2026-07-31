"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Phone } from "lucide-react";

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

export function BookAVisit() {
  return (
    <section className="py-16 lg:py-24 bg-[var(--charcoal)]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-20">
          <AnimatedItem>
            <span className="label-uppercase text-[var(--gold)] mb-4 lg:mb-6 block">
              Visit Us
            </span>
          </AnimatedItem>
          <AnimatedItem delay={100}>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-white tracking-tight">
              Book a Visit
            </h2>
          </AnimatedItem>
        </div>

        {/* Large Banner Card - Responsive */}
        <AnimatedItem delay={200}>
          <div className="relative bg-[var(--card)] rounded-xl sm:rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left Content */}
              <div className="p-6 sm:p-8 lg:p-12 xl:p-20 flex flex-col justify-center">
                <span className="label-uppercase text-[var(--gold)] mb-4 lg:mb-6 block">
                  Flagship Showroom
                </span>
                <h3 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight mb-4 lg:mb-6">
                  Rana Velvet Studio
                </h3>
                <p className="font-[family-name:var(--font-sans)] text-sm lg:text-base text-white/60 leading-relaxed font-light mb-6 lg:mb-8 max-w-md">
                  Visit the Rana Velvet studio to explore the complete furniture and fabric collection.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-6 lg:mb-8">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-[var(--gold)]" />
                    <span className="font-[family-name:var(--font-sans)] text-xs sm:text-sm text-white/70">
                      Google Maps Location Available
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[var(--gold)]" />
                    <span className="font-[family-name:var(--font-sans)] text-xs sm:text-sm text-white/70">
                      Contact Number In Admin Settings
                    </span>
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 sm:gap-3 bg-[var(--gold)] text-[var(--charcoal)] font-[family-name:var(--font-sans)] text-xs sm:text-sm uppercase tracking-wider font-medium px-6 sm:px-8 lg:px-10 py-4 sm:py-5 hover:bg-white transition-colors duration-500 rounded-xl w-fit"
                >
                  Book an Appointment
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </div>

              {/* Right Visual */}
              <div className="relative aspect-[4/3] lg:aspect-auto order-first lg:order-last">
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--card)] to-transparent hidden lg:block z-10" />
                <img
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80"
                  alt="Rana Velvet Showroom"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </AnimatedItem>
      </div>
    </section>
  );
}
