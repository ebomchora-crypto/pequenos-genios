"use client";

import { track } from "@/lib/analytics";
import { product } from "@/lib/product";
import { Icon } from "./icons";

type Props = {
  kind: "scroll" | "checkout";
  href?: string;
  location: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  arrow?: boolean;
  className?: string;
  id?: string;
};

const styles = {
  primary:
    "group inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-go px-6 text-base font-extrabold uppercase tracking-wide text-white shadow-[0_8px_0_0_#0e5a2c,0_14px_24px_-10px_rgba(21,128,61,0.6)] transition hover:bg-go-dark active:translate-y-1 active:shadow-[0_4px_0_0_#0e5a2c]",
  ghost:
    "inline-flex min-h-11 items-center justify-center rounded-full border-2 border-brand/20 bg-white px-4 text-sm font-extrabold text-brand transition hover:border-brand/40 hover:bg-brand-50",
};

export function CtaLink({ kind, href = "#oferta", location, children, variant = "primary", arrow = false, className = "", id }: Props) {
  const cls = `${styles[variant]} ${className}`;
  const arrowEl = arrow ? <Icon name="arrow" className="h-5 w-5 transition-transform group-hover:translate-x-1" strokeWidth={2.6} /> : null;

  if (kind === "checkout") {
    if (!product.checkoutUrl) {
      return (
        <span
          id={id}
          role="link"
          aria-disabled="true"
          className={`inline-flex min-h-14 items-center justify-center rounded-2xl bg-brand-50 px-6 text-base font-extrabold text-brand ${className}`}
        >
          Inscrições em breve
        </span>
      );
    }
    return (
      <a
        id={id}
        href={product.checkoutUrl}
        rel="noopener"
        className={cls}
        onClick={() =>
          track("begin_checkout", { item_id: product.id, item_name: product.name, value: product.price, currency: "BRL", location })
        }
      >
        {children}
        {arrowEl}
      </a>
    );
  }

  return (
    <a
      id={id}
      href={href}
      className={cls}
      onClick={() => track("select_content", { content_type: "cta", item_id: location, item_name: product.name })}
    >
      {children}
      {arrowEl}
    </a>
  );
}
