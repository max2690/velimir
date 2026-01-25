import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { ScrollTracker } from "@/components/ScrollTracker";
import { Hero } from "@/components/sections/Hero";
import { Philosophy } from "@/components/sections/Philosophy";
import { Products } from "@/components/sections/Products";
import { Process } from "@/components/sections/Process";
import { Cases } from "@/components/sections/Cases";
import { Gallery } from "@/components/sections/Gallery";
import { FAQ } from "@/components/sections/FAQ";
import { CTAForm } from "@/components/sections/CTAForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <ScrollTracker />
      <Header />
      
      <Hero />
      <Philosophy />
      <Products />
      <Process />
      <Cases />
      <Gallery />
      <FAQ />
      <CTAForm />
      
      <Footer />
      <FloatingContact />
    </main>
  );
}
