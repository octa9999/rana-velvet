import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import styles from "@/styles/ecommerce.module.css";

const items = [
  "Product images, colours, fabric texture, and written details can vary from the final item.",
  "Prices, quotations, production times, and delivery charges can change until confirmed by Rana Velvet.",
  "Orders submitted on the website are requests until stock, timing, payment, and delivery are confirmed.",
  "Custom work begins after customer approval of quotation and agreed details.",
  "Website images and written content belong to Rana Velvet or their approved suppliers.",
];

export default function TermsPage() {
  return (
    <div className={styles.shell}>
      <Header />
      <main>
        <section className={`${styles.hero} ${styles.heroCompact}`}><span className={styles.heroKicker}>Information</span><h1 className={styles.displayTitle}>terms</h1><p className={styles.heroCopy}>Final legal wording should be reviewed by the business before launch.</p></section>
        <section className={styles.paperSection}><div className={styles.infoGrid}>{items.map((item) => <article className={styles.infoCard} key={item}><p>{item}</p></article>)}</div></section>
      </main>
      <Footer />
    </div>
  );
}
