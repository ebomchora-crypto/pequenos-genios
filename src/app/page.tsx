import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Faq, Footer, ForWhom, HowItWorks, Included, Learn, Materials, Offer, RealLife } from "@/components/Sections";
import { StickyCta } from "@/components/StickyCta";
import { RecentPurchaseToast } from "@/components/RecentPurchaseToast";
import { ViewItemTracker } from "@/components/ViewItemTracker";

export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <ForWhom />
        <RealLife />
        <Learn />
        <Included />
        <Materials />
        <HowItWorks />
        <Offer />
        <Faq />
      </main>
      <Footer />
      <StickyCta />
      <RecentPurchaseToast />
      <ViewItemTracker />
    </>
  );
}
