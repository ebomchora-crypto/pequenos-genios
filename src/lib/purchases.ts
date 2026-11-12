import { createHash } from "node:crypto";

/**
 * Armazenamento de inscrições CONFIRMADAS pelo webhook do checkout.
 * Guarda apenas: id anonimizado (hash), instante do pagamento e valor.
 * Nunca guarda nome, e-mail, telefone ou dados de pagamento.
 *
 * ATENÇÃO: esta implementação é em memória (serve para um único processo). Em produção
 * serverless/multi-instância troque por Redis/Upstash/banco mantendo a mesma interface.
 */
export type Purchase = { id: string; paidAt: number; amount: number };

const MAX_ENTRIES = 500;
const TTL_MS = 7 * 24 * 60 * 60 * 1000;

const g = globalThis as unknown as { __abaPurchases?: Map<string, Purchase> };
const store: Map<string, Purchase> = (g.__abaPurchases ??= new Map());

export function anonymizeOrderId(orderId: string): string {
  const salt = process.env.PURCHASE_HASH_SALT ?? process.env.CHECKOUT_WEBHOOK_SECRET ?? "";
  return createHash("sha256").update(`${salt}:${orderId}`).digest("hex").slice(0, 20);
}

function prune(now: number) {
  for (const [id, p] of store) if (now - p.paidAt > TTL_MS) store.delete(id);
  while (store.size > MAX_ENTRIES) {
    const oldest = store.keys().next().value;
    if (oldest === undefined) break;
    store.delete(oldest);
  }
}

export function recordPurchase(orderId: string, paidAtMs: number, amount: number): "created" | "duplicate" {
  const now = Date.now();
  const id = anonymizeOrderId(orderId);
  if (store.has(id)) return "duplicate";
  store.set(id, { id, paidAt: Math.min(paidAtMs, now), amount });
  prune(now);
  return "created";
}

export function findPurchase(orderId: string): Purchase | undefined {
  return store.get(anonymizeOrderId(orderId));
}

export function recentPurchases(windowMs = 2 * 60 * 60 * 1000, limit = 3): Purchase[] {
  const now = Date.now();
  prune(now);
  return [...store.values()]
    .filter((p) => now - p.paidAt <= windowMs)
    .sort((a, b) => b.paidAt - a.paidAt)
    .slice(0, limit);
}
