# Trassu Atelier — vitrine navegável da loja (demo)

Vitrine navegável da loja Trassu Atelier (biscoitos e porcelanas artesanais com estética afroreligiosa, Indaiatuba/SP). Fase atual: **apresentação visual para a cliente**. A loja não possui back-end: a cliente monta o pedido no navegador e finaliza a encomenda pelo WhatsApp.

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
- Rotas por hash em `src/hooks/useHashRoute.ts`: `#/`, `#/catalogo`, `#/catalogo/:categoria` (biscoitos, porcelanas, garrafas, presentes), `#/atelier`, `#/encomendas`, `#/encomendas/:secao` (passo-a-passo, pagamento, cuidados, duvidas), `#/produto/:id`. Hashes antigos (`#/sobre`, `#/cuidados`…) redirecionam
- Mobile first: a maioria do público acessa pelo celular. Barra de navegação inferior abaixo de `lg`, barra fixa de total + "Adicionar ao pedido" na página de produto, grade de 2 colunas no catálogo

## Estrutura

```
src/
  App.tsx                     estado global: rota, carrinho, toast
  types.ts                    Product, Variant, PersonalizationField, CartItem, Route
  data/
    catalog.ts                catálogo base (10 produtos, fiel ao PDF), categorias com slug/foto/texto
    fields.ts                 presets de campos de personalização, ocasiões, temas padrão, opções de entrega
    content.ts                marca, história, passos, FAQ, cuidados, entrega, galeria
  screens/
    HomeScreen.tsx            capa, categorias, destaques, teaser da história, banner arte exclusiva, CTA
    CatalogScreen.tsx         catálogo com filtro por categoria na URL
    AtelierScreen.tsx         história completa e galeria
    InfoScreen.tsx            como encomendar, pagamento e entrega, cuidados, dúvidas
    ProductScreen.tsx         página do produto com variantes, personalização, mínimo e extra
  components/
    Header, BottomNav, navigation.ts, Footer, BrandMark, ProductCard, SectionHeading, Accordion,
    layoutStyles.ts, fieldStyles.ts, CartDrawer, PersonalizationFields, QuantitySelector,
    Toast, WhatsAppFab, WatermarkOverlay
  hooks/ useCart.ts (localStorage `trassu-pedido`), useHashRoute.ts
  utils/ whatsapp.ts, format.ts, storage.ts
```

## Regras de negócio

- Não há pagamento no site. O carrinho gera uma mensagem e abre `wa.me/5511966521589`; frete, prazo e pagamento (PIX ou cartão via Infinity Pay, parcelamento a partir de 4%) são acertados no WhatsApp
- O PDF do catálogo é a fonte de verdade para produtos, preços e textos. Não inventar preços
- Valores são "estimados"; aparecem como "a partir de" quando há `priceFrom` ou variantes com preços diferentes
- "Para presentear" são os 4 kits do PDF (Modelo 1 a 4: R$ 69, 119, 129, a partir de 149), todos com caixa MDF, palha, chiffon e lapela de flores secas
- Garrafa Entre-Guias: com canudo (600 ml R$ 99, 900 ml R$ 129) ou com infusor (600 ml R$ 99, 1000 ml R$ 139)
- `minQty` e `step` por produto (Carimbadinhos: mínimo 50, de 10 em 10, extra de R$ 40 pelo carimbo exclusivo)
- Produto com `active: false` aparece como "Indisponível no momento" e a página troca o formulário por um botão de WhatsApp
- `featured` alimenta a seção "Destaques do atelier"

## Identidade visual

Vem do catálogo em PDF da loja. Lora (títulos) + DM Sans (corpo). Chumbo `#3A3C3F`/`#4E5053`, papel `#FCFBF9`, linho `#F2EDE7`, sálvia `#BDBCB1`, rosa `#E6C3C8`/`#9E6A73`, ouro `#A88453`, WhatsApp `#2F6B4F`. A capa reproduz o logo com pincelada (`mix-blend-mode: multiply`) e mantém fundo claro no modo escuro (tokens `cover`). Estilos de elemento em `index.css` ficam em `@layer base`; fora de layer eles sobrescrevem as utilities do Tailwind v4.

## Pendências

- Marca d'água "DEMONSTRAÇÃO": desligar em `SHOW_WATERMARK` (`App.tsx`) quando for para produção
- Lista de temas padrão é genérica; confirmar com o atelier
- Fotos próprias para cada kit "Para presentear" (hoje Modelos 1/2 usam `caixa.jpg` e 3/4 usam `buque.jpg`) e para a garrafa com infusor
- Nomes dos kits ("Presente Modelo 1"…) seguem o PDF; confirmar se o atelier quer nomes mais descritivos
- Sem depoimentos reais ainda (não inventar)

## Convenções

- Sem comentários no código
- Entregar arquivos completos
- Seguir os padrões existentes do repo
- Copy em pt-BR, sentence case, verbos diretos nos botões
