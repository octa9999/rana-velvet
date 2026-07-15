/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import styles from "@/styles/ecommerce.module.css";

const values = [
  ["01", "Craft", "Furniture and fabrics shaped by skilled hands, measured proportions, and long-life construction."],
  ["02", "Material", "Velvet, wood, drapery, and upholstery palettes selected for touch, tone, and daily comfort."],
  ["03", "Rooms", "Every piece is considered as part of a complete home setting, not a standalone object."],
];

export default function AboutPage() {
  return (
    <div className={styles.shell}>
      <Header />
      <main>
        <section className={`${styles.hero} ${styles.heroCompact}`}>
          <span className={styles.heroKicker}>About Rana Velvet</span>
          <h1 className={styles.displayTitle}>studio since 1960</h1>
          <p className={styles.heroCopy}>
            A furniture and fabric house built around touch, proportion, and rooms that feel composed without feeling cold.
          </p>
        </section>

        <section className={styles.paperSection}>
          <div className={styles.editorialGrid}>
            <div className={styles.editorialCopy}>
              <span className={styles.heroKicker}>Our story</span>
              <h2>heritage made current</h2>
              <p>
                Rana Velvet began as a workshop dedicated to textile excellence. Today the same heritage continues through furniture, curtains, fabrics, and made-to-measure pieces for modern Pakistani homes.
              </p>
              <p>
                The studio works with restraint: generous comfort, tactile materials, clean silhouettes, and details that make a room feel personal.
              </p>
              <Link className={styles.primaryPill} href="/consultation">
                Book Consultation <ArrowRight size={15} />
              </Link>
            </div>
            <img src="/demohome-zenspace/hero.png" alt="Rana Velvet living room setting" />
          </div>
        </section>

        <section className={styles.darkBand}>
          <div className={styles.sectionHead}>
            <p>Our work is quiet, tactile, and room-led: pieces should support a complete interior instead of fighting for attention.</p>
            <h2>principles</h2>
            <Link className={styles.secondaryPill} href="/products">
              View Collection <ArrowRight size={15} />
            </Link>
          </div>
          <div className={styles.darkCards}>
            {values.map(([step, title, body]) => (
              <article className={styles.darkCard} key={step}>
                <span className={styles.heroKicker}>{step}</span>
                <h2>{title}</h2>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.paperSection}>
          <div className={styles.featureStrip}>
            <img src="/demohome-zenspace/custom.jpg" alt="Custom Rana Velvet furniture consultation" />
            <div>
              <span className={styles.heroKicker}>Made for homes</span>
              <h2>custom furniture, fabric edits, and installation support</h2>
              <p className={styles.muted}>
                Bring room photos, measurements, and references. The studio helps narrow the palette, choose finishes, and shape the order around the home.
              </p>
              <Link className={styles.secondaryPill} href="/contact">
                Talk With Us <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
