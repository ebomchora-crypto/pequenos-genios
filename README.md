# ABA e Autismo na Prática — landing page

Next.js (App Router) + TypeScript + Tailwind v4. Sem dependências além de `next`, `react` e `react-dom`.

## Setup

```bash
npm install
cp .env.example .env.local   # preencha os valores
npm run dev                  # http://localhost:3000
npm run build && npm start   # produção
```

## O que fazer antes de publicar

### 1. URL do checkout
Defina `NEXT_PUBLIC_CHECKOUT_URL` com a URL do checkout **já existente**. Sem ela, o botão "Quero me inscrever" aparece desativado ("Inscrições ainda não abertas"). Configure no checkout a página de retorno `https://SEU-DOMINIO/confirmacao?pedido={ID_DO_PEDIDO}` (use a variável de ID de pedido do seu gateway).

### 2. Só o que existe aparece
`NEXT_PUBLIC_READY_ITEMS` lista o que já está disponível: `modules,workshops,handout,printables,quiz,certificate`.
Itens fora da lista não aparecem em "O que está incluído", na oferta nem em "Como funciona" (os passos de questionário e certificado só entram se o item estiver pronto). Vazio = a página mostra "conteúdo em preparação".

### 3. Preço e campanha
`NEXT_PUBLIC_PRICE` (19.90 ou 9.90). `NEXT_PUBLIC_REFERENCE_PRICE` só se o preço anterior foi realmente praticado; vazio = não exibe riscado. `NEXT_PUBLIC_PRICE_LABEL` (ex.: "Preço de lançamento") é opcional. Não há contagem regressiva nem escassez.

### 4. Reembolso e dados da empresa
`NEXT_PUBLIC_REFUND_POLICY` (texto real) — vazio = bloco oculto. `NEXT_PUBLIC_COMPANY_*` e `NEXT_PUBLIC_CONTACT_*` alimentam rodapé, termos e privacidade. **Revise `/termos` e `/privacidade` com assessoria jurídica.**

### 5. Materiais reais
- Fotos: `public/media/fotos/` (Pexels, licença gratuita; créditos com link no rodapé, em `photoCredits` de `src/lib/product.ts`).
- Seção "Materiais extras": usa páginas reais renderizadas dos PDFs do curso (`public/media/materiais/`), definidas em `materials` de `src/lib/product.ts`. A apostila só aparece com `handout` em `NEXT_PUBLIC_READY_ITEMS`, e as fichas só com `printables`. Inclua esses itens **somente depois** de subir os PDFs para as aulas na Kiwify. Com `printables`, o benefício "Materiais práticos para imprimir" também passa a aparecer no hero.

### 6. Analytics (opcional, só após consentimento)
`NEXT_PUBLIC_GA4_ID` e `NEXT_PUBLIC_META_PIXEL_ID`. O banner de consentimento só aparece se algum ID existir. Eventos (`src/lib/analytics.ts`): `view_item` (ao carregar), `select_content` (CTAs de rolagem), `begin_checkout` (clique no checkout) e `purchase` — **somente** em `/confirmacao`, depois de o servidor confirmar o pedido via webhook, uma vez por pedido/navegador.

## Webhook e pop-up de inscrições reais

`POST /api/webhooks/checkout` — configure no checkout/gateway:

| Item | Valor |
|---|---|
| Header `x-webhook-timestamp` | epoch em segundos (tolerância de 5 min) |
| Header `x-webhook-signature` | `sha256=` + HMAC-SHA256 hex de `"{timestamp}.{corpo bruto}"` com `CHECKOUT_WEBHOOK_SECRET` |
| Corpo JSON | `{"event":"order.paid","order_id":"...","paid_at":"ISO-8601","amount":19.9}` |

Se o seu gateway usa outro esquema de assinatura/payload, adapte `src/app/api/webhooks/checkout/route.ts` (mantendo verificação de assinatura obrigatória).

Comportamento: assinatura inválida/ausente = 401; sem segredo configurado = 503; deduplica por pedido; guarda apenas hash do ID, horário e valor (sem nome, e-mail, telefone ou pagamento); máx. 500 registros, TTL 7 dias.
`GET /api/recent-purchases` devolve até 3 eventos das últimas 2 h (`{"events":[]}` quando não há). O componente consulta a cada 60 s, mostra "Nova inscrição confirmada há N min" por 9 s, uma vez por evento/sessão, e não renderiza nada se a lista vier vazia ou a chamada falhar.

**Importante:** o armazenamento (`src/lib/purchases.ts`) é em memória, adequado a um único processo. Em hospedagem serverless/multi-instância (ex.: Vercel), troque por Redis/Upstash/banco mantendo as mesmas funções; caso contrário os eventos podem não ser compartilhados entre instâncias. Considere também rate limit no webhook na borda.

## Estrutura
```
src/app/            layout, page, confirmacao, termos, privacidade, api/*, robots, sitemap, OG image
src/components/     Header, Hero, Sections (seções + footer), CtaLink, StickyCta, RecentPurchaseToast, ...
src/lib/            product.ts (dados centralizados), analytics, consent, purchases
```

## Checklist de QA mobile (360 px primeiro, depois 768 e 1440)
- [ ] Sem rolagem horizontal em 360, 390, 412, 768 e 1440 px
- [ ] Hero legível em 5 segundos: o que aprende, para quem é, preço, CTA visível sem rolar muito
- [ ] Header: logo e "Ver o curso" em uma linha; alvos de toque ≥ 44 px
- [ ] CTA fixo inferior só aparece após passar o CTA do hero e some ao chegar na oferta; não cobre conteúdo nem rodapé
- [ ] Botão de checkout abre a URL correta; sem URL, aparece desativado
- [ ] Preço correto (19,90 / 9,90); preço riscado só se `NEXT_PUBLIC_REFERENCE_PRICE` for real
- [ ] Só itens realmente prontos aparecem (incluído, oferta, como funciona)
- [ ] FAQ abre/fecha por toque e teclado; textos sobre habilitação e MEC corretos
- [ ] Banner de consentimento aparece (se houver IDs), Recusar não carrega scripts (aba Rede)
- [ ] Pop-up de inscrição: ausente sem eventos reais; com evento real, texto sem dados pessoais e botão de fechar funciona
- [ ] `/confirmacao?pedido=INVALIDO` não dispara `purchase`; pedido real dispara uma vez
- [ ] Contraste AA, foco visível, navegação por teclado, `prefers-reduced-motion` respeitado
- [ ] Lighthouse mobile (Performance/Acessibilidade/SEO ≥ 90) e Core Web Vitals (LCP < 2,5 s, CLS < 0,1)
- [ ] Rodapé com CNPJ, endereço e contato reais; termos e privacidade revisados juridicamente
- [ ] Testar em iOS Safari e Chrome Android; imagens reais com `alt` descritivo
