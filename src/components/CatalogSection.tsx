import {useState} from 'react';
import {categories} from '../data/catalog';
import type {Category, Product} from '../types';
import {ProductCard} from './ProductCard';

interface Props {
  products: Product[];
  onOpen: (id: string) => void;
}

export function CatalogSection({products, onOpen}: Props) {
  const [filter, setFilter] = useState<Category | 'Todos'>('Todos');
  const visible = products.filter(product => filter === 'Todos' || product.category === filter);
  const options: (Category | 'Todos')[] = ['Todos', ...categories];

  return (
    <section id="catalogo" className="py-22">
      <div className="mx-auto w-[min(1180px,100%-2.5rem)]">
        <div className="mb-10 grid max-w-[60ch] gap-3">
          <h2 className="text-[clamp(1.8rem,3.4vw,2.5rem)]">Escolha seu presente</h2>
          <p className="text-[1.075rem] text-muted">
            Diferentes formas de transformar uma ideia em algo feito especialmente para alguém. Monte seu pedido e
            finalize com a gente pelo WhatsApp.
          </p>
        </div>
        <div role="group" aria-label="Filtrar por categoria" className="mb-8 flex flex-wrap gap-2">
          {options.map(option => (
            <button
              key={option}
              aria-pressed={filter === option}
              onClick={() => setFilter(option)}
              className="cursor-pointer rounded-full border border-line px-4 py-1.5 text-[0.95rem] text-muted aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper">
              {option}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-x-7 gap-y-10">
          {visible.map(product => (
            <ProductCard key={product.id} product={product} onOpen={onOpen} />
          ))}
        </div>
        {!visible.length && <p className="text-muted">Nenhum produto nesta categoria por enquanto.</p>}
      </div>
    </section>
  );
}
