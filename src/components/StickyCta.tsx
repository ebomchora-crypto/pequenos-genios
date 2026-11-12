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
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-petrol-900/10 bg-white/95 p-3 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-md items-center gap-3">
        <p className="text-lg font-extrabold text-petrol-900">{formatBRL(product.price)}</p>
        <CtaLink kind="scroll" href="#oferta" location="sticky" className="!min-h-11 flex-1 !text-sm">
          Ver a inscrição
        </CtaLink>
      </div>
    </div>
  );
}
