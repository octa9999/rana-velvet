import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import styles from "@/styles/ecommerce.module.css";

const items = [
  "Ready-made return and exchange eligibility is reviewed by the Rana Velvet team for each order.",
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
          <p className={styles.heroCopy}>A clear review process for returns, exchanges, and order support.</p>
        </section>
        <section className={styles.paperSection}><div className={styles.infoGrid}>{items.map((item) => <article className={styles.infoCard} key={item}><p>{item}</p></article>)}</div></section>
      </main>
      <Footer />
    </div>
  );
}
