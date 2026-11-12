export type ItemKey =
  | "modules"
  | "workshops"
  | "handout"
  | "printables"
  | "quiz"
  | "certificate";

const clean = (v?: string) => (v && v.trim() !== "" ? v.trim() : undefined);

const readyKeys = new Set(
  (process.env.NEXT_PUBLIC_READY_ITEMS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
);

const toNumber = (v?: string) => {
  const n = Number((v ?? "").replace(",", "."));
  return Number.isFinite(n) && n > 0 ? n : undefined;
};

export const formatBRL = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

const price = toNumber(process.env.NEXT_PUBLIC_PRICE) ?? 19.9;
const referencePrice = toNumber(process.env.NEXT_PUBLIC_REFERENCE_PRICE);

export const product = {
  id: "aba-autismo-na-pratica",
  name: "ABA e Autismo na Prática",
  subtitle: "Fundamentos, ética, comunicação e apoio educacional respeitoso.",
  siteUrl:
    clean(process.env.NEXT_PUBLIC_SITE_URL) ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000"),
  checkoutUrl: clean(process.env.NEXT_PUBLIC_CHECKOUT_URL),
  price,
  priceLabel: clean(process.env.NEXT_PUBLIC_PRICE_LABEL),
  referencePrice: referencePrice && referencePrice > price ? referencePrice : undefined,
  refundPolicy: clean(process.env.NEXT_PUBLIC_REFUND_POLICY),
  availabilityText: clean(process.env.NEXT_PUBLIC_AVAILABILITY_TEXT),
  hero: clean(process.env.NEXT_PUBLIC_HERO_IMAGE)
    ? {
        src: process.env.NEXT_PUBLIC_HERO_IMAGE as string,
        alt: clean(process.env.NEXT_PUBLIC_HERO_IMAGE_ALT) ?? "Material do curso ABA e Autismo na Prática",
      }
    : undefined,
} as const;

export const company = {
  name: clean(process.env.NEXT_PUBLIC_COMPANY_NAME),
  cnpj: clean(process.env.NEXT_PUBLIC_COMPANY_CNPJ),
  address: clean(process.env.NEXT_PUBLIC_COMPANY_ADDRESS),
  email: clean(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
  whatsapp: clean(process.env.NEXT_PUBLIC_CONTACT_WHATSAPP),
};

export type DeliverableItem = { key: ItemKey; title: string; detail: string; ready: boolean };

const allItems: Omit<DeliverableItem, "ready">[] = [
  { key: "modules", title: "14 módulos de fundamentos", detail: "Aulas em vídeo organizadas por tema." },
  { key: "workshops", title: "5 oficinas práticas", detail: "Aplicações do conteúdo em situações do dia a dia." },
  { key: "handout", title: "Apostila digital em PDF", detail: "Para ler, consultar e revisar no seu ritmo." },
  { key: "printables", title: "20 materiais para imprimir", detail: "Fichas e apoios visuais prontos para uso." },
  { key: "quiz", title: "Questionário de revisão", detail: "Para fixar os pontos principais de cada etapa." },
  {
    key: "certificate",
    title: "Certificado de participação",
    detail: "Emitido pelo responsável pelo curso após a conclusão. Não é diploma nem habilitação.",
  },
];

export const items: DeliverableItem[] = allItems.map((i) => ({ ...i, ready: readyKeys.has(i.key) }));
export const readyItems = items.filter((i) => i.ready);
export const isReady = (key: ItemKey) => readyKeys.has(key);

/**
 * Imagens REAIS de páginas da apostila e das fichas. Coloque os arquivos em /public/media
 * e liste aqui. Enquanto estiver vazio, a seção de mostruário não é exibida.
 */
export type ShowcaseImage = { src: string; alt: string; caption: string; width: number; height: number };
export const showcaseImages: ShowcaseImage[] = [];

export const audiences = [
  { title: "Pais e familiares", text: "Para entender os conceitos e dialogar melhor com escola e profissionais." },
  { title: "Professores", text: "Ideias de apoio à comunicação e à participação em sala de aula." },
  { title: "Cuidadores", text: "Referências claras para organizar rotinas e apoiar a autonomia." },
  { title: "Iniciantes", text: "Uma porta de entrada, sem exigir formação anterior." },
] as const;

export const learnTopics = [
  { title: "O que é ABA e seus limites", text: "O que a abordagem propõe, o que não propõe e por que ela não é a única forma de apoiar." },
  { title: "Autismo e neurodiversidade", text: "Um olhar que reconhece diferenças sem reduzir a pessoa a um rótulo." },
  { title: "Ética e assentimento", text: "Respeitar o “não”, os sinais e o ritmo da pessoa em cada atividade." },
  { title: "Aprendizagem naturalística", text: "Aprender em situações do dia a dia, a partir dos interesses da pessoa." },
  { title: "Comunicação acessível", text: "Formas diversas de se comunicar e como torná-las possíveis em casa e na escola." },
  { title: "Apoio em atividades escolares", text: "Adaptar tarefas e ambientes com planejamento e diálogo com a equipe." },
  { title: "Rotinas visuais", text: "Quadros e sequências visuais para tornar o dia mais previsível." },
  { title: "Participação social", text: "Favorecer convivência e escolha, sem forçar um padrão de comportamento." },
  { title: "Contexto sensorial", text: "Observar sons, luzes e texturas que influenciam conforto e participação." },
  { title: "Planejamento colaborativo", text: "Construir metas junto com a família, a escola e os profissionais envolvidos." },
] as const;

export const faq = [
  {
    q: "Preciso de formação anterior?",
    a: "Não. O curso é uma introdução, pensado para quem está começando, sem exigir formação prévia.",
  },
  {
    q: "Posso assistir pelo celular?",
    a: "Sim. O acesso é online e pode ser feito pelo celular, tablet ou computador.",
  },
  {
    q: "O curso habilita para atuar clinicamente?",
    a: "Não. É um curso livre introdutório. Ele não equivale a graduação, especialização ou habilitação profissional e não autoriza a oferecer terapia ou atendimento clínico.",
  },
  {
    q: "O certificado é reconhecido pelo MEC?",
    a: "Não. O certificado, quando disponível, é de participação em curso livre e não tem reconhecimento do MEC nem validade regulatória profissional.",
  },
  {
    q: "Como recebo acesso?",
    a: "Depois da confirmação do pagamento, você recebe as instruções de acesso no e-mail informado na compra.",
  },
  {
    q: "Quando as aulas estarão disponíveis?",
    a:
      product.availabilityText ??
      "A página lista apenas o que já está disponível no momento da compra. Se algum conteúdo ainda estiver em preparação, ele não aparece como incluído.",
  },
] as const;
