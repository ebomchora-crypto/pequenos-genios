import Image from "next/image";
import { CtaLink } from "./CtaLink";
import { HeroIllustration } from "./HeroIllustration";
import { IconClock, IconPlay, IconPrint } from "./icons";
import { formatBRL, product } from "@/lib/product";

const micro = [
  { icon: IconPlay, label: "Aulas por módulos" },
  { icon: IconPrint, label: "Materiais para imprimir" },
  { icon: IconClock, label: "Estudo no seu ritmo" },
];

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl gap-8 px-4 pb-12 pt-8 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-12 md:pb-20 md:pt-14">
      <div>
        <p className="inline-block rounded-full bg-coral-100 px-3 py-1 text-xs font-extrabold uppercase tracking-widest text-coral-700">
          Curso livre online
        </p>
        <h1 className="mt-4 text-[1.95rem] font-extrabold leading-[1.12] tracking-tight text-petrol-900 sm:text-4xl lg:text-[2.9rem]">
          Entenda a ABA e aprenda a apoiar a comunicação, a autonomia e a aprendizagem com mais segurança.
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink/85">
          Uma introdução clara e respeitosa, com aulas organizadas e materiais práticos para pais, cuidadores e
          educadores.
        </p>

        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Destaques do curso">
          {micro.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-2 rounded-full border border-petrol-900/15 bg-white px-3 py-2 text-sm font-semibold text-petrol-900"
            >
              <Icon className="h-5 w-5 text-petrol-600" />
              {label}
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
          <CtaLink id="hero-cta" kind="scroll" href="#curso" location="hero" className="w-full sm:w-auto">
            Quero conhecer o curso
          </CtaLink>
          <p className="text-sm text-ink/80">
            {product.priceLabel ? <span className="font-semibold text-coral-700">{product.priceLabel}: </span> : null}
            {product.referencePrice ? (
              <span className="mr-1 line-through decoration-coral-500">{formatBRL(product.referencePrice)}</span>
            ) : null}
            <span className="text-xl font-extrabold text-petrol-900">{formatBRL(product.price)}</span>
          </p>
        </div>
      </div>

      <div>
        {product.hero ? (
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-petrol-900/10 bg-white shadow-lg">
            <Image src={product.hero.src} alt={product.hero.alt} fill priority sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
          </div>
        ) : (
          <HeroIllustration />
        )}
      </div>
    </section>
  );
}
