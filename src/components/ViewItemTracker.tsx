"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";
import { product } from "@/lib/product";
import { useConsent } from "./useConsent";

export function ViewItemTracker() {
  const consent = useConsent();
  useEffect(() => {
    if (consent !== "granted") return;
    track("view_item", { item_id: product.id, item_name: product.name, value: product.price, currency: "BRL" });
  }, [consent]);
  return null;
}
