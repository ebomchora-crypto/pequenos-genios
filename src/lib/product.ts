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

/** "R$ 19,90" → { currency: "R$", whole: "19", cents: "90" } para o selo de preço. */
export const splitBRL = (value: number) => {
  const [whole, cents = "00"] = value.toFixed(2).split(".");
  return { currency: "R$", whole, cents };
};

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
} as const;

export const company = {
  name: clean(process.env.NEXT_PUBLIC_COMPANY_NAME),
  cnpj: clean(process.env.NEXT_PUBLIC_COMPANY_CNPJ),
  address: clean(process.env.NEXT_PUBLIC_COMPANY_ADDRESS),
  email: clean(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
  whatsapp: clean(process.env.NEXT_PUBLIC_CONTACT_WHATSAPP),
};

export const isReady = (key: ItemKey) => readyKeys.has(key);

export type DeliverableItem = { key: ItemKey; title: string; detail: string; ready: boolean };

const allItems: Omit<DeliverableItem, "ready">[] = [
  { key: "modules", title: "14 módulos de fundamentos", detail: "Aulas organizadas por tema, com explicação, exemplo e atividade." },
  { key: "workshops", title: "5 oficinas práticas", detail: "Atividades guiadas para levar o conteúdo para casa e para a escola." },
  { key: "handout", title: "Apostila digital em PDF", detail: "24 páginas para ler, consultar e revisar no seu ritmo." },
  { key: "printables", title: "20 fichas para imprimir", detail: "Rotina visual, quadro de escolhas, mapa de preferências e mais." },
  { key: "quiz", title: "Questionário de revisão", detail: "Para fixar os pontos principais de cada etapa." },
  {
    key: "certificate",
    title: "Certificado de participação",
    detail: "Emitido pelo responsável pelo curso após a conclusão. Não é diploma nem habilitação.",
  },
];

export const items: DeliverableItem[] = allItems.map((i) => ({ ...i, ready: readyKeys.has(i.key) }));
export const readyItems = items.filter((i) => i.ready);

/** Benefícios do hero: o de materiais impressos só aparece quando as fichas estão realmente disponíveis. */
export const heroBenefits = [
  { icon: "screen", title: "Aulas organizadas", text: "por módulos" },
  isReady("printables")
    ? { icon: "printer", title: "Materiais práticos", text: "para imprimir" }
    : { icon: "spark", title: "Exemplos práticos", text: "em cada aula" },
  { icon: "calendar", title: "Aprenda no", text: "seu ritmo" },
] as const;

/** Páginas reais dos PDFs do curso (renderizadas dos arquivos originais). */
export const materials = {
  handout: {
    title: "Apostila ABA e Autismo na Prática",
    text: "O conteúdo dos 14 módulos e das 5 oficinas reunido em 24 páginas para consultar quando precisar.",
    image: "/media/materiais/apostila-capa.jpg",
    alt: "Capa real da apostila ABA e Autismo na Prática",
  },
  printables: [
    {
      title: "Rotina visual flexível",
      text: "Organize a sequência do dia com espaço para pausas e mudanças.",
      image: "/media/materiais/ficha-rotina-visual.jpg",
      alt: "Página real da ficha Rotina visual flexível",
    },
    {
      title: "Quadro de escolhas",
      text: "Ofereça opções concretas e aceite qualquer forma de resposta.",
      image: "/media/materiais/ficha-quadro-escolhas.jpg",
      alt: "Página real da ficha Quadro de escolhas",
    },
    {
      title: "Mapa de preferências",
      text: "Registre interesses e atividades favoritas para planejar com a pessoa.",
      image: "/media/materiais/ficha-mapa-preferencias.jpg",
      alt: "Página real da ficha Mapa de preferências",
    },
    {
      title: "Checklist de autonomia",
      text: "Divida uma tarefa importante em passos, com apoios e formas de pedir ajuda.",
      image: "/media/materiais/ficha-checklist-autonomia.jpg",
      alt: "Página real da ficha Checklist de autonomia",
    },
  ],
} as const;

export const audiences = [
  { icon: "home", tone: "brand", title: "Pais e familiares", text: "Entenda os conceitos e converse com mais segurança com a escola e os profissionais." },
  { icon: "school", tone: "grape", title: "Professores", text: "Ideias para apoiar a comunicação e a participação em sala de aula." },
  { icon: "hands", tone: "teal", title: "Cuidadores", text: "Referências claras para organizar rotinas e apoiar a autonomia." },
  { icon: "sprout", tone: "sun", title: "Iniciantes", text: "Uma primeira porta de entrada, sem precisar de formação anterior." },
] as const;

export const learnTopics = [
  { icon: "book", title: "O que é ABA e seus limites", text: "O que a abordagem propõe, o que não propõe e por que não é a única forma de apoiar." },
  { icon: "spark", title: "Autismo e neurodiversidade", text: "Reconhecer diferenças sem reduzir a pessoa a um rótulo." },
  { icon: "shield", title: "Ética e assentimento", text: "Respeitar o “não”, os sinais e o ritmo da pessoa." },
  { icon: "leaf", title: "Aprendizagem naturalística", text: "Aprender no dia a dia, a partir dos interesses da pessoa." },
  { icon: "chat", title: "Comunicação acessível", text: "Fala, gestos, figuras e outras formas de se expressar." },
  { icon: "school", title: "Apoio nas atividades escolares", text: "Adaptar tarefas sem perder o objetivo da aula." },
  { icon: "calendar", title: "Rotinas visuais", text: "Deixar o dia mais previsível, com espaço para mudanças." },
  { icon: "users", title: "Participação social", text: "Favorecer a convivência sem forçar um padrão." },
  { icon: "ear", title: "Contexto sensorial", text: "Sons, luzes e texturas que afetam o conforto." },
  { icon: "target", title: "Planejamento colaborativo", text: "Metas construídas com a família, a escola e a equipe." },
] as const;

export const principles = [
  { icon: "heart", title: "Respeito ao ritmo", text: "Nada de pressa nem de cobrança constante." },
  { icon: "chat", title: "Comunicação acessível", text: "Toda forma de se comunicar vale." },
  { icon: "hands", title: "Autonomia com apoio", text: "Participar, com os apoios necessários." },
] as const;

export const faq = [
  {
    q: "Preciso de formação anterior?",
    a: "Não. O curso é uma introdução, pensado para quem está começando. A linguagem é simples e os termos técnicos são explicados.",
  },
  {
    q: "Posso estudar pelo celular?",
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

/** Mensagens de clientes que compraram em vendas diretas e autorizaram a publicação (texto fiel ao original). */
export const testimonials = [
  {
    name: "Amanda",
    tone: "grape",
    messages: [
      "Fiz a compra e gostei MUITO dos materiais enviados pra mim",
      "Tinha muito medo de comprar mas aqui deu tudo certo!!! Perfeito, não tenham medo",
    ],
  },
  {
    name: "Gabi",
    tone: "teal",
    messages: ["Amei, super indico. Confesso que eu estava com muito medo antes de comprar, mas deu tudo certo, entregou na hora!!!"],
  },
  {
    name: "Isadora",
    tone: "sun",
    messages: ["Gostei muito do conteúdo do pacote, recomendo."],
  },
] as const;

export const photoCredits = [
  { label: "Professora e aluna contando", href: "https://www.pexels.com/photo/girl-in-yellow-long-sleeve-dress-learning-to-count-with-her-teacher-8613088/" },
  { label: "Pai e filho desenhando", href: "https://www.pexels.com/photo/father-and-son-drawing-on-a-piece-of-paper-with-colored-pencils-7301123/" },
  { label: "Atividade em sala", href: "https://www.pexels.com/photo/a-woman-teaching-a-boy-in-the-classroom-8923081/" },
] as const;
