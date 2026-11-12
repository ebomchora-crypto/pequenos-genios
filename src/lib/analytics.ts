import { getConsent } from "./consent";

/**
 * Funções de analytics desacopladas. Nada é enviado sem consentimento.
 * `purchase` só deve ser chamado pela página de confirmação validada no servidor
 * (ver PurchaseTracker). Nunca chame `purchase` em clique de botão.
 */
export type AnalyticsEvent = "view_item" | "select_content" | "begin_checkout" | "purchase";
type Params = Record<string, string | number | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: ((...args: unknown[]) => void) & { queue?: unknown[] };
  }
}

const metaEventName: Record<AnalyticsEvent, string> = {
  view_item: "ViewContent",
  select_content: "SelectContent",
  begin_checkout: "InitiateCheckout",
  purchase: "Purchase",
};

const queue: Array<[AnalyticsEvent, Params]> = [];

function send(name: AnalyticsEvent, params: Params) {
  window.gtag?.("event", name, { ...params, transport_type: "beacon" });
  if (window.fbq) {
    const meta: Params = { content_name: params.item_name, value: params.value, currency: params.currency };
    if (name === "select_content") window.fbq("trackCustom", metaEventName[name], meta);
    else window.fbq("track", metaEventName[name], meta);
  }
}

export function track(name: AnalyticsEvent, params: Params = {}) {
  if (typeof window === "undefined" || getConsent() !== "granted") return;
  if (!window.gtag && !window.fbq) {
    queue.push([name, params]);
    return;
  }
  send(name, params);
}

export function flushAnalyticsQueue() {
  while (queue.length) {
    const next = queue.shift();
    if (next) send(next[0], next[1]);
  }
}
