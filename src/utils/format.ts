import type {Product} from '../types';

export function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', {currency: 'BRL', style: 'currency'});
}

export function minPrice(product: Product) {
  return Math.min(...product.variants.map(variant => variant.price));
}

export function hasPriceFrom(product: Product) {
  return new Set(product.variants.map(variant => variant.price)).size > 1 || product.variants.some(variant => variant.priceFrom);
}
