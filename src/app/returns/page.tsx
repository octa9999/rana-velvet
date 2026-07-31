import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import styles from "@/styles/ecommerce.module.css";

const items = [
  "Ready-made return/exchange eligibility must be confirmed before launch.",
  "Customers should report damage or incorrect items as soon as possible with order reference and photos.",
  "Returned products must remain unused and in the condition approved by Rana Velvet.",
  "Custom and made-to-order products may not be returnable after approval and production.",
  "Approved refunds, replacements, or exchanges are handled after team review.",
];

export default function ReturnsPage() {
  return (
    <div className={styles.shell}>
      <Header />
      <main>
        <section className={`${styles.hero} ${styles.heroCompact}`}>
          <span className={styles.heroKicker}>Information</span>
          <h1 className={styles.displayTitle}>Returns</h1>
          <p className={styles.heroCopy}>Final returns and exchange wording must be checked by Rana Velvet before launch.</p>
        </section>
        <section className={styles.paperSection}><div className={styles.infoGrid}>{items.map((item) => <article className={styles.infoCard} key={item}><p>{item}</p></article>)}</div></section>
      </main>
      <Footer />
    </div>
  );
}
