import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import styles from "@/styles/ecommerce.module.css";

export default function NotFound() {
  return (
    <div className={styles.shell}>
      <Header />
      <main>
        <section className={`${styles.hero} ${styles.heroCompact}`}>
          <span className={styles.heroKicker}>Page Not Found</span>
          <h1 className={styles.displayTitle}>This room is still being styled.</h1>
          <p className={styles.heroCopy}>The page you opened is not ready yet.</p>
          <div className={styles.choiceRow} style={{ justifyContent: "center", marginTop: 30 }}>
            <Link className={styles.primaryPill} href="/">Return Home <ArrowRight size={15} /></Link>
            <Link className={styles.secondaryPill} href="/products">Visit Shop</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
