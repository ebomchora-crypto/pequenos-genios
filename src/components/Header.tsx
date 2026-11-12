import { CtaLink } from "./CtaLink";
import { product } from "@/lib/product";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-petrol-900/10 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <a href="#" className="flex items-center gap-2 text-petrol-900" aria-label={`${product.name} — início`}>
          <span aria-hidden className="grid h-8 w-8 place-items-center rounded-lg bg-petrol-700 text-sm font-extrabold text-white">
            A
          </span>
          <span className="text-sm font-extrabold leading-tight tracking-tight sm:text-base">{product.name}</span>
        </a>
        <CtaLink kind="scroll" href="#curso" variant="ghost" location="header" className="shrink-0 whitespace-nowrap">
          Ver o curso
        </CtaLink>
      </div>
    </header>
  );
}
