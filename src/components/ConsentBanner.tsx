"use client";

import Link from "next/link";
import { setConsent } from "@/lib/consent";
import { useConsent } from "./useConsent";

export function ConsentBanner() {
  const consent = useConsent();
  if (consent !== "unknown") return null;

  return (
    <div
      role="dialog"
      aria-label="Preferências de privacidade"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-xl rounded-2xl border border-brand-dark/10 bg-white p-4 shadow-xl sm:left-6 sm:right-auto"
    >
      <p className="text-sm leading-relaxed text-ink">
        Usamos cookies de medição e de origem de campanha (Meta Pixel e Utmify) para entender o uso da página, somente com a sua
        permissão. Veja a <Link href="/privacidade" className="font-semibold underline">política de privacidade</Link>.
      </p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => setConsent("granted")}
          className="min-h-11 flex-1 rounded-xl bg-brand px-4 text-sm font-semibold text-white hover:bg-brand-dark"
        >
          Aceitar
        </button>
        <button
          type="button"
          onClick={() => setConsent("denied")}
          className="min-h-11 flex-1 rounded-xl border border-brand-dark/25 px-4 text-sm font-semibold text-brand-dark hover:bg-brand-50"
        >
          Recusar
        </button>
      </div>
    </div>
  );
}
