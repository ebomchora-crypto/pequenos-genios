"use client";

import { useEffect, useState } from "react";
import { CtaLink } from "./CtaLink";
import { formatBRL, product } from "@/lib/product";

/** Aparece no mobile só depois de rolar além do CTA do hero e some quando a oferta está visível. */
export function StickyCta() {
  const [pastHero, setPastHero] = useState(false);
  const [offerVisible, setOfferVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero-cta");
    const offer = document.getElementById("oferta");
    if (!hero || !offer) return;
    const heroObs = new IntersectionObserver(([e]) => setPastHero(!e.isIntersecting && e.boundingClientRect.top < 0));
    const offerObs = new IntersectionObserver(([e]) => setOfferVisible(e.isIntersecting));
    heroObs.observe(hero);
    offerObs.observe(offer);
    return () => {
      heroObs.disconnect();
      offerObs.disconnect();
    };
  }, []);

  if (!pastHero || offerVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-brand/10 bg-white/95 px-4 py-3 shadow-[0_-8px_24px_-12px_rgba(20,33,61,0.25)] backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-md items-center gap-3">
        <p className="leading-none">
          <span className="block text-[11px] font-bold text-muted">Por apenas</span>
          <span className="text-xl font-black text-grape">{formatBRL(product.price)}</span>
        </p>
        <CtaLink kind="scroll" href="#oferta" location="sticky" className="!min-h-12 flex-1 !text-sm">
          Ver a inscrição
        </CtaLink>
      </div>
    </div>
  );
}
