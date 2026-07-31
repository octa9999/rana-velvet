"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { officialContactNote, showroomMapUrl, whatsappHref } from "@/lib/storefront";
import styles from "@/styles/ecommerce.module.css";

const contactNotes = [
  {
    icon: MapPin,
    title: "Store details",
    body: officialContactNote,
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", topic: "Product inquiry", message: "" });
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus("");
    setSuccess(false);

    const response = await fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, subject: form.topic, email: form.email || "no-email@ranavelvet.local" }),
    });

    setSubmitting(false);

    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      setStatus(payload?.error || "Message could not be sent. Please try again.");
      return;
    }

    setForm({ name: "", email: "", phone: "", topic: "Product inquiry", message: "" });
    setSuccess(true);
    setStatus("Your message has been received. Rana Velvet will contact you shortly.");
  };

  return (
    <div className={styles.shell}>
      <Header />
      <main>
        <section className={`${styles.hero} ${styles.heroCompact}`}>
          <span className={styles.heroKicker}>Contact Rana Velvet</span>
          <h1 className={styles.displayTitle}>Talk With Us</h1>
          <p className={styles.heroCopy}>
            Share your room, furniture, fabric, or furnishing requirement with the studio. Our team will guide you with a considered next step.
          </p>
        </section>

        <section className={styles.paperSection}>
          <div className={styles.contentGrid}>
            <form className={styles.formCard} onSubmit={submit}>
              <h2>Send A Message</h2>
              <div className={styles.formGrid} style={{ marginTop: 28 }}>
                <label className={styles.field}>
                  <span>Name</span>
                  <input
                    required
                    value={form.name}
                    onChange={(event) => setForm({ ...form, name: event.target.value })}
                    placeholder="Your name"
                    type="text"
                  />
                </label>
                <label className={styles.field}>
                  <span>Email</span>
                  <input
                    value={form.email}
                    onChange={(event) => setForm({ ...form, email: event.target.value })}
                    placeholder="Optional"
                    type="email"
                  />
                </label>
                <label className={`${styles.field} ${styles.wide}`}>
                  <span>Phone</span>
                  <input
                    required
                    value={form.phone}
                    onChange={(event) => setForm({ ...form, phone: event.target.value })}
                    placeholder="Phone or WhatsApp number"
                    type="tel"
                  />
                </label>
                <label className={`${styles.field} ${styles.wide}`}>
                  <span>Topic</span>
                  <select value={form.topic} onChange={(event) => setForm({ ...form, topic: event.target.value })}>
                    <option>Product inquiry</option>
                    <option>Curtain customization</option>
                    <option>Custom furniture</option>
                    <option>Order support</option>
                    <option>Delivery</option>
                    <option>Other</option>
                  </select>
                </label>
                <label className={`${styles.field} ${styles.wide}`}>
                  <span>Message</span>
                  <textarea
                    required
                    rows={7}
                    value={form.message}
                    onChange={(event) => setForm({ ...form, message: event.target.value })}
                    placeholder="Tell us about the space, product, measurements, or design direction you have in mind."
                  />
                </label>
              </div>

              <button className={styles.primaryPill} disabled={submitting} style={{ marginTop: 24, width: "100%" }} type="submit">
                {submitting ? "Sending..." : "Send Inquiry"} <ArrowRight size={15} />
              </button>

              {status && (
                <p className={success ? styles.successNote : styles.errorNote}>
                  {success && <CheckCircle2 size={16} />}
                  {status}
                </p>
              )}
            </form>

            <aside className={styles.summaryCard}>
              <span className={styles.heroKicker}>Studio Desk</span>
              <h2>Made Personal</h2>
              <p className={styles.muted} style={{ marginTop: 14, lineHeight: 1.55 }}>
                For product questions, room styling, custom furniture, fabric selection, and studio visits, send the details here or book a dedicated consultation.
              </p>
              <div className={styles.summaryRows}>
                {contactNotes.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                        <Icon size={17} />
                        {item.title}
                      </span>
                      <strong>{item.body}</strong>
                    </div>
                  );
                })}
              </div>
              <a className={styles.secondaryPill} href={showroomMapUrl} target="_blank" rel="noreferrer" style={{ width: "100%", marginTop: 14 }}>
                Open Location In Google Maps <ArrowRight size={15} />
              </a>
              <Link className={styles.secondaryPill} href="/consultation" style={{ width: "100%" }}>
                Book a consultation <ArrowRight size={15} />
              </Link>
              <Link className={styles.whatsappButton} href={whatsappHref("Hi Rana Velvet, I need help with a website inquiry.")} style={{ width: "100%", marginTop: 10 }}>
                Talk To Us
              </Link>
            </aside>
          </div>
        </section>

        <section className={styles.darkBand}>
          <div className={styles.sectionHead}>
            <p>For complete interiors, bring measurements, room photos, fabric references, or inspiration images when you visit the showroom.</p>
            <h2>Studio Care</h2>
            <Link className={styles.secondaryPill} href="/products">
              View Collection <ArrowRight size={15} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
