import Image from "next/image";
import { CtaLink } from "./CtaLink";
import { Icon, PriceSeal, Sparkle, type IconName } from "./icons";
import { heroBenefits, product, splitBRL, formatBRL } from "@/lib/product";
import heroPhoto from "../../public/media/fotos/hero-professora-contando.jpg";

const tones = ["text-brand bg-brand-50", "text-grape bg-grape-50", "text-teal-dark bg-teal-50"];

export function Hero() {
  const p = splitBRL(product.price);
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white">
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-teal/15 blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute -left-28 top-80 h-72 w-72 rounded-full bg-grape/10 blur-2xl" />

      <div className="relative mx-auto grid max-w-6xl gap-y-9 px-4 pb-14 pt-7 sm:px-6 md:grid-cols-[1.05fr_0.95fr] md:gap-x-14 md:gap-y-7 md:pb-20 md:pt-14">
        <div className="md:col-start-1 md:row-start-1 md:self-end">
          <div className="flex items-center justify-center gap-3 md:justify-start">
            <span aria-hidden className="h-0.5 w-6 rounded bg-brand/40 md:hidden" />
            <p className="rounded-full border-2 border-brand/25 bg-white px-4 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-brand shadow-sm">
              Curso livre online
            </p>
            <span aria-hidden className="h-0.5 w-6 rounded bg-brand/40 md:hidden" />
          </div>

          <h1 className="relative mt-5 text-center text-[1.85rem] font-black leading-[1.12] tracking-tight text-brand-dark min-[400px]:text-[2.05rem] sm:text-[2.6rem] md:text-left md:text-[2.35rem] lg:text-[2.8rem]">
            Entenda o autismo e descubra{" "}
            <span className="relative whitespace-nowrap text-grape">
              formas práticas
              <svg aria-hidden viewBox="0 0 200 12" preserveAspectRatio="none" className="absolute -bottom-1.5 left-0 h-2.5 w-full text-sun">
                <path d="M3 9c40-6 120-8 194-3" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
              </svg>
            </span>{" "}
            de apoiar a comunicação e a aprendizagem.
            <Sparkle className="absolute -right-2 -top-7 hidden h-10 w-10 rotate-12 text-sun lg:block" />
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-center text-[1.05rem] leading-relaxed text-muted md:mx-0 md:text-left md:text-lg">
            Um curso introdutório de ABA para pais, professores e cuidadores, com explicações simples e orientações
            para o dia a dia.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-md pt-4 md:col-start-2 md:row-span-2 md:row-start-1 md:max-w-none md:self-center md:pt-0">
          <div aria-hidden className="absolute -left-2 -top-1 bottom-4 right-4 rotate-[-3deg] rounded-[2rem] bg-teal/80 md:-left-3 md:-top-3" />
          <div aria-hidden className="absolute -bottom-3 -right-2 left-4 top-6 rotate-[2deg] rounded-[2rem] bg-sun" />
          <div className="relative overflow-hidden rounded-[2rem] border-4 border-white bg-brand-50 shadow-soft">
            <Image
              src={heroPhoto}
              alt="Professora e aluna sorrindo durante uma atividade de contagem em uma sala colorida"
              priority
              placeholder="blur"
              sizes="(min-width: 768px) 45vw, 92vw"
              className="aspect-[4/3] h-auto w-full object-cover object-[60%_center]"
            />
          </div>

          <PriceSeal className="float-soft absolute -right-1 -top-4 h-[8.25rem] w-[8.25rem] [--tilt:6deg] sm:h-40 sm:w-40 md:-left-5 md:right-auto md:-top-14 md:h-36 md:w-36 lg:left-auto lg:-right-6 lg:-top-10 lg:h-40 lg:w-40">
            <span className="block text-[11px] font-extrabold leading-none sm:text-sm">Por apenas</span>
            <span className="mt-1 flex items-start justify-center font-black leading-none">
              <span className="mt-1 text-base sm:text-lg">{p.currency}</span>
              <span className="text-[2.6rem] text-sun sm:text-5xl">{p.whole}</span>
              <span className="mt-1 text-lg text-sun sm:text-xl">,{p.cents}</span>
            </span>
          </PriceSeal>

          <div className="absolute -bottom-5 left-3 flex items-center gap-2 rounded-2xl bg-white px-3.5 py-2.5 shadow-card">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-grape-50 text-grape">
              <Icon name="users" className="h-[18px] w-[18px]" />
            </span>
            <p className="text-xs font-extrabold leading-tight text-ink">
              Para pais, professores
              <br />e cuidadores
            </p>
          </div>
        </div>

        <div className="md:col-start-1 md:row-start-2 md:self-start">
          <ul className="grid gap-2.5" aria-label="Destaques do curso">
            {heroBenefits.map((b, i) => (
              <li key={b.title} className="flex items-center gap-3 rounded-2xl border border-brand/10 bg-white p-3 shadow-card">
                <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${tones[i]}`}>
                  <Icon name={b.icon as IconName} className="h-6 w-6" />
                </span>
                <p className="flex-1 text-[15px] leading-tight text-ink">
                  {b.title} <strong className="font-black">{b.text}</strong>
                </p>
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-go text-white">
                  <Icon name="check" className="h-4 w-4" strokeWidth={3} />
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-5">
            <CtaLink id="hero-cta" kind="scroll" href="#curso" location="hero" arrow className="w-full lg:w-auto">
              Quero conhecer o curso
            </CtaLink>
            <p className="text-center text-sm font-semibold text-muted lg:text-left">
              {product.referencePrice ? <s className="mr-1">{formatBRL(product.referencePrice)}</s> : null}
              Investimento: <strong className="text-lg font-black text-grape">{formatBRL(product.price)}</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
