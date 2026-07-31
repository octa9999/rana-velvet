"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { referenceNumber, whatsappHref } from "@/lib/storefront";
import styles from "@/styles/ecommerce.module.css";

export default function CustomFurniturePage() {
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    type: "",
    fabric: "",
    budget: "",
    dimensions: "",
    colour: "",
    room: "",
    inspiration: "",
    requirements: "",
  });

  const update = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (!form.name.trim()) return setError("Please enter your full name.");
    if (form.phone.trim().length < 7) return setError("Please enter a valid phone number.");
    if (!form.type.trim()) return setError("Please select a furniture type.");
    setSubmitting(true);
    const ref = referenceNumber("RV-CF");
    const message = `Custom furniture request ${ref}
Type: ${form.type}
Fabric: ${form.fabric || "-"}
Budget: ${form.budget || "-"}
Dimensions: ${form.dimensions || "-"}
Colour/finish: ${form.colour || "-"}
Room: ${form.room || "-"}
Inspiration: ${form.inspiration || "-"}
Requirements: ${form.requirements || "-"}`;
    const response = await fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: form.name, email: form.email || "no-email@ranavelvet.local", phone: form.phone, subject: `Custom furniture ${ref}`, message }),
    });
    setSubmitting(false);
    if (!response.ok) return setError("We could not submit your request. Please try again or contact us on WhatsApp.");
    setReference(ref);
  };

  return (
    <div className={styles.shell}>
      <Header />
      <main>
        <section className={`${styles.hero} ${styles.heroCompact}`}>
          <span className={styles.heroKicker}>Custom Furniture</span>
          <h1 className={styles.displayTitle}>Made For Your Space</h1>
          <p className={styles.heroCopy}>Share an idea, size, fabric, finish, and budget. Rana Velvet will review it and prepare the next step.</p>
        </section>
        <section className={styles.darkBand}>
          <div className={styles.darkCards}>
            {["Share your idea", "Review the design", "Receive quotation", "Approve and produce"].map((step, index) => (
              <article className={styles.darkCard} key={step}>
                <span className={styles.heroKicker}>{String(index + 1).padStart(2, "0")}</span>
                <h2>{step}</h2>
                <p>Custom dimensions, fabric, frame, finish, comfort level, and special requirements can be reviewed with the team.</p>
              </article>
            ))}
          </div>
        </section>
        <section className={styles.paperSection}>
          <div className={styles.contentGrid}>
            <form className={styles.formCard} onSubmit={submit}>
              {reference ? (
                <div className={styles.successPanel}>
                  <CheckCircle2 size={22} />
                  <h2>Request received</h2>
                  <p>Reference: {reference}. The team will contact you to review details and prepare a quotation.</p>
                  <Link className={styles.whatsappButton} href={whatsappHref(`Hi Rana Velvet, please confirm custom furniture request ${reference}.`)}>
                    Confirm on WhatsApp
                  </Link>
                </div>
              ) : (
                <>
                  <h2>Request Form</h2>
                  <div className={styles.formGrid} style={{ marginTop: 24 }}>
                    <label className={styles.field}><span>Full name</span><input value={form.name} onChange={(e) => update("name", e.target.value)} /></label>
                    <label className={styles.field}><span>Phone/WhatsApp</span><input value={form.phone} onChange={(e) => update("phone", e.target.value)} /></label>
                    <label className={styles.field}><span>Email optional</span><input value={form.email} onChange={(e) => update("email", e.target.value)} /></label>
                    <label className={styles.field}><span>Furniture type</span><select value={form.type} onChange={(e) => update("type", e.target.value)}><option value="">Select type</option><option>Sofa</option><option>Bed</option><option>Chair</option><option>Table</option><option>Ottoman</option><option>Other</option></select></label>
                    <label className={styles.field}><span>Preferred fabric</span><input value={form.fabric} onChange={(e) => update("fabric", e.target.value)} /></label>
                    <label className={styles.field}><span>Approximate budget</span><input value={form.budget} onChange={(e) => update("budget", e.target.value)} /></label>
                    <label className={styles.field}><span>Dimensions</span><input value={form.dimensions} onChange={(e) => update("dimensions", e.target.value)} /></label>
                    <label className={styles.field}><span>Colour/finish</span><input value={form.colour} onChange={(e) => update("colour", e.target.value)} /></label>
                    <label className={styles.field}><span>Room</span><input value={form.room} onChange={(e) => update("room", e.target.value)} /></label>
                    <label className={styles.field}><span>Inspiration link</span><input value={form.inspiration} onChange={(e) => update("inspiration", e.target.value)} /></label>
                    <label className={`${styles.field} ${styles.wide}`}><span>Special requirements</span><textarea value={form.requirements} onChange={(e) => update("requirements", e.target.value)} /></label>
                  </div>
                  {error && <p className={styles.inlineError}>{error}</p>}
                  <button className={styles.primaryPill} disabled={submitting} style={{ marginTop: 20, width: "100%" }} type="submit">{submitting ? "Submitting..." : "Submit Custom Request"}</button>
                </>
              )}
            </form>
            <aside className={styles.summaryCard}>
              <h2>Need Help?</h2>
              <p className={styles.muted}>Ask for help with a custom piece, or book a free consultation for room planning and fabric direction.</p>
              <div className={styles.choiceRow} style={{ marginTop: 22 }}>
                <Link className={styles.whatsappButton} href={whatsappHref("Hi Rana Velvet, I need help with a custom furniture piece.")}>Talk To Us</Link>
                <Link className={styles.secondaryPill} href="/consultation">Book Consultation <ArrowRight size={15} /></Link>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
