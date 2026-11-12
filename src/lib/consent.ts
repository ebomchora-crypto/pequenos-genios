export type Consent = "granted" | "denied" | "unknown";

const KEY = "aba_consent_v1";
const EVENT = "aba:consent-change";

export function getConsent(): Consent {
  try {
    const v = window.localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : "unknown";
  } catch {
    return "unknown";
  }
}

export function setConsent(value: Exclude<Consent, "unknown">) {
  try {
    window.localStorage.setItem(KEY, value);
  } catch {
    /* armazenamento indisponível: a escolha vale só nesta visita */
  }
  window.dispatchEvent(new Event(EVENT));
}

export function subscribeConsent(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}
