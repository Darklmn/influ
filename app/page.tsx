import { ScrollProgress } from "@/components/site/scroll-progress";
import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { TrustedBy } from "@/components/site/trusted-by";
import { Services } from "@/components/site/services";
import { Solutions } from "@/components/site/solutions";
import { Tracking } from "@/components/site/tracking";
import { Process } from "@/components/site/process";
import { Pricing } from "@/components/site/pricing";
import { Testimonials } from "@/components/site/testimonials";
import { FAQ } from "@/components/site/faq";
import { CTA } from "@/components/site/cta";
import { Footer } from "@/components/site/footer";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main id="main">
        <Hero />
        <TrustedBy />
        <Services />
        <Solutions />
        <Tracking />
        <Process />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
