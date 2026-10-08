import {Plus, RotateCcw, Search} from 'lucide-react';
import {useState} from 'react';
import {AdminProductRow} from '../components/admin/AdminProductRow';
import {ProductEditor} from '../components/admin/ProductEditor';
import {ThemesPanel} from '../components/admin/ThemesPanel';
import {inputClass} from '../components/fieldStyles';
import type {Product, Route} from '../types';

interface Props {
  products: Product[];
  themes: string[];
  onUpdateProduct: (id: string, changes: Partial<Product>) => void;
  onSaveProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  onThemesChange: (themes: string[] | null) => void;
  onResetAll: () => void;
  onNavigate: (route: Route) => void;
}

type View = {tab: 'produtos'} | {tab: 'temas'} | {tab: 'editar'; id?: string};

export function AdminScreen({products, themes, onUpdateProduct, onSaveProduct, onDeleteProduct, onThemesChange, onResetAll, onNavigate}: Props) {
  const [view, setView] = useState<View>({tab: 'produtos'});
  const [query, setQuery] = useState('');

  const filtered = products.filter(product =>
    `${product.name} ${product.category}`.toLowerCase().includes(query.trim().toLowerCase()),
  );
  const activeCount = products.filter(product => product.active).length;
  const featuredCount = products.filter(product => product.featured).length;

  const tabClass = (selected: boolean) =>
    `cursor-pointer border-b-2 px-1 pb-3 text-[0.97rem] ${selected ? 'border-ink font-medium text-ink' : 'border-transparent text-muted hover:text-ink'}`;

  if (view.tab === 'editar') {
    const product = view.id ? products.find(item => item.id === view.id) : undefined;
    return (
      <main className="mx-auto w-[min(1180px,100%-2.5rem)] pb-20 pt-8">
        <ProductEditor
          key={view.id ?? 'novo'}
          product={product}
          existingIds={products.map(item => item.id)}
          onCancel={() => setView({tab: 'produtos'})}
          onSave={next => {
            onSaveProduct(next);
            setView({tab: 'produtos'});
          }}
          onDelete={id => {
            onDeleteProduct(id);
            setView({tab: 'produtos'});
          }}
        />
      </main>
    );
  }

  return (
    <main className="mx-auto w-[min(1180px,100%-2.5rem)] pb-20 pt-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="grid gap-1">
          <h1 className="text-[clamp(2rem,3.6vw,2.6rem)]">Painel da loja</h1>
          <p className="text-muted">
            {products.length} produtos · {activeCount} disponíveis · {featuredCount} em destaque
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => onNavigate({page: 'home'})} className="cursor-pointer rounded-full border border-line px-5 py-2.5 font-medium text-ink hover:border-ink-soft">
            Ver loja
          </button>
          <button onClick={() => setView({tab: 'editar'})} className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-medium text-paper hover:opacity-90">
            <Plus className="size-4" />
            Novo produto
          </button>
        </div>
      </div>

      <div className="mb-6 flex gap-6 border-b border-line" role="tablist">
        <button role="tab" aria-selected={view.tab === 'produtos'} onClick={() => setView({tab: 'produtos'})} className={tabClass(view.tab === 'produtos')}>
          Produtos e preços
        </button>
        <button role="tab" aria-selected={view.tab === 'temas'} onClick={() => setView({tab: 'temas'})} className={tabClass(view.tab === 'temas')}>
          Temas
        </button>
      </div>

      {view.tab === 'produtos' && (
        <div className="grid gap-4">
          <div className="relative max-w-md">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <label htmlFor="busca-admin" className="sr-only">Buscar produto</label>
            <input id="busca-admin" value={query} onChange={event => setQuery(event.target.value)} placeholder="Buscar produto ou categoria" className={`${inputClass} pl-10`} />
          </div>
          <p className="text-sm text-muted">Os preços são salvos ao sair do campo. As mudanças aparecem na loja na hora.</p>
          <div className="grid gap-3">
            {filtered.map(product => (
              <AdminProductRow
                key={`${product.id}-${product.minQty}`}
                product={product}
                onUpdate={onUpdateProduct}
                onEdit={id => setView({tab: 'editar', id})}
                onView={id => onNavigate({page: 'product', id})}
              />
            ))}
            {!filtered.length && <p className="py-8 text-center text-muted">Nenhum produto encontrado para “{query}”.</p>}
          </div>
          <button
            onClick={() => window.confirm('Voltar todos os produtos, preços e temas para o catálogo original? Produtos cadastrados no painel serão removidos.') && onResetAll()}
            className="mt-6 inline-flex w-max cursor-pointer items-center gap-2 text-sm text-muted underline hover:text-ink">
            <RotateCcw className="size-4" />
            Restaurar catálogo original
          </button>
        </div>
      )}

      {view.tab === 'temas' && <ThemesPanel themes={themes} onChange={onThemesChange} onReset={() => onThemesChange(null)} />}
    </main>
  );
}
