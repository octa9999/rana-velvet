"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { referenceNumber, showroomMapUrl, whatsappHref } from "@/lib/storefront";
import styles from "@/styles/ecommerce.module.css";

const services = [
  "Home Styling Consultation",
  "Furniture Selection",
  "Fabric & Material Advice",
  "Space Planning",
  "Custom Furniture Design",
  "Color Consultation",
];

const timeSlots = ["10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

export default function ConsultationPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "", time: "", service: "", budget: "", message: "" });
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus("");
    setSuccess(false);

    const response = await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, message: `Budget: ${form.budget || "-"}\n${form.message}`, email: form.email || "no-email@ranavelvet.local" }),
    });

    setSubmitting(false);
    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      setStatus(payload?.error || "Appointment could not be booked. Please try again.");
      return;
    }

    setForm({ name: "", email: "", phone: "", date: "", time: "", service: "", budget: "", message: "" });
    setSuccess(true);
    setStatus(`Your consultation request has been received. Reference ${referenceNumber("RV-CN")}. The requested time will be confirmed by the team.`);
  };

  return (
    <div className={styles.shell}>
      <Header />
      <main>
        <section className={`${styles.hero} ${styles.heroCompact}`}>
          <span className={styles.heroKicker}>Rana Velvet Studio</span>
          <h1 className={styles.displayTitle}>Book A Consultation</h1>
          <p className={styles.heroCopy}>
            Reserve a focused design session for furniture selection, fabric matching, room planning, and custom interior guidance.
          </p>
        </section>

        <section className={styles.paperSection}>
          <div className={styles.contentGrid}>
            <form className={styles.formCard} onSubmit={submit}>
              <h2>Appointment Details</h2>
              <p className={styles.muted} style={{ margin: "18px 0 28px", lineHeight: 1.45 }}>
                Share your preferred time and project context. The booking will appear in the admin appointments queue immediately.
              </p>

              <div className={styles.formGrid}>
                <label className={styles.field}>
                  <span>Full name</span>
                  <input
                    required
                    value={form.name}
                    onChange={(event) => setForm({ ...form, name: event.target.value })}
                    placeholder="Your name"
                  />
                </label>
                <label className={styles.field}>
                  <span>Email optional</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) => setForm({ ...form, email: event.target.value })}
                    placeholder="Optional"
                  />
                </label>
                <label className={styles.field}>
                  <span>Phone</span>
                  <input
                    required
                    value={form.phone}
                    onChange={(event) => setForm({ ...form, phone: event.target.value })}
                    placeholder="+92 300 000 0000"
                  />
                </label>
                <label className={styles.field}>
                  <span>Service</span>
                  <select required value={form.service} onChange={(event) => setForm({ ...form, service: event.target.value })}>
                    <option value="">Select service</option>
                    {services.map((service) => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </label>
                <label className={styles.field}>
                  <span>Preferred date</span>
                  <input required type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} />
                </label>
                <label className={styles.field}>
                  <span>Preferred time</span>
                  <select required value={form.time} onChange={(event) => setForm({ ...form, time: event.target.value })}>
                    <option value="">Select time</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </label>
                <label className={styles.field}>
                  <span>Approximate budget</span>
                  <input value={form.budget} onChange={(event) => setForm({ ...form, budget: event.target.value })} placeholder="Optional" />
                </label>
                <label className={`${styles.field} ${styles.wide}`}>
                  <span>Project details</span>
                  <textarea
                    value={form.message}
                    onChange={(event) => setForm({ ...form, message: event.target.value })}
                    placeholder="Tell us about your room, fabric needs, furniture preferences, or budget."
                    rows={5}
                    style={{
                      border: "1px solid var(--line)",
                      borderRadius: 28,
                      background: "white",
                      padding: 18,
                      resize: "vertical",
                      outline: "none",
                    }}
                  />
                </label>
              </div>

              <button className={styles.primaryPill} type="submit" disabled={submitting} style={{ width: "100%", marginTop: 24 }}>
                {submitting ? "Booking..." : "Book Consultation"}
                <ArrowRight size={15} />
              </button>

              {status && (
                <div
                  style={{
                    marginTop: 18,
                    display: "flex",
                    gap: 10,
                    alignItems: "flex-start",
                    borderRadius: 24,
                    background: success ? "#e5f4ec" : "#fff1ee",
                    color: success ? "#0d6b3f" : "#9f2a1f",
                    padding: 16,
                    fontWeight: 800,
                    lineHeight: 1.35,
                  }}
                >
                  {success && <CheckCircle2 size={18} />}
                  <span>{status}</span>
                </div>
              )}
            </form>

            <aside className={styles.summaryCard}>
              <span className={styles.heroKicker}>Tradition & Sophistication</span>
              <h2>Visit The Studio</h2>
              <p className={styles.muted} style={{ margin: "20px 0 28px", lineHeight: 1.45 }}>
                Rana Velvet offers original design guidance, handcrafted furniture, fabric consultation, and refined furnishing support for your home.
              </p>
              <div className={styles.summaryRows}>
                <div>
                  <span><MapPin size={15} /> Location</span>
                  <a href={showroomMapUrl} target="_blank" rel="noreferrer">Open Location In Google Maps</a>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className={styles.darkBand}>
          <div className={styles.darkCards}>
            <article className={styles.darkCard}>
              <h2>What We Cover</h2>
              <p>Furniture scale, room planning, upholstery choices, curtain fabrics, cushion styling, and custom order direction.</p>
            </article>
            <article className={styles.darkCard}>
              <h2>What To Bring</h2>
              <p>Room dimensions, photos, inspiration references, wall colors, and any fabric or finish preferences you already have.</p>
            </article>
          </div>
          <div className={styles.choiceRow} style={{ justifyContent: "center", marginTop: 30 }}>
            <a className={styles.whatsappButton} href={whatsappHref("Hi Rana Velvet, I want to book a free consultation.")}>Talk To Us</a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
