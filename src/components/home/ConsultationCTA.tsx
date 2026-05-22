import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ConsultationCTA() {
  return (
    <section className="py-24 lg:py-32 bg-[var(--charcoal)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl lg:text-5xl font-light text-white mb-6">
            Get a Free 30-Minute Home Styling Session
          </h2>
          <p className="font-[family-name:var(--font-sans)] text-lg text-white/70 leading-relaxed mb-10">
            Our expert designers will help you create the perfect space for your home. Get personalized advice on furniture selection, fabric choices, and interior styling.
          </p>
          <Link
            href="/consultation"
            className="inline-flex items-center gap-2 bg-white text-[var(--charcoal)] font-[family-name:var(--font-sans)] font-medium px-10 py-4 hover:bg-[var(--cream)] transition-colors duration-300"
          >
            Book Your Free Consultation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}