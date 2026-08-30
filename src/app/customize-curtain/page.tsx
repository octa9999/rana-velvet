"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { referenceNumber, whatsappHref } from "@/lib/storefront";
import styles from "@/styles/ecommerce.module.css";

const roomTypes = ["Living room", "Bedroom", "Drawing room", "Dining room", "Office", "Other"];
const fabrics = ["Premium Velvet", "Sheer", "Blackout", "Help me choose"];
const stylesList = ["Eyelet", "Wave", "Pinch pleat", "Help me choose"];
const linings = ["No lining", "Standard lining", "Blackout lining", "Help me choose"];
const accessories = ["No accessories", "Curtain rods", "Holdbacks", "Tiebacks", "Need guidance"];

export default function CustomizeCurtainPage() {
  const [path, setPath] = useState<"measurements" | "visit">("measurements");
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState("");
  const [error, setError] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [form, setForm] = useState({
    roomType: "Living room",
    width: "",
    height: "",
    unit: "inches",
    pieces: "1",
    fabric: "",
    curtainStyle: "Eyelet",
    lining: "No lining",
    accessories: "No accessories",
    installation: "No",
    budget: "",
    city: "",
    area: "",
    address: "",
    date: "",
    time: "",
    name: "",
    phone: "",
    email: "",
    notes: "",
  });

  const update = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (!form.name.trim()) return setError("Please enter your full name.");
    if (form.phone.trim().length < 7) return setError("Please enter a valid phone number.");
    if (path === "measurements" && !form.width.trim()) return setError("Please enter the curtain width.");
    if (path === "measurements" && !form.height.trim()) return setError("Please enter the curtain height.");
    if (!form.fabric) return setError("Please select a fabric.");
    if (path === "visit" && !form.date) return setError("Please choose a visit date.");
    if (path === "visit" && !form.address.trim()) return setError("Please enter the complete address.");
    if (!accepted) return setError("Please accept the confirmation note before submitting.");

    setSubmitting(true);
    const ref = referenceNumber(path === "visit" ? "RV-CV" : "RV-CR");
    const message = `${path === "visit" ? "Curtain measurement visit" : "Custom curtain request"} ${ref}
Room: ${form.roomType}
Measurements: ${form.width || "-"} x ${form.height || "-"} ${form.unit}; pieces: ${form.pieces}
Fabric: ${form.fabric}; style: ${form.curtainStyle}; lining: ${form.lining}; accessories: ${form.accessories}; installation: ${form.installation}
Budget: ${form.budget || "-"}
Visit: ${form.date || "-"} ${form.time || "-"}
Address: ${form.address || "-"}, ${form.area || "-"}, ${form.city || "-"}
Notes: ${form.notes || "-"}`;

    const endpoint = path === "visit" ? "/api/appointments" : "/api/inquiries";
    const body =
      path === "visit"
        ? { name: form.name, email: form.email || "no-email@ranavelvet.local", phone: form.phone, date: form.date, time: form.time || "To confirm", service: "Curtain measurement visit", message }
        : { name: form.name, email: form.email || "no-email@ranavelvet.local", phone: form.phone, subject: `Curtain customization ${ref}`, message };

    const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    setSubmitting(false);
    if (!response.ok) return setError("We could not submit your request. Please try again or contact us on WhatsApp.");
    setReference(ref);
  };

  return (
    <div className={styles.shell}>
      <Header />
      <main>
        <section className={`${styles.hero} ${styles.heroCompact}`}>
          <span className={styles.heroKicker}>Customize Your Curtain</span>
          <h1 className={styles.displayTitle}>Made To Measure</h1>
          <p className={styles.heroCopy}>Enter your own measurements or book a visit so Rana Velvet can measure the space.</p>
        </section>
        <section className={styles.paperSection}>
          <div className={styles.contentGrid}>
            <form className={styles.formCard} onSubmit={submit}>
              <div className={styles.choiceRow} style={{ marginBottom: 24 }}>
                <button className={`${styles.secondaryPill} ${path === "measurements" ? styles.primaryPill : ""}`} onClick={() => setPath("measurements")} type="button">I Have Measurements</button>
                <button className={`${styles.secondaryPill} ${path === "visit" ? styles.primaryPill : ""}`} onClick={() => setPath("visit")} type="button">Book A Measurement Visit</button>
              </div>
              {reference ? (
                <div className={styles.successPanel}>
                  <CheckCircle2 size={22} />
                  <h2>Request received</h2>
                  <p>Reference: {reference}. The requested time or final price is not confirmed until the team contacts you.</p>
                  <div className={styles.choiceRow}>
                    <Link className={styles.whatsappButton} href={whatsappHref(`Hi Rana Velvet, please confirm curtain request ${reference}.`)}>
                      Confirm on WhatsApp
                    </Link>
                    <Link className={styles.secondaryPill} href="/">Return Home</Link>
                  </div>
                </div>
              ) : (
                <>
                  <h2>{path === "visit" ? "Visit Booking" : "Curtain Request"}</h2>
                  <p className={styles.muted} style={{ margin: "14px 0 24px" }}>Measure the full area to be covered, not only the glass.</p>
                  <div className={styles.formGrid}>
                    <label className={styles.field}><span>Room type</span><select value={form.roomType} onChange={(e) => update("roomType", e.target.value)}>{roomTypes.map((item) => <option key={item}>{item}</option>)}</select></label>
                    {path === "measurements" && (
                      <>
                        <label className={styles.field}><span>Coverage width</span><input value={form.width} onChange={(e) => update("width", e.target.value)} /></label>
                        <label className={styles.field}><span>Finished height</span><input value={form.height} onChange={(e) => update("height", e.target.value)} /></label>
                        <label className={styles.field}><span>Unit</span><select value={form.unit} onChange={(e) => update("unit", e.target.value)}><option>inches</option><option>feet</option><option>centimetres</option></select></label>
                        <label className={styles.field}><span>Pieces</span><input value={form.pieces} onChange={(e) => update("pieces", e.target.value)} /></label>
                      </>
                    )}
                    {path === "visit" && (
                      <>
                        <label className={styles.field}><span>City</span><input value={form.city} onChange={(e) => update("city", e.target.value)} /></label>
                        <label className={styles.field}><span>Area</span><input value={form.area} onChange={(e) => update("area", e.target.value)} /></label>
                        <label className={`${styles.field} ${styles.wide}`}><span>Complete address</span><input value={form.address} onChange={(e) => update("address", e.target.value)} /></label>
                        <label className={styles.field}><span>Preferred date</span><input type="date" value={form.date} onChange={(e) => update("date", e.target.value)} /></label>
                        <label className={styles.field}><span>Preferred time</span><input type="time" value={form.time} onChange={(e) => update("time", e.target.value)} /></label>
                      </>
                    )}
                    <label className={styles.field}><span>Fabric</span><select value={form.fabric} onChange={(e) => update("fabric", e.target.value)}><option value="">Select fabric</option>{fabrics.map((item) => <option key={item}>{item}</option>)}</select></label>
                    <label className={styles.field}><span>Curtain style</span><select value={form.curtainStyle} onChange={(e) => update("curtainStyle", e.target.value)}>{stylesList.map((item) => <option key={item}>{item}</option>)}</select></label>
                    <label className={styles.field}><span>Lining</span><select value={form.lining} onChange={(e) => update("lining", e.target.value)}>{linings.map((item) => <option key={item}>{item}</option>)}</select></label>
                    <label className={styles.field}><span>Accessories Required</span><select value={form.accessories} onChange={(e) => update("accessories", e.target.value)}>{accessories.map((item) => <option key={item}>{item}</option>)}</select></label>
                    <label className={styles.field}><span>Installation required</span><select value={form.installation} onChange={(e) => update("installation", e.target.value)}><option>No</option><option>Yes</option></select></label>
                    <label className={styles.field}><span>Approximate budget</span><input value={form.budget} onChange={(e) => update("budget", e.target.value)} placeholder="Optional" /></label>
                    <label className={styles.field}><span>Full name</span><input value={form.name} onChange={(e) => update("name", e.target.value)} /></label>
                    <label className={styles.field}><span>Phone/WhatsApp</span><input value={form.phone} onChange={(e) => update("phone", e.target.value)} /></label>
                    <label className={styles.field}><span>Email optional</span><input value={form.email} onChange={(e) => update("email", e.target.value)} /></label>
                    <label className={`${styles.field} ${styles.wide}`}><span>Extra notes</span><textarea value={form.notes} onChange={(e) => update("notes", e.target.value)} /></label>
                  </div>
                  <label className={styles.checkField} style={{ marginTop: 18 }}>
                    <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} />
                    <span>Final price will be confirmed after measurements and fabric availability are reviewed.</span>
                  </label>
                  {error && <p className={styles.inlineError}>{error}</p>}
                  <button className={styles.primaryPill} disabled={submitting} style={{ marginTop: 20, width: "100%" }} type="submit">
                    {submitting ? "Submitting..." : path === "visit" ? "Submit Booking" : "Submit Curtain Request"}
                  </button>
                </>
              )}
            </form>
            <aside className={styles.summaryCard}>
              <h2>Fabric Cards</h2>
              <div className={styles.summaryRows}>
                {["Ivory Premium Velvet", "Mocha Premium Velvet", "Forest Green Premium Velvet", "Burgundy Premium Velvet"].map((item) => (
                  <div key={item}><span>{item}</span><strong>350 GSM</strong></div>
                ))}
              </div>
              <p className={styles.muted}>Selected fabric, lining, accessories, and installation preferences are included with your curtain request.</p>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
