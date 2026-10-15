import type {Product} from '../types';

export function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', {currency: 'BRL', style: 'currency'});
}

export function parseMoney(value: string, fallback: number) {
  const normalized = String(value).replace(/\./g, '').replace(',', '.').replace(/[^\d.]/g, '');
  const parsed = Number(normalized);
  return normalized && Number.isFinite(parsed) ? parsed : fallback;
}

export function moneyInput(value: number) {
  return value.toFixed(2).replace('.', ',');
}

export function slugify(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function minPrice(product: Product) {
  return Math.min(...product.variants.map(variant => variant.price));
}

export function hasPriceFrom(product: Product) {
  return new Set(product.variants.map(variant => variant.price)).size > 1 || product.variants.some(variant => variant.priceFrom);
}
