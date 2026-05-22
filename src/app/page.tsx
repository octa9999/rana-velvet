import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { Collections } from "@/components/home/Collections";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { ConsultationCTA } from "@/components/home/ConsultationCTA";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Collections />
        <FeaturedProducts />
        <WhyChooseUs />
        <ConsultationCTA />
      </main>
      <Footer />
    </>
  );
}