import Image from "next/image";
import { CtaLink } from "./CtaLink";
import { IconCheck, IconChevron, IconFile, IconShield, IconUsers } from "./icons";
import {
  audiences,
  company,
  faq,
  formatBRL,
  isReady,
  learnTopics,
  product,
  readyItems,
  showcaseImages,
} from "@/lib/product";

function SectionTitle({ eyebrow, title, intro }: { eyebrow?: string; title: string; intro?: string }) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? <p className="text-xs font-extrabold uppercase tracking-widest text-coral-700">{eyebrow}</p> : null}
      <h2 className="mt-2 text-2xl font-extrabold leading-tight tracking-tight text-petrol-900 sm:text-3xl">{title}</h2>
      {intro ? <p className="mt-3 text-base leading-relaxed text-ink/85">{intro}</p> : null}
    </div>
  );
}

export function ForWhom() {
  return (
    <section className="bg-white py-12 sm:py-16" aria-labelledby="para-quem">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle
          eyebrow="Para quem é"
          title="Para quem quer começar com clareza"
          intro="É um curso introdutório de estudo e orientação. Não é um treinamento para atendimento clínico."
        />
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a) => (
            <li key={a.title} className="rounded-2xl border border-petrol-900/10 bg-paper p-5">
              <IconUsers className="h-7 w-7 text-petrol-600" />
              <h3 className="mt-3 text-lg font-bold text-petrol-900">{a.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink/85">{a.text}</p>
            </li>
          ))}
        </ul>
      </div>
      <span id="para-quem" className="sr-only" />
    </section>
  );
}

export function Learn() {
  return (
    <section id="curso" className="py-12 sm:py-16" aria-labelledby="aprender-titulo">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div id="aprender-titulo">
          <SectionTitle
            eyebrow="Conteúdo"
            title="O que você vai aprender"
            intro="Dez temas para entender os conceitos, os limites e as boas práticas de apoio, com respeito à pessoa."
          />
        </div>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {learnTopics.map((t, i) => (
            <li key={t.title} className="flex gap-4 rounded-2xl border border-petrol-900/10 bg-white p-5">
              <span
                aria-hidden
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-aqua-100 text-sm font-extrabold text-petrol-700"
              >
                {i + 1}
              </span>
              <div>
                <h3 className="text-base font-bold leading-snug text-petrol-900">{t.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink/85">{t.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Included() {
  return (
    <section className="bg-petrol-900 py-12 text-white sm:py-16" aria-labelledby="incluido-titulo">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 id="incluido-titulo" className="text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
          O que está incluído
        </h2>
        {readyItems.length > 0 ? (
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {readyItems.map((item) => (
              <li key={item.key} className="flex gap-3 rounded-2xl bg-white/10 p-5">
                <IconCheck className="mt-0.5 h-6 w-6 shrink-0 text-aqua-300" />
                <div>
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/85">{item.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-6 max-w-xl rounded-2xl bg-white/10 p-5 text-base leading-relaxed text-white/90">
            O conteúdo está em preparação. Os itens incluídos serão listados aqui à medida que estiverem
            disponíveis para os alunos.
          </p>
        )}
      </div>
    </section>
  );
}

export function Showcase() {
  if (showcaseImages.length === 0) return null;
  return (
    <section className="py-12 sm:py-16" aria-labelledby="mostruario-titulo">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 id="mostruario-titulo" className="text-2xl font-extrabold tracking-tight text-petrol-900 sm:text-3xl">
          Veja páginas do material
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-3">
          {showcaseImages.map((img) => (
            <li key={img.src}>
              <figure className="overflow-hidden rounded-2xl border border-petrol-900/10 bg-white">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  loading="lazy"
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="h-auto w-full"
                />
                <figcaption className="p-3 text-sm text-ink/85">{img.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const steps = [
    "Faça a compra em ambiente seguro de pagamento.",
    "Receba as instruções de acesso ao conteúdo na área de membros.",
    "Estude no seu ritmo, no celular ou no computador.",
    ...(isReady("quiz") ? ["Conclua o questionário de revisão."] : []),
    ...(isReady("certificate") ? ["Solicite o certificado de participação, emitido pelo responsável pelo curso."] : []),
  ];
  return (
    <section className="py-12 sm:py-16" aria-labelledby="como-funciona">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 id="como-funciona" className="text-2xl font-extrabold tracking-tight text-petrol-900 sm:text-3xl">
          Como funciona
        </h2>
        <ol className="mt-8 grid gap-3 md:grid-cols-2">
          {steps.map((s, i) => (
            <li key={s} className="flex items-start gap-4 rounded-2xl border border-petrol-900/10 bg-white p-5">
              <span
                aria-hidden
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-petrol-700 text-sm font-extrabold text-white"
              >
                {i + 1}
              </span>
              <p className="pt-1 text-base leading-snug text-ink">{s}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Offer() {
  return (
    <section id="oferta" className="bg-aqua-100 py-12 sm:py-16" aria-labelledby="oferta-titulo">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="rounded-3xl border border-petrol-900/10 bg-white p-6 shadow-lg sm:p-9">
          <h2 id="oferta-titulo" className="text-2xl font-extrabold tracking-tight text-petrol-900 sm:text-3xl">
            Inscrição no curso
          </h2>
          <p className="mt-1 text-sm text-ink/80">{product.name}</p>

          <p className="mt-5">
            {product.priceLabel ? (
              <span className="mb-1 block text-sm font-bold text-coral-700">{product.priceLabel}</span>
            ) : null}
            {product.referencePrice ? (
              <span className="mr-2 text-lg text-ink/70 line-through decoration-coral-500">
                {formatBRL(product.referencePrice)}
              </span>
            ) : null}
            <span className="text-4xl font-extrabold text-petrol-900">{formatBRL(product.price)}</span>
          </p>

          {readyItems.length > 0 ? (
            <ul className="mt-6 space-y-2">
              {readyItems.map((i) => (
                <li key={i.key} className="flex items-start gap-3 text-base">
                  <IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-petrol-600" />
                  <span>{i.title}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-6 text-base text-ink/85">Os itens incluídos serão listados aqui quando estiverem disponíveis.</p>
          )}

          <CtaLink kind="checkout" location="offer" className="mt-7 w-full">
            Quero me inscrever
          </CtaLink>

          {product.refundPolicy ? (
            <p className="mt-5 flex gap-2 text-sm leading-relaxed text-ink/85">
              <IconShield className="mt-0.5 h-5 w-5 shrink-0 text-petrol-600" />
              <span>
                <strong>Reembolso:</strong> {product.refundPolicy}
              </span>
            </p>
          ) : null}
          <p className="mt-4 flex gap-2 text-xs leading-relaxed text-ink/75">
            <IconFile className="mt-0.5 h-4 w-4 shrink-0" />
            Curso livre introdutório. Não habilita para a prática clínica, não tem reconhecimento do MEC e não
            garante resultados.
          </p>
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section className="py-12 sm:py-16" aria-labelledby="faq-titulo">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 id="faq-titulo" className="text-2xl font-extrabold tracking-tight text-petrol-900 sm:text-3xl">
          Perguntas frequentes
        </h2>
        <div className="mt-8 divide-y divide-petrol-900/10 rounded-2xl border border-petrol-900/10 bg-white">
          {faq.map((f) => (
            <details key={f.q} className="group p-5">
              <summary className="flex min-h-8 cursor-pointer list-none items-center justify-between gap-4 text-base font-bold text-petrol-900 [&::-webkit-details-marker]:hidden">
                {f.q}
                <IconChevron className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-base leading-relaxed text-ink/90">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-petrol-900/10 bg-white py-10 pb-28 text-sm text-ink/85 sm:pb-10">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 md:grid-cols-2">
        <div>
          <p className="font-extrabold text-petrol-900">{company.name ?? product.name}</p>
          {company.cnpj ? <p>CNPJ: {company.cnpj}</p> : null}
          {company.address ? <p>{company.address}</p> : null}
          {company.email ? (
            <p>
              Contato: <a className="underline" href={`mailto:${company.email}`}>{company.email}</a>
            </p>
          ) : null}
          {company.whatsapp ? <p>WhatsApp: {company.whatsapp}</p> : null}
        </div>
        <div className="space-y-2">
          <p>
            <a className="underline" href="/termos">Termos de uso</a> ·{" "}
            <a className="underline" href="/privacidade">Política de privacidade (LGPD)</a>
          </p>
          <p className="leading-relaxed">
            <strong>Aviso educacional:</strong> conteúdo de caráter educativo e informativo, de curso livre
            introdutório. Não substitui avaliação, diagnóstico ou acompanhamento por profissionais habilitados,
            não confere habilitação profissional, não possui reconhecimento do MEC e não garante resultados.
          </p>
        </div>
      </div>
    </footer>
  );
}
