"use client";

import { useSyncExternalStore } from "react";
import { getConsent, subscribeConsent, type Consent } from "@/lib/consent";

export function useConsent(): Consent {
  return useSyncExternalStore(subscribeConsent, getConsent, () => "unknown" as Consent);
}
