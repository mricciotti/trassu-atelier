import {ProductCard} from '../components/ProductCard';
import {wrap} from '../components/layoutStyles';
import {categories, categoryDetails, categoryFromSlug} from '../data/catalog';
import type {Product, Route} from '../types';
import {whatsappUrl} from '../utils/whatsapp';

interface Props {
  products: Product[];
  category?: string;
  onNavigate: (route: Route) => void;
}

export function CatalogScreen({products, category: slug, onNavigate}: Props) {
  const category = categoryFromSlug(slug);
  const visible = products
    .filter(product => !category || product.category === category)
    .sort((a, b) => Number(b.active) - Number(a.active));
  const options = [{label: 'Todos', slug: undefined}, ...categories.map(item => ({label: item, slug: categoryDetails[item].slug}))];

  return (
    <main className="pb-16 md:pb-24">
      <div className={`${wrap} pt-7 md:pt-12`}>
        <h1 className="text-[clamp(1.8rem,3.6vw,2.6rem)] leading-tight">{category ?? 'Catálogo'}</h1>
        <p className="mt-2 max-w-[56ch] text-[1.02rem] text-muted">
          {category
            ? categoryDetails[category].text
            : 'Escolha, personalize e monte seu pedido. Frete, prazo e pagamento são combinados no WhatsApp.'}
        </p>
      </div>

      <div className="sticky top-[calc(env(safe-area-inset-top,0px)+60px)] z-30 mt-5 border-b border-line bg-paper/95 backdrop-blur-md md:top-[calc(env(safe-area-inset-top,0px)+68px)] md:mt-8">
        <div role="group" aria-label="Filtrar por categoria" className={`${wrap} scrollbar-none flex gap-2 overflow-x-auto py-3`}>
          {options.map(option => (
            <button
              key={option.label}
              aria-pressed={option.slug === (category && slug)}
              onClick={() => onNavigate({page: 'catalog', category: option.slug})}
              className="shrink-0 cursor-pointer whitespace-nowrap rounded-full border border-line px-4 py-2 text-[0.92rem] text-muted aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper">
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className={`${wrap} pt-6 md:pt-10`}>
        <p className="mb-4 text-sm text-muted md:mb-6">
          {visible.length} {visible.length === 1 ? 'produto' : 'produtos'}
        </p>
        <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 md:grid-cols-3 md:gap-x-7 md:gap-y-12 lg:grid-cols-4">
          {visible.map(product => (
            <ProductCard key={product.id} product={product} onOpen={id => onNavigate({page: 'product', id})} />
          ))}
        </div>
        {!visible.length && <p className="text-muted">Nenhum produto nesta categoria por enquanto.</p>}

        <div className="mt-14 grid justify-items-start gap-3 rounded-[4px] bg-linen p-6 md:mt-20 md:flex md:items-center md:justify-between md:p-8">
          <div className="grid gap-1">
            <h2 className="text-[1.3rem] md:text-[1.5rem]">Não encontrou o que procura?</h2>
            <p className="text-muted">Conte sua ideia e criamos algo especialmente para você.</p>
          </div>
          <a href={whatsappUrl('Olá! Tenho uma ideia de presente e gostaria de conversar.')} target="_blank" rel="noopener" className="inline-flex shrink-0 items-center gap-2 rounded-full border border-sage px-5 py-3 font-medium text-ink hover:border-ink">
            Falar com o atelier
          </a>
        </div>
      </div>
    </main>
  );
}
