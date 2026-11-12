"use client";

import Link from "next/link";
import { getConsent, resetConsent, setConsent } from "@/lib/consent";
import { Icon } from "./icons";
import { useConsent } from "./useConsent";

export function ConsentBanner() {
  const consent = useConsent();
  if (consent !== "unknown") return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookies-titulo"
      aria-describedby="cookies-texto"
      className="toast-in fixed inset-x-3 bottom-3 z-50 mx-auto max-w-md overflow-hidden rounded-3xl bg-white shadow-[0_18px_50px_-12px_rgba(20,33,61,0.45)] ring-1 ring-brand/10 sm:left-6 sm:right-auto"
    >
      <div aria-hidden className="grid h-1.5 grid-cols-5">
        <span className="bg-grape" />
        <span className="bg-sun" />
        <span className="bg-brand" />
        <span className="bg-teal" />
        <span className="bg-go" />
      </div>
      <div className="p-5">
        <div className="flex items-start gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand">
            <Icon name="shield" className="h-6 w-6" />
          </span>
          <div>
            <p id="cookies-titulo" className="text-lg font-black leading-tight text-brand-dark">
              Podemos usar cookies?
            </p>
            <p id="cookies-texto" className="mt-1.5 text-[15px] leading-relaxed text-muted">
              Eles mostram quais anúncios trazem as pessoas até aqui (Meta e Utmify), para o curso chegar a quem ele
              pode ajudar. Você pode mudar de ideia quando quiser no rodapé.{" "}
              <Link href="/privacidade" className="font-bold text-brand underline">
                Saiba mais
              </Link>
            </p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => setConsent("denied")}
            className="min-h-12 rounded-2xl border-2 border-brand/20 bg-white px-4 text-[15px] font-extrabold text-brand-dark transition hover:bg-brand-50"
          >
            Recusar
          </button>
          <button
            type="button"
            onClick={() => setConsent("granted")}
            className="min-h-12 rounded-2xl bg-brand px-4 text-[15px] font-extrabold text-white transition hover:bg-brand-dark"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}

/** Link do rodapé para rever a escolha. Se a pessoa tinha aceitado, recarrega para descarregar os scripts de medição. */
export function CookiePreferencesButton() {
  return (
    <button
      type="button"
      className="font-bold text-white underline"
      onClick={() => {
        const had = getConsent();
        resetConsent();
        if (had === "granted") window.location.reload();
      }}
    >
      Preferências de cookies
    </button>
  );
}
