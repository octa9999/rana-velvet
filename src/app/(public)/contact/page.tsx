import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-24 lg:py-32 bg-[var(--cream)]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="max-w-3xl mx-auto text-center">
              <span className="font-[family-name:var(--font-sans)] text-sm font-medium uppercase tracking-[0.2em] text-[var(--warm-taupe)] mb-4 block">
                Contact Us
              </span>
              <h1 className="font-[family-name:var(--font-playfair)] text-4xl lg:text-6xl font-light text-[var(--charcoal)] mb-8">
                We Would Love to Hear From You
              </h1>
              <p className="font-[family-name:var(--font-sans)] text-lg text-[var(--warm-gray)] leading-relaxed">
                Have a question or want to discuss your project? Reach out to us and our team will get back to you shortly.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info & Form */}
        <section className="py-24 lg:py-32 bg-white">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Info */}
              <div>
                <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-light text-[var(--charcoal)] mb-10">
                  Get in Touch
                </h2>
                <div className="space-y-8">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-[var(--cream)] rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-[var(--warm-taupe)]" />
                    </div>
                    <div>
                      <h3 className="font-[family-name:var(--font-sans)] text-sm font-semibold text-[var(--charcoal)] mb-1">
                        Visit Our Showroom
                      </h3>
                      <p className="font-[family-name:var(--font-sans)] text-base text-[var(--warm-gray)]">
                        123 Furniture Street<br />
                        Karachi, Pakistan
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-[var(--cream)] rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-[var(--warm-taupe)]" />
                    </div>
                    <div>
                      <h3 className="font-[family-name:var(--font-sans)] text-sm font-semibold text-[var(--charcoal)] mb-1">
                        Call Us
                      </h3>
                      <p className="font-[family-name:var(--font-sans)] text-base text-[var(--warm-gray)]">
                        +92 300 123 4567
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-[var(--cream)] rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-[var(--warm-taupe)]" />
                    </div>
                    <div>
                      <h3 className="font-[family-name:var(--font-sans)] text-sm font-semibold text-[var(--charcoal)] mb-1">
                        Email Us
                      </h3>
                      <p className="font-[family-name:var(--font-sans)] text-base text-[var(--warm-gray)]">
                        info@ranavelvet.com
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-[var(--cream)] rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-[var(--warm-taupe)]" />
                    </div>
                    <div>
                      <h3 className="font-[family-name:var(--font-sans)] text-sm font-semibold text-[var(--charcoal)] mb-1">
                        Business Hours
                      </h3>
                      <p className="font-[family-name:var(--font-sans)] text-base text-[var(--warm-gray)]">
                        Monday - Saturday: 10:00 AM - 8:00 PM<br />
                        Sunday: 12:00 PM - 6:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-[var(--cream)] p-8 lg:p-12">
                <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-light text-[var(--charcoal)] mb-8">
                  Send us a Message
                </h2>
                <form className="space-y-6">
                  <div>
                    <label className="font-[family-name:var(--font-sans)] text-sm font-medium text-[var(--charcoal)] mb-2 block">
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white border border-[var(--border)] font-[family-name:var(--font-sans)] text-base text-[var(--charcoal)] focus:outline-none focus:border-[var(--warm-taupe)] transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="font-[family-name:var(--font-sans)] text-sm font-medium text-[var(--charcoal)] mb-2 block">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-white border border-[var(--border)] font-[family-name:var(--font-sans)] text-base text-[var(--charcoal)] focus:outline-none focus:border-[var(--warm-taupe)] transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="font-[family-name:var(--font-sans)] text-sm font-medium text-[var(--charcoal)] mb-2 block">
                      Phone
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 bg-white border border-[var(--border)] font-[family-name:var(--font-sans)] text-base text-[var(--charcoal)] focus:outline-none focus:border-[var(--warm-taupe)] transition-colors"
                      placeholder="+92 300 000 0000"
                    />
                  </div>
                  <div>
                    <label className="font-[family-name:var(--font-sans)] text-sm font-medium text-[var(--charcoal)] mb-2 block">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      className="w-full px-4 py-3 bg-white border border-[var(--border)] font-[family-name:var(--font-sans)] text-base text-[var(--charcoal)] focus:outline-none focus:border-[var(--warm-taupe)] transition-colors resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[var(--charcoal)] text-white font-[family-name:var(--font-sans)] font-medium py-4 hover:bg-[var(--deep-brown)] transition-colors duration-300"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}