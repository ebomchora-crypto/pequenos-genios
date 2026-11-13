import Image from "next/image";
import { CtaLink } from "./CtaLink";
import { ColorStripe } from "./Header";
import { CookiePreferencesButton } from "./ConsentBanner";
import { Icon, PriceSeal, Sparkle, type IconName } from "./icons";
import {
  audiences,
  company,
  faq,
  formatBRL,
  isReady,
  learnTopics,
  materials,
  photoCredits,
  principles,
  product,
  readyItems,
  splitBRL,
  testimonials,
} from "@/lib/product";
import familyPhoto from "../../public/media/fotos/familia-desenhando.jpg";
import schoolPhoto from "../../public/media/fotos/escola-atividade.jpg";

const toneClasses = {
  brand: { tile: "bg-brand text-white", card: "bg-brand-50", title: "text-brand-dark" },
  grape: { tile: "bg-grape text-white", card: "bg-grape-50", title: "text-grape-dark" },
  teal: { tile: "bg-teal text-white", card: "bg-teal-50", title: "text-teal-dark" },
  sun: { tile: "bg-sun text-ink", card: "bg-sun-50", title: "text-ink" },
} as const;
const cycle = ["brand", "grape", "teal", "sun"] as const;

function SectionTitle({ eyebrow, title, intro, center = false, light = false }: { eyebrow: string; title: React.ReactNode; intro?: string; center?: boolean; light?: boolean }) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <p className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.14em] ${light ? "bg-white/15 text-white" : "bg-brand-50 text-brand"}`}>
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-sun" />
        {eyebrow}
      </p>
      <h2 className={`mt-3 text-[1.7rem] font-black leading-tight tracking-tight sm:text-4xl ${light ? "text-white" : "text-brand-dark"}`}>{title}</h2>
      {intro ? <p className={`mt-3 text-base leading-relaxed sm:text-lg ${light ? "text-white/85" : "text-muted"}`}>{intro}</p> : null}
    </div>
  );
}

export function ForWhom() {
  return (
    <section className="py-14 sm:py-20" aria-labelledby="para-quem-titulo">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div id="para-quem-titulo">
          <SectionTitle
            eyebrow="Para quem é"
            center
            title="Feito para quem convive, ensina e cuida"
            intro="Um curso introdutório de estudo e orientação. Não é treinamento para atendimento clínico."
          />
        </div>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {audiences.map((a) => {
            const t = toneClasses[a.tone];
            return (
              <li key={a.title} className={`flex gap-4 rounded-3xl p-5 sm:flex-col sm:p-6 ${t.card}`}>
                <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl shadow-sm ${t.tile}`}>
                  <Icon name={a.icon as IconName} className="h-6 w-6" />
                </span>
                <div>
                  <h3 className={`text-lg font-black ${t.title}`}>{a.title}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-muted">{a.text}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function RealLife() {
  return (
    <section className="overflow-hidden bg-cloud py-14 sm:py-20" aria-labelledby="vida-real-titulo">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <div className="relative mx-auto w-full max-w-md pb-14 pl-10 lg:max-w-none">
          <div className="relative overflow-hidden rounded-[2rem] border-4 border-white shadow-soft">
            <Image
              src={familyPhoto}
              alt="Pai e filho desenhando juntos no chão da sala com lápis coloridos"
              placeholder="blur"
              sizes="(min-width: 1024px) 40vw, 85vw"
              className="aspect-[4/3] h-auto w-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 left-0 w-[40%] -rotate-2 overflow-hidden rounded-3xl border-4 border-white shadow-soft">
            <Image
              src={schoolPhoto}
              alt="Professora e aluno fazendo uma atividade de desenho na escola"
              placeholder="blur"
              sizes="(min-width: 1024px) 18vw, 40vw"
              className="aspect-[3/4] h-auto w-full object-cover"
            />
          </div>
          <Sparkle className="absolute -right-2 -top-6 h-10 w-10 rotate-12 text-sun" />
        </div>

        <div>
          <div id="vida-real-titulo">
            <SectionTitle
              eyebrow="Em casa e na escola"
              title={
                <>
                  Conteúdo pensado para a <span className="text-grape">vida real</span>
                </>
              }
              intro="Cada aula traz uma explicação curta, um exemplo do dia a dia e uma atividade simples para você aplicar no seu contexto, com respeito à pessoa."
            />
          </div>
          <ul className="mt-7 grid gap-3">
            {principles.map((p, i) => {
              const t = toneClasses[cycle[i]];
              return (
                <li key={p.title} className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-card">
                  <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${t.tile}`}>
                    <Icon name={p.icon as IconName} className="h-5 w-5" />
                  </span>
                  <p className="text-[15px] leading-snug text-muted">
                    <strong className="block text-base font-black text-ink">{p.title}</strong>
                    {p.text}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Learn() {
  return (
    <section id="curso" className="py-14 sm:py-20" aria-labelledby="aprender-titulo">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div id="aprender-titulo">
          <SectionTitle
            eyebrow="O que você vai aprender"
            center
            title="10 temas explicados de um jeito simples"
            intro="Do básico sobre ABA até o planejamento com a escola e a família, sempre com limites claros e respeito."
          />
        </div>
        <ol className="mt-10 grid gap-3 md:grid-cols-2 md:gap-4">
          {learnTopics.map((t, i) => {
            const tone = toneClasses[cycle[i % 4]];
            return (
              <li key={t.title} className="group relative flex items-center gap-4 rounded-3xl border border-brand/10 bg-white p-4 shadow-card transition hover:-translate-y-0.5 sm:p-5">
                <span className={`relative grid h-14 w-14 shrink-0 place-items-center rounded-2xl ${tone.card}`}>
                  <Icon name={t.icon as IconName} className={`h-7 w-7 ${tone.title}`} />
                  <span className={`absolute -right-1.5 -top-1.5 grid h-6 w-6 place-items-center rounded-full text-[11px] font-black ${tone.tile}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </span>
                <div>
                  <h3 className="text-[17px] font-black leading-snug text-ink">{t.title}</h3>
                  <p className="mt-0.5 text-[15px] leading-snug text-muted">{t.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

export function Included() {
  return (
    <section className="dot-grid relative bg-brand py-14 text-white sm:py-20" aria-labelledby="incluido-titulo">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div id="incluido-titulo">
          <SectionTitle eyebrow="Tudo organizado" light title="O que você recebe" />
        </div>
        {readyItems.length > 0 ? (
          <ul className={`mt-9 grid gap-3 sm:grid-cols-2 ${readyItems.length >= 3 ? "lg:grid-cols-3" : "max-w-4xl"}`}>
            {readyItems.map((item) => (
              <li key={item.key} className="flex gap-3 rounded-3xl bg-white p-5 text-ink shadow-soft">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-go text-white">
                  <Icon name="check" className="h-5 w-5" strokeWidth={3} />
                </span>
                <div>
                  <h3 className="text-lg font-black text-brand-dark">{item.title}</h3>
                  <p className="mt-0.5 text-[15px] leading-relaxed text-muted">{item.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-7 max-w-xl rounded-3xl bg-white/10 p-5 text-base leading-relaxed text-white/90">
            O conteúdo está em preparação. Os itens incluídos aparecem aqui assim que estiverem disponíveis para os alunos.
          </p>
        )}
      </div>
    </section>
  );
}

function Mockup({ src, alt, tilt, back }: { src: string; alt: string; tilt: string; back: string }) {
  return (
    <div className="relative mx-auto w-full max-w-[15rem]">
      <div aria-hidden className={`absolute inset-0 translate-x-2 translate-y-2 rotate-[4deg] rounded-xl ${back}`} />
      <div className={`relative overflow-hidden rounded-xl border border-ink/10 bg-white shadow-[0_18px_36px_-16px_rgba(20,33,61,0.45)] ${tilt}`}>
        <Image src={src} alt={alt} width={745} height={1053} loading="lazy" sizes="(min-width: 1024px) 15rem, 45vw" className="h-auto w-full" />
      </div>
    </div>
  );
}

export function Materials() {
  const showHandout = isReady("handout");
  const showPrintables = isReady("printables");
  if (!showHandout && !showPrintables) return null;
  const backs = ["bg-teal", "bg-grape", "bg-sun", "bg-brand"];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-grape-50 to-white py-14 sm:py-20" aria-labelledby="materiais-titulo">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div id="materiais-titulo">
          <SectionTitle
            eyebrow="Material complementar"
            center
            title={
              <>
                Materiais extras para <span className="text-grape">facilitar seu aprendizado</span>
              </>
            }
            intro="Páginas reais dos materiais do curso. Imprima, adapte e use no seu dia a dia."
          />
        </div>

        {showHandout ? (
          <div className="mt-12 grid items-center gap-8 rounded-[2rem] bg-white p-6 shadow-card sm:p-10 md:grid-cols-[0.8fr_1.2fr]">
            <Mockup src={materials.handout.image} alt={materials.handout.alt} tilt="-rotate-3" back="bg-teal" />
            <div>
              <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-black uppercase tracking-wider text-teal-dark">Apostila digital · PDF</span>
              <h3 className="mt-3 text-2xl font-black leading-tight text-brand-dark sm:text-3xl">{materials.handout.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-muted sm:text-lg">{materials.handout.text}</p>
            </div>
          </div>
        ) : null}

        {showPrintables ? (
          <div className="mt-10">
            <h3 className="text-center text-xl font-black text-ink sm:text-2xl">
              Kit com <span className="text-grape">20 fichas para imprimir</span>. Alguns destaques:
            </h3>
            <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-9 lg:grid-cols-4 lg:gap-x-6">
              {materials.printables.map((m, i) => (
                <li key={m.title} className="flex flex-col">
                  <Mockup src={m.image} alt={m.alt} tilt={i % 2 ? "rotate-2" : "-rotate-2"} back={backs[i]} />
                  <span className="mt-5 self-start whitespace-nowrap rounded-full bg-grape-50 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-grape sm:px-2.5 sm:text-[11px]">
                    Material complementar
                  </span>
                  <h4 className="mt-2 text-base font-black leading-snug text-ink sm:text-lg">{m.title}</h4>
                  <p className="mt-1 text-sm leading-snug text-muted">{m.text}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="py-14 sm:py-20" aria-labelledby="depoimentos-titulo">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div id="depoimentos-titulo">
          <SectionTitle
            eyebrow="Depoimentos"
            center
            title="O que clientes disseram"
            intro="Mensagens de clientes que compraram em vendas diretas e autorizaram a publicação."
          />
        </div>
        <ul className="mt-9 grid gap-4 md:grid-cols-3">
          {testimonials.map((t) => {
            const tone = toneClasses[t.tone];
            return (
              <li key={t.name} className="rounded-3xl bg-brand-dark p-5 shadow-card sm:p-6">
                <div className="flex items-center gap-3">
                  <span aria-hidden className={`grid h-11 w-11 place-items-center rounded-full text-lg font-black ${tone.tile}`}>
                    {t.name[0]}
                  </span>
                  <p className="text-base font-extrabold text-white">
                    {t.name} <span className="font-semibold text-white/70">· cliente</span>
                  </p>
                </div>
                <div className="mt-4 space-y-2">
                  {t.messages.map((m) => (
                    <p key={m} className="rounded-2xl rounded-tl-md bg-white/15 px-4 py-3 text-[17px] leading-snug text-white">
                      {m}
                    </p>
                  ))}
                </div>
              </li>
            );
          })}
        </ul>
        <p className="mx-auto mt-6 max-w-xl text-center text-xs leading-relaxed text-muted">
          Experiências individuais, que não representam garantia de resultado. Este é um curso livre introdutório.
        </p>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const steps = [
    { icon: "cart", title: "Faça sua inscrição", text: "Pagamento em ambiente seguro." },
    { icon: "mail", title: "Receba o acesso", text: "As instruções chegam no e-mail informado na compra." },
    { icon: "screen", title: "Estude no seu ritmo", text: "Pelo celular, tablet ou computador." },
    ...(isReady("quiz") ? [{ icon: "check", title: "Revise o conteúdo", text: "Responda ao questionário de revisão." }] : []),
    ...(isReady("certificate") ? [{ icon: "file", title: "Certificado de participação", text: "Emitido pelo responsável pelo curso." }] : []),
  ] as const;
  return (
    <section className="py-14 sm:py-20" aria-labelledby="como-funciona-titulo">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div id="como-funciona-titulo">
          <SectionTitle eyebrow="Simples assim" center title="Como funciona" />
        </div>
        <ol className={`relative mt-10 grid gap-4 ${steps.length > 3 ? "md:grid-cols-4" : "md:grid-cols-3"}`}>
          {steps.map((s, i) => {
            const t = toneClasses[cycle[i % 4]];
            return (
              <li key={s.title} className="relative flex items-start gap-4 rounded-3xl border border-brand/10 bg-white p-5 shadow-card md:flex-col">
                <span className={`relative grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${t.tile}`}>
                  <Icon name={s.icon as IconName} className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-xs font-black uppercase tracking-wider text-muted">Passo {i + 1}</p>
                  <h3 className="text-lg font-black text-ink">{s.title}</h3>
                  <p className="mt-0.5 text-[15px] leading-snug text-muted">{s.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

export function Offer() {
  const p = splitBRL(product.price);
  return (
    <section id="oferta" className="relative overflow-hidden bg-brand-50 py-14 sm:py-20" aria-labelledby="oferta-titulo">
      <div aria-hidden className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-teal/15 blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-grape/15 blur-2xl" />
      <div className="relative mx-auto max-w-xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-[2rem] bg-white shadow-soft ring-1 ring-brand/10">
          <ColorStripe />
          <div className="p-6 pt-8 sm:p-10">
            <p className="text-center text-xs font-black uppercase tracking-[0.18em] text-teal-dark">Inscrição</p>
            <h2 id="oferta-titulo" className="mt-1 text-center text-[1.6rem] font-black uppercase leading-tight text-brand-dark sm:text-3xl">
              ABA e Autismo na Prática
            </h2>

            <PriceSeal className="relative mx-auto mt-6 h-44 w-44 sm:h-48 sm:w-48">
              {product.priceLabel ? <span className="mb-1 block text-xs font-extrabold">{product.priceLabel}</span> : null}
              {product.referencePrice ? <s className="block text-sm opacity-80">{formatBRL(product.referencePrice)}</s> : null}
              <span className="block text-sm font-extrabold">Por apenas</span>
              <span className="mt-1 flex items-start justify-center font-black leading-none">
                <span className="mt-1.5 text-xl">{p.currency}</span>
                <span className="text-6xl text-sun">{p.whole}</span>
                <span className="mt-1.5 text-2xl text-sun">,{p.cents}</span>
              </span>
            </PriceSeal>

            {readyItems.length > 0 ? (
              <ul className="mt-7 space-y-2.5">
                {readyItems.map((i) => (
                  <li key={i.key} className="flex items-start gap-3 text-base font-semibold text-ink">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-go text-white">
                      <Icon name="check" className="h-3.5 w-3.5" strokeWidth={3.2} />
                    </span>
                    {i.title}
                  </li>
                ))}
                <li className="flex items-start gap-3 text-base font-semibold text-ink">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-go text-white">
                    <Icon name="check" className="h-3.5 w-3.5" strokeWidth={3.2} />
                  </span>
                  Acesso online, no seu ritmo
                </li>
              </ul>
            ) : (
              <p className="mt-7 text-center text-base text-muted">Os itens incluídos serão listados aqui quando estiverem disponíveis.</p>
            )}

            <CtaLink kind="checkout" location="offer" arrow className="mt-8 w-full">
              Quero me inscrever
            </CtaLink>

            {product.refundPolicy ? (
              <p className="mt-5 flex gap-2.5 rounded-2xl bg-teal-50 p-3.5 text-sm leading-relaxed text-ink">
                <Icon name="shield" className="mt-0.5 h-5 w-5 shrink-0 text-teal-dark" />
                <span>{product.refundPolicy}</span>
              </p>
            ) : null}
            <p className="mt-4 flex gap-2 text-xs leading-relaxed text-muted">
              <Icon name="info" className="mt-0.5 h-4 w-4 shrink-0" />
              Curso livre e introdutório. Não substitui acompanhamento profissional, não habilita para a prática
              clínica, não tem reconhecimento do MEC e não garante resultados.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section className="py-14 sm:py-20" aria-labelledby="faq-titulo">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div id="faq-titulo">
          <SectionTitle eyebrow="Dúvidas" center title="Perguntas frequentes" />
        </div>
        <div className="mt-9 space-y-3">
          {faq.map((f) => (
            <details key={f.q} className="group rounded-2xl border border-brand/10 bg-white shadow-card open:ring-2 open:ring-brand/15">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-base font-black text-ink [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-50 text-brand transition group-open:rotate-180 group-open:bg-brand group-open:text-white">
                  <Icon name="chevron" className="h-4 w-4" strokeWidth={2.6} />
                </span>
              </summary>
              <p className="px-5 pb-5 text-[15px] leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-brand-dark pb-28 pt-12 text-sm text-white/80 md:pb-12">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 md:grid-cols-[1fr_1.4fr]">
        <div className="space-y-1">
          <p className="text-lg font-black text-white">{company.name ?? product.name}</p>
          {company.cnpj ? <p>CNPJ: {company.cnpj}</p> : null}
          {company.address ? <p>{company.address}</p> : null}
          {company.email ? (
            <p>
              Contato: <a className="underline" href={`mailto:${company.email}`}>{company.email}</a>
            </p>
          ) : null}
          {company.whatsapp ? <p>WhatsApp: {company.whatsapp}</p> : null}
          <p className="pt-2">
            <a className="font-bold text-white underline" href="/termos">Termos de uso</a>
            <span aria-hidden> · </span>
            <a className="font-bold text-white underline" href="/privacidade">Política de privacidade (LGPD)</a>
            <span aria-hidden> · </span>
            <CookiePreferencesButton />
          </p>
        </div>
        <div className="space-y-3">
          <p className="leading-relaxed">
            <strong className="text-white">Aviso educacional:</strong> conteúdo educativo e informativo de curso livre
            introdutório. Não substitui avaliação, diagnóstico ou acompanhamento por profissionais habilitados, não
            confere habilitação profissional, não tem reconhecimento do MEC e não garante resultados.
          </p>
          <p className="text-xs text-white/60">
            Fotos ilustrativas do Pexels:{" "}
            {photoCredits.map((c, i) => (
              <span key={c.href}>
                <a className="underline" href={c.href} rel="noopener noreferrer" target="_blank">{c.label}</a>
                {i < photoCredits.length - 1 ? ", " : "."}
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
