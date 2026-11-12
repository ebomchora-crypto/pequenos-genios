import { CtaLink } from "./CtaLink";
import { product } from "@/lib/product";

export function ColorStripe() {
  return (
    <div aria-hidden className="grid h-1.5 grid-cols-5">
      <span className="bg-grape" />
      <span className="bg-sun" />
      <span className="bg-brand" />
      <span className="bg-teal" />
      <span className="bg-go" />
    </div>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <ColorStripe />
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 border-b border-brand/10 px-4 sm:px-6">
        <a href="#" className="flex items-center gap-2.5" aria-label={`${product.name}, início`}>
          <span aria-hidden className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand text-[13px] font-black tracking-tight text-white shadow-soft">
            ABA
          </span>
          <span className="leading-none">
            <span className="block text-[15px] font-black text-brand">ABA e Autismo</span>
            <span className="block text-[13px] font-extrabold text-teal-dark">na Prática</span>
          </span>
        </a>
        <CtaLink kind="scroll" href="#curso" variant="ghost" location="header" className="shrink-0 whitespace-nowrap">
          Ver o curso
        </CtaLink>
      </div>
    </header>
  );
}
