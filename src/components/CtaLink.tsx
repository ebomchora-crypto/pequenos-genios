"use client";

import { track } from "@/lib/analytics";
import { product } from "@/lib/product";

type Props = {
  kind: "scroll" | "checkout";
  href?: string;
  location: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  id?: string;
};

const styles = {
  primary:
    "inline-flex min-h-12 items-center justify-center rounded-xl bg-petrol-700 px-6 text-base font-bold text-white shadow-sm transition hover:bg-petrol-900 active:translate-y-px",
  ghost:
    "inline-flex min-h-11 items-center justify-center rounded-xl border border-petrol-900/25 px-4 text-sm font-semibold text-petrol-900 transition hover:bg-aqua-50",
};

export function CtaLink({ kind, href = "#oferta", location, children, variant = "primary", className = "", id }: Props) {
  const cls = `${styles[variant]} ${className}`;

  if (kind === "checkout") {
    if (!product.checkoutUrl) {
      return (
        <span
          id={id}
          role="link"
          aria-disabled="true"
          className={`${cls} cursor-not-allowed !bg-petrol-900/15 !text-petrol-900/70 shadow-none`}
        >
          Inscrições ainda não abertas
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
          track("begin_checkout", {
            item_id: product.id,
            item_name: product.name,
            value: product.price,
            currency: "BRL",
            location,
          })
        }
      >
        {children}
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
    </a>
  );
}
