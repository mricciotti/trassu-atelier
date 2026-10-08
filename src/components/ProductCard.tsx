import type {Product} from '../types';
import {formatCurrency} from '../utils/format';
import {hasPriceFrom, minPrice} from '../utils/adminCatalog';

interface Props {
  product: Product;
  onOpen: (id: string) => void;
}

export function ProductCard({product, onOpen}: Props) {
  return (
    <button
      onClick={() => onOpen(product.id)}
      aria-label={`Personalizar ${product.name}`}
      className="group flex cursor-pointer flex-col gap-3.5 text-left">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] bg-linen">
        <img
          src={product.image}
          alt=""
          loading="lazy"
          className={`size-full object-cover transition-transform duration-700 group-hover:scale-[1.03] ${product.active ? '' : 'opacity-50 grayscale'}`}
        />
        {!product.active && (
          <span className="absolute left-3 top-3 rounded-full bg-surface px-3 py-1 text-xs font-medium text-ink">
            Indisponível no momento
          </span>
        )}
      </div>
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-[1.3rem]">{product.name}</h3>
        <span className="whitespace-nowrap font-medium text-ink">
          {hasPriceFrom(product) && <small className="mr-1 text-[0.8rem] font-light text-muted">a partir de</small>}
          {formatCurrency(minPrice(product))}
        </span>
      </div>
      <span className="-mt-2 text-[0.92rem] text-muted">{product.size}</span>
      <p className="text-[0.97rem] leading-relaxed text-muted">{product.subtitle}</p>
      {product.minQty > 1 && (
        <span className="text-sm font-medium text-rosewood">Pedido mínimo de {product.minQty} unidades</span>
      )}
      <span className="text-[0.95rem] font-medium text-ink underline decoration-blush underline-offset-[5px]">Personalizar</span>
    </button>
  );
}
