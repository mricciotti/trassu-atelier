# Trassu Atelier — loja + painel (demo)

Protótipo navegável da loja da Trassu Atelier (biscoitos e porcelanas artesanais com estética afroreligiosa, Indaiatuba/SP) com um painel administrativo para cadastro de produtos e preços. Fase atual: **apresentação visual para a cliente**. Ainda não há back-end: o painel salva no localStorage do navegador.

Inspirado na estrutura do projeto FutSports (screens + components + data + utils, admin com overrides em localStorage, marca d'água de demonstração), reescrito com React + TypeScript + Tailwind.

## Rodar

```
npm install
npm run dev          http://localhost:5173
npm run build        dist/ (assets separados)
npm run build:demo   dist-demo/index.html (arquivo único com imagens embutidas, para compartilhar)
```

## Stack

- Vite 5 + React 18 + TypeScript (strict)
- Tailwind v4 via `@tailwindcss/vite`; tokens em `src/index.css` (`:root` + `@theme inline`), com modo escuro
- lucide-react para ícones
- vite-plugin-singlefile só no modo `demo`
- Rotas por hash (`#/`, `#/catalogo`, `#/produto/:id`, `#/admin`) em `src/hooks/useHashRoute.ts`

## Estrutura

```
src/
  App.tsx                     estado global: rota, carrinho, estado do admin, toast
  types.ts                    Product, Variant, PersonalizationField, CartItem, AdminState, Route
  data/
    catalog.ts                catálogo base (9 produtos) com fotos importadas
    fields.ts                 presets de campos de personalização, ocasiões, temas padrão, opções de entrega
    content.ts                marca, textos institucionais, FAQ, cuidados, galeria
  screens/
    HomeScreen.tsx            capa, destaques, catálogo, como funciona, sobre, galeria, cuidados, FAQ
    ProductScreen.tsx         página do produto com variantes, personalização, mínimo e extra
    AdminScreen.tsx           painel: lista de produtos, editor, temas
  components/
    Header, Footer, BrandMark, ProductCard, CatalogSection, CartDrawer,
    PersonalizationFields, QuantitySelector, Toast, WhatsAppFab, WatermarkOverlay
    admin/ AdminProductRow, ProductEditor, ThemesPanel, Toggle
  hooks/ useCart.ts (localStorage `trassu-pedido`), useHashRoute.ts
  utils/ adminCatalog.ts, whatsapp.ts, format.ts, image.ts, storage.ts
```

## Regras de negócio

- Não há pagamento no site. O carrinho gera uma mensagem e abre `wa.me/5511966521589`; frete, prazo e pagamento (PIX ou cartão via Infinity Pay, parcelamento a partir de 6%) são acertados no WhatsApp
- Valores são "estimados"; variantes com `priceFrom` aparecem como "a partir de"
- `minQty` e `step` por produto (Carimbadinhos: mínimo 50, de 10 em 10, extra de R$ 40 pelo carimbo exclusivo)
- Produto com `active: false` aparece como "Indisponível no momento" e a página troca o formulário por um botão de WhatsApp
- `featured` alimenta a seção "Destaques do atelier"

## Painel admin (localStorage `trassu-admin`)

`AdminState = {overrides, custom, themes}`:
- `overrides[id]`: só os campos alterados de um produto do catálogo base (diff calculado em `App.tsx`)
- `custom`: produtos cadastrados no painel, com foto comprimida em data URL (`utils/image.ts`, máx. 900px JPEG)
- `themes`: lista de orixás/entidades; `null` = lista padrão
- `applyAdminState` monta o catálogo final; "Restaurar catálogo original" zera tudo

Funcionalidades: editar preço por variante e pedido mínimo inline (salva no blur), ligar/desligar disponível e destaque, editor completo (foto, informações, opções e preços, campos de personalização com obrigatório, avisos), excluir produto cadastrado, gerenciar temas.

## Identidade visual

Vem do catálogo em PDF da loja. Lora (títulos) + DM Sans (corpo). Chumbo `#3A3C3F`/`#4E5053`, papel `#FCFBF9`, linho `#F2EDE7`, sálvia `#BDBCB1`, rosa `#E6C3C8`/`#9E6A73`, ouro `#A88453`, WhatsApp `#2F6B4F`. A capa reproduz o logo com pincelada (`mix-blend-mode: multiply`) e mantém fundo claro no modo escuro (tokens `cover`).

## Pendências

- Marca d'água "DEMONSTRAÇÃO": desligar em `SHOW_WATERMARK` (`App.tsx`) quando for para produção
- Lista de temas padrão é genérica; confirmar com o atelier
- Adesivo e Mini buquê usam a mesma foto
- Sem depoimentos reais ainda (não inventar)
- Painel sem login e sem persistência real: próximo passo é back-end (ver abaixo)

## Próxima fase (back-end, ainda não decidido)

Proposta discutida: migrar para Next.js App Router com Postgres (Supabase ou Neon) + Drizzle, Supabase Auth com allowlist de e-mails, Supabase Storage para fotos, server actions com Zod e `revalidateTag`, preços em centavos, produtos arquivados em vez de deletados, tabela opcional de pedidos antes do redirecionamento ao WhatsApp. Os tipos em `types.ts` e o `AdminState` já espelham esse modelo.

## Convenções

- Sem comentários no código
- Entregar arquivos completos
- Seguir os padrões existentes do repo
- Copy em pt-BR, sentence case, verbos diretos nos botões
