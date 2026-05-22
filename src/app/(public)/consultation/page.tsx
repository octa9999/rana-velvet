import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Calendar, Clock, Star } from "lucide-react";

const services = [
  "Home Styling Consultation",
  "Furniture Selection",
  "Fabric & Material Advice",
  "Space Planning",
  "Custom Furniture Design",
  "Color Consultation",
];

export default function ConsultationPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-24 lg:py-32 bg-[var(--cream)]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="max-w-3xl mx-auto text-center">
              <span className="font-[family-name:var(--font-sans)] text-sm font-medium uppercase tracking-[0.2em] text-[var(--warm-taupe)] mb-4 block">
                Free Consultation
              </span>
              <h1 className="font-[family-name:var(--font-playfair)] text-4xl lg:text-6xl font-light text-[var(--charcoal)] mb-8">
                Book Your Free 30-Minute Session
              </h1>
              <p className="font-[family-name:var(--font-sans)] text-lg text-[var(--warm-gray)] leading-relaxed">
                Our expert designers will help you create the perfect space for your home. Get personalized advice on furniture selection, fabric choices, and interior styling.
              </p>
            </div>
          </div>
        </section>

        {/* Booking Section */}
        <section className="py-24 lg:py-32 bg-white">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Booking Form */}
              <div>
                <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-light text-[var(--charcoal)] mb-8">
                  Schedule Your Appointment
                </h2>
                <form className="space-y-6">
                  <div>
                    <label className="font-[family-name:var(--font-sans)] text-sm font-medium text-[var(--charcoal)] mb-2 block">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-[var(--cream)] border border-[var(--border)] font-[family-name:var(--font-sans)] text-base text-[var(--charcoal)] focus:outline-none focus:border-[var(--warm-taupe)] transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-[family-name:var(--font-sans)] text-sm font-medium text-[var(--charcoal)] mb-2 block">
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 bg-[var(--cream)] border border-[var(--border)] font-[family-name:var(--font-sans)] text-base text-[var(--charcoal)] focus:outline-none focus:border-[var(--warm-taupe)] transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="font-[family-name:var(--font-sans)] text-sm font-medium text-[var(--charcoal)] mb-2 block">
                        Phone
                      </label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 bg-[var(--cream)] border border-[var(--border)] font-[family-name:var(--font-sans)] text-base text-[var(--charcoal)] focus:outline-none focus:border-[var(--warm-taupe)] transition-colors"
                        placeholder="+92 300 000 0000"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-[family-name:var(--font-sans)] text-sm font-medium text-[var(--charcoal)] mb-2 block">
                        Preferred Date
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--warm-gray)]" />
                        <input
                          type="date"
                          className="w-full pl-12 pr-4 py-3 bg-[var(--cream)] border border-[var(--border)] font-[family-name:var(--font-sans)] text-base text-[var(--charcoal)] focus:outline-none focus:border-[var(--warm-taupe)] transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="font-[family-name:var(--font-sans)] text-sm font-medium text-[var(--charcoal)] mb-2 block">
                        Preferred Time
                      </label>
                      <div className="relative">
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--warm-gray)]" />
                        <select className="w-full pl-12 pr-4 py-3 bg-[var(--cream)] border border-[var(--border)] font-[family-name:var(--font-sans)] text-base text-[var(--charcoal)] focus:outline-none focus:border-[var(--warm-taupe)] transition-colors appearance-none">
                          <option value="">Select time</option>
                          <option value="10:00">10:00 AM</option>
                          <option value="11:00">11:00 AM</option>
                          <option value="12:00">12:00 PM</option>
                          <option value="14:00">2:00 PM</option>
                          <option value="15:00">3:00 PM</option>
                          <option value="16:00">4:00 PM</option>
                          <option value="17:00">5:00 PM</option>
                          <option value="18:00">6:00 PM</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="font-[family-name:var(--font-sans)] text-sm font-medium text-[var(--charcoal)] mb-2 block">
                      Service Interested In
                    </label>
                    <select className="w-full px-4 py-3 bg-[var(--cream)] border border-[var(--border)] font-[family-name:var(--font-sans)] text-base text-[var(--charcoal)] focus:outline-none focus:border-[var(--warm-taupe)] transition-colors">
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="font-[family-name:var(--font-sans)] text-sm font-medium text-[var(--charcoal)] mb-2 block">
                      Additional Details
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 bg-[var(--cream)] border border-[var(--border)] font-[family-name:var(--font-sans)] text-base text-[var(--charcoal)] focus:outline-none focus:border-[var(--warm-taupe)] transition-colors resize-none"
                      placeholder="Tell us about your project or requirements..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[var(--charcoal)] text-white font-[family-name:var(--font-sans)] font-medium py-4 hover:bg-[var(--deep-brown)] transition-colors duration-300"
                  >
                    Book Appointment
                  </button>
                </form>
              </div>

              {/* Info Side */}
              <div>
                <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-light text-[var(--charcoal)] mb-8">
                  What to Expect
                </h2>
                <div className="bg-[var(--cream)] p-8 mb-8">
                  <h3 className="font-[family-name:var(--font-playfair)] text-xl font-medium text-[var(--charcoal)] mb-6">
                    Your Free 30-Minute Session Includes:
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-[var(--warm-taupe)] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs">1</span>
                      </div>
                      <p className="font-[family-name:var(--font-sans)] text-base text-[var(--warm-gray)]">
                        Personalized walkthrough of our showroom with an expert designer
                      </p>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-[var(--warm-taupe)] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs">2</span>
                      </div>
                      <p className="font-[family-name:var(--font-sans)] text-base text-[var(--warm-gray)]">
                        Discussion of your vision, preferences, and budget
                      </p>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-[var(--warm-taupe)] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs">3</span>
                      </div>
                      <p className="font-[family-name:var(--font-sans)] text-base text-[var(--warm-gray)]">
                        Expert recommendations on furniture, fabrics, and styling
                      </p>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-[var(--warm-taupe)] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs">4</span>
                      </div>
                      <p className="font-[family-name:var(--font-sans)] text-base text-[var(--warm-gray)]">
                        No obligation - just honest, professional advice
                      </p>
                    </li>
                  </ul>
                </div>

                <div className="p-8 border border-[var(--border)]">
                  <h3 className="font-[family-name:var(--font-playfair)] text-xl font-medium text-[var(--charcoal)] mb-4">
                    Why Customers Love Our Consultations
                  </h3>
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 fill-[var(--gold)] text-[var(--gold)]" />
                    ))}
                  </div>
                  <p className="font-[family-name:var(--font-sans)] text-base text-[var(--warm-gray)] italic mb-4">
                    "The designer helped us visualize exactly what we wanted. We ended up with a beautiful living room setup that exceeded our expectations."
                  </p>
                  <p className="font-[family-name:var(--font-sans)] text-sm font-medium text-[var(--charcoal)]">
                    — Sarah A., Karachi
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}