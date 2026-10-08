import {ExternalLink, Pencil} from 'lucide-react';
import {useState} from 'react';
import type {Product, Variant} from '../../types';
import {moneyInput, parseMoney} from '../../utils/format';
import {Toggle} from './Toggle';

interface Props {
  product: Product;
  onUpdate: (id: string, changes: Partial<Product>) => void;
  onEdit: (id: string) => void;
  onView: (id: string) => void;
}

function PriceInput({variant, onCommit}: {variant: Variant; onCommit: (price: number) => void}) {
  const [text, setText] = useState(moneyInput(variant.price));
  return (
    <label className="grid gap-1">
      <span className="max-w-[150px] truncate text-xs text-muted" title={variant.name}>{variant.name}</span>
      <span className="flex items-center rounded-[4px] border border-line bg-paper focus-within:border-rosewood">
        <span className="pl-2.5 text-sm text-muted">R$</span>
        <input
          inputMode="decimal"
          value={text}
          onChange={event => setText(event.target.value)}
          onBlur={() => {
            const next = parseMoney(text, variant.price);
            setText(moneyInput(next));
            if (next !== variant.price) onCommit(next);
          }}
          className="w-22 bg-transparent px-2 py-2 text-sm font-medium text-ink outline-none"
        />
      </span>
    </label>
  );
}

export function AdminProductRow({product, onUpdate, onEdit, onView}: Props) {
  const [minText, setMinText] = useState(String(product.minQty));

  function commitPrice(variantId: string, price: number) {
    onUpdate(product.id, {
      variants: product.variants.map(variant => (variant.id === variantId ? {...variant, price} : variant)),
    });
  }

  return (
    <div className="grid gap-4 rounded-md border border-line bg-surface p-4 lg:grid-cols-[minmax(220px,1.1fr)_2fr_auto] lg:items-center">
      <div className="flex items-center gap-4">
        <img src={product.image} alt="" className={`size-16 shrink-0 rounded-[3px] object-cover ${product.active ? '' : 'opacity-50 grayscale'}`} />
        <div className="min-w-0">
          <p className="truncate font-serif text-lg text-ink">{product.name}</p>
          <p className="text-sm text-muted">
            {product.category}
            {product.custom ? ' · cadastrado no painel' : ''}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-end gap-3">
        {product.variants.map(variant => (
          <PriceInput key={`${variant.id}-${variant.price}`} variant={variant} onCommit={price => commitPrice(variant.id, price)} />
        ))}
        <label className="grid gap-1">
          <span className="text-xs text-muted">Pedido mínimo</span>
          <input
            inputMode="numeric"
            value={minText}
            onChange={event => setMinText(event.target.value)}
            onBlur={() => {
              const next = Math.max(1, parseInt(minText, 10) || product.minQty);
              setMinText(String(next));
              if (next !== product.minQty) onUpdate(product.id, {minQty: next});
            }}
            className="w-20 rounded-[4px] border border-line bg-paper px-2.5 py-2 text-sm font-medium text-ink outline-none focus:border-rosewood"
          />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 lg:justify-end">
        <Toggle checked={product.active} label="Disponível" onChange={active => onUpdate(product.id, {active})} />
        <Toggle checked={Boolean(product.featured)} label="Destaque" onChange={featured => onUpdate(product.id, {featured})} />
        <div className="flex gap-1">
          <button onClick={() => onEdit(product.id)} aria-label={`Editar ${product.name}`} title="Editar" className="grid size-9 cursor-pointer place-items-center rounded-full text-muted hover:bg-linen hover:text-ink">
            <Pencil className="size-4" />
          </button>
          <button onClick={() => onView(product.id)} aria-label={`Ver ${product.name} na loja`} title="Ver na loja" className="grid size-9 cursor-pointer place-items-center rounded-full text-muted hover:bg-linen hover:text-ink">
            <ExternalLink className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
