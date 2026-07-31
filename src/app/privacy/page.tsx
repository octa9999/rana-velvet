import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import styles from "@/styles/ecommerce.module.css";

const items = [
  "We collect details needed to process orders, curtain requests, custom furniture inquiries, bookings, and support messages.",
  "Information is used to contact customers, review requests, prepare quotations, arrange delivery, and improve service.",
  "Customers can contact Rana Velvet to ask about, correct, or remove their information where applicable.",
  "Outside services may receive required information for forms, delivery, payments, communication, hosting, or website measurement.",
];

export default function PrivacyPage() {
  return (
    <div className={styles.shell}>
      <Header />
      <main>
        <section className={`${styles.hero} ${styles.heroCompact}`}><span className={styles.heroKicker}>Information</span><h1 className={styles.displayTitle}>Privacy</h1><p className={styles.heroCopy}>A simple customer-friendly privacy summary for review before launch.</p></section>
        <section className={styles.paperSection}><div className={styles.infoGrid}>{items.map((item) => <article className={styles.infoCard} key={item}><p>{item}</p></article>)}</div></section>
      </main>
      <Footer />
    </div>
  );
}
