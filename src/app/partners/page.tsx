"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { referenceNumber } from "@/lib/storefront";
import styles from "@/styles/ecommerce.module.css";

export default function PartnersPage() {
  const [reference, setReference] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", email: "", type: "", city: "", portfolio: "", projects: "" });
  const update = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name || !form.phone || !form.email) return setError("Please enter your full name, phone, and email.");
    setSubmitting(true);
    const ref = referenceNumber("RV-PP");
    const message = `Partner application ${ref}
Professional type: ${form.type}
City: ${form.city}
Portfolio: ${form.portfolio}
Projects: ${form.projects}`;
    const response = await fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, subject: `Interior designer partner ${ref}`, message }),
    });
    setSubmitting(false);
    if (!response.ok) return setError("We could not submit your application. Please try again.");
    setReference(ref);
  };

  return (
    <div className={styles.shell}>
      <Header />
      <main>
        <section className={`${styles.hero} ${styles.heroCompact}`}>
          <span className={styles.heroKicker}>Interior Designer Partners</span>
          <h1 className={styles.displayTitle}>project support</h1>
          <p className={styles.heroCopy}>Professionals can request Rana Velvet support for client projects, fabric access, and custom coordination.</p>
        </section>
        <section className={styles.paperSection}>
          <div className={styles.contentGrid}>
            <form className={styles.formCard} onSubmit={submit}>
              {reference ? (
                <div className={styles.successPanel}>
                  <CheckCircle2 size={22} />
                  <h2>Application received</h2>
                  <p>Reference: {reference}. The application will be reviewed and the team will respond.</p>
                </div>
              ) : (
                <>
                  <h2>application form</h2>
                  <div className={styles.formGrid} style={{ marginTop: 24 }}>
                    <label className={styles.field}><span>Full name</span><input value={form.name} onChange={(e) => update("name", e.target.value)} /></label>
                    <label className={styles.field}><span>Phone/WhatsApp</span><input value={form.phone} onChange={(e) => update("phone", e.target.value)} /></label>
                    <label className={styles.field}><span>Email</span><input value={form.email} onChange={(e) => update("email", e.target.value)} /></label>
                    <label className={styles.field}><span>Professional type</span><input value={form.type} onChange={(e) => update("type", e.target.value)} placeholder="Interior designer, architect..." /></label>
                    <label className={styles.field}><span>City</span><input value={form.city} onChange={(e) => update("city", e.target.value)} /></label>
                    <label className={styles.field}><span>Portfolio / website / Instagram</span><input value={form.portfolio} onChange={(e) => update("portfolio", e.target.value)} /></label>
                    <label className={`${styles.field} ${styles.wide}`}><span>Recent projects</span><textarea value={form.projects} onChange={(e) => update("projects", e.target.value)} /></label>
                  </div>
                  {error && <p className={styles.inlineError}>{error}</p>}
                  <button className={styles.primaryPill} disabled={submitting} style={{ marginTop: 20, width: "100%" }} type="submit">{submitting ? "Submitting..." : "Submit Application"}</button>
                </>
              )}
            </form>
            <aside className={styles.summaryCard}>
              <h2>who can apply</h2>
              <div className={styles.summaryRows}>
                {["Interior designers", "Architects", "Stylists", "Contractors"].map((item) => <div key={item}><span>{item}</span><strong>Eligible</strong></div>)}
              </div>
              <p className={styles.muted}>Partner commission or benefits should only be published after Rana Velvet approves them.</p>
              <Link className={styles.secondaryPill} href="/contact" style={{ marginTop: 18 }}>Contact Us</Link>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
