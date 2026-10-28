import type {Product} from '../types';
import {formatCurrency, hasPriceFrom, minPrice} from '../utils/format';

interface Props {
  product: Product;
  onOpen: (id: string) => void;
}

export function ProductCard({product, onOpen}: Props) {
  return (
    <button
      onClick={() => onOpen(product.id)}
      aria-label={`Personalizar ${product.name}`}
      className="group flex w-full cursor-pointer flex-col gap-2 text-left md:gap-3">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[3px] bg-linen">
        <img
          src={product.image}
          alt=""
          loading="lazy"
          className={`size-full object-cover transition-transform duration-700 group-hover:scale-[1.03] ${product.active ? '' : 'opacity-50 grayscale'}`}
        />
        {!product.active && (
          <span className="absolute left-2 top-2 rounded-full bg-surface px-2.5 py-1 text-[0.7rem] font-medium text-ink md:left-3 md:top-3 md:text-xs">
            Indisponível
          </span>
        )}
      </div>
      <div className="grid gap-0.5 md:flex md:items-baseline md:justify-between md:gap-4">
        <h3 className="text-[1.05rem] leading-snug md:text-[1.3rem]">{product.name}</h3>
        <span className="whitespace-nowrap text-[0.95rem] font-medium text-ink md:text-base">
          {hasPriceFrom(product) && <small className="mr-1 text-[0.75rem] font-light text-muted md:text-[0.8rem]">a partir de</small>}
          {formatCurrency(minPrice(product))}
        </span>
      </div>
      <span className="text-[0.82rem] leading-snug text-muted md:-mt-1.5 md:text-[0.92rem]">{product.size}</span>
      <p className="hidden text-[0.97rem] leading-relaxed text-muted md:block">{product.subtitle}</p>
      {product.minQty > 1 && (
        <span className="text-[0.8rem] font-medium text-rosewood md:text-sm">Mínimo de {product.minQty} unidades</span>
      )}
      <span className="inline-flex min-h-9 items-center text-[0.88rem] font-medium text-ink underline decoration-blush underline-offset-[5px] md:text-[0.95rem]">Ver opções →</span>
    </button>
  );
}
