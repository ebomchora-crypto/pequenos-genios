"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";
import { product } from "@/lib/product";
import { useConsent } from "./useConsent";

/**
 * Renderizado APENAS pela página de confirmação depois que o servidor validou o pedido
 * (webhook assinado). Dispara `purchase` uma única vez por pedido neste navegador.
 */
export function PurchaseTracker({ transactionId, value }: { transactionId: string; value: number }) {
  const consent = useConsent();
  useEffect(() => {
    if (consent !== "granted") return;
    const key = `aba_purchase_sent_${transactionId}`;
    try {
      if (window.localStorage.getItem(key)) return;
      window.localStorage.setItem(key, "1");
    } catch {
      /* sem armazenamento: o ID da transação permite deduplicação no GA4 */
    }
    track("purchase", {
      transaction_id: transactionId,
      item_id: product.id,
      item_name: product.name,
      value,
      currency: "BRL",
    });
  }, [consent, transactionId, value]);
  return null;
}
