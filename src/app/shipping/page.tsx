import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import styles from "@/styles/ecommerce.module.css";

const items = [
  "Orders are received as requests and confirmed by the Rana Velvet team before dispatch.",
  "Ready-made product delivery time must be confirmed by the business before launch.",
  "Furniture and custom order production time is confirmed after design, stock, and quotation review.",
  "Cities served, delivery charges, and store pickup information must be verified before launch.",
  "Customers should inspect product condition, quantity, and selected options at delivery.",
];

export default function ShippingPage() {
  return (
    <div className={styles.shell}>
      <Header />
      <main>
        <section className={`${styles.hero} ${styles.heroCompact}`}>
          <span className={styles.heroKicker}>Information</span>
          <h1 className={styles.displayTitle}>shipping</h1>
          <p className={styles.heroCopy}>Delivery details below are launch-ready placeholders and should be checked by Rana Velvet before publishing final wording.</p>
        </section>
        <section className={styles.paperSection}>
          <div className={styles.infoGrid}>
            {items.map((item, index) => <article className={styles.infoCard} key={item}><span className={styles.heroKicker}>{index + 1}</span><p>{item}</p></article>)}
          </div>
          <div className={styles.choiceRow} style={{ justifyContent: "center", marginTop: 34 }}>
            <Link className={styles.primaryPill} href="/contact">Ask Delivery Question <ArrowRight size={15} /></Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
