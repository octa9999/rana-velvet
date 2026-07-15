"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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

export function ConsultationCTA() {
  return (
    <section className="py-16 lg:py-24 bg-[var(--charcoal)] relative overflow-hidden">
      {/* Decorative Corner Accents */}
      <div className="absolute top-6 left-6 w-16 h-16 border-l-2 border-t-2 border-[var(--gold)]/30 rounded-tl-xl" />
      <div className="absolute top-6 right-6 w-16 h-16 border-r-2 border-t-2 border-[var(--gold)]/30 rounded-tr-xl" />
      <div className="absolute bottom-6 left-6 w-16 h-16 border-l-2 border-b-2 border-[var(--gold)]/30 rounded-bl-xl" />
      <div className="absolute bottom-6 right-6 w-16 h-16 border-r-2 border-b-2 border-[var(--gold)]/30 rounded-br-xl" />

      {/* Subtle Radial Glow Behind Content */}
      <div className="absolute inset-0 bg-radial-gold opacity-[0.03] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedItem>
            <span className="label-uppercase text-[var(--gold)] mb-6 lg:mb-8 block">
              Free Consultation
            </span>
          </AnimatedItem>
          <AnimatedItem delay={100}>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-white tracking-tight mb-4 lg:mb-6">
              Get a Free 30-Minute Home Styling Session
            </h2>
          </AnimatedItem>
          <AnimatedItem delay={200}>
            <p className="font-[family-name:var(--font-sans)] text-base sm:text-lg lg:text-xl text-[var(--text-secondary)] leading-relaxed mb-8 lg:mb-12 font-light max-w-xl mx-auto">
              Our expert designers will help you create the perfect space for your home. Get personalized advice on furniture selection, fabric choices, and interior styling.
            </p>
          </AnimatedItem>
          <AnimatedItem delay={300}>
            <Link
              href="/consultation"
              className="inline-flex items-center gap-2 sm:gap-3 bg-[var(--gold)] text-[var(--charcoal)] font-[family-name:var(--font-sans)] text-xs sm:text-sm uppercase tracking-[0.15em] font-medium px-8 sm:px-10 lg:px-14 py-4 sm:py-5 hover:bg-white transition-colors duration-300 rounded-xl"
            >
              Book Your Session
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </AnimatedItem>
        </div>
      </div>
    </section>
  );
}