import {catalog} from '../data/catalog';
import type {CartItem, Product, Variant} from '../types';

export function toCents(value: number) {
  return Math.round(value * 100);
}

export function toMoney(cents: number) {
  return Math.round(cents) / 100;
}

export function quantityFor(product: Product, value: number) {
  const minimum = Math.max(1, product.minQty);
  const step = Math.max(1, product.step);
  if (!Number.isFinite(value)) return minimum;
  return minimum + Math.ceil(Math.max(0, Math.ceil(value) - minimum) / step) * step;
}

export function lineTotal(unitPrice: number, quantity: number, extraPrice = 0) {
  return toMoney(toCents(unitPrice) * quantity + toCents(extraPrice));
}

export function orderTotal(items: CartItem[]) {
  return toMoney(items.reduce((sum, item) => sum + toCents(item.total), 0));
}

function productVariant(item: CartItem): {product: Product; variant: Variant} | null {
  const product = catalog.find(entry => entry.id === item.productId);
  if (!product) return null;
  const variant = product.variants.find(entry => entry.id === item.variantId)
    ?? product.variants.find(entry => entry.name === item.variantName)
    ?? (product.variants.length === 1 ? product.variants[0] : undefined);
  return variant ? {product, variant} : null;
}

export function normalizeItem(raw: unknown): CartItem | null {
  if (!raw || typeof raw !== 'object') return null;
  const item = raw as Partial<CartItem>;
  if (typeof item.productId !== 'string') return null;
  const found = productVariant(item as CartItem);
  if (!found) return null;
  const {product, variant} = found;
  const quantity = quantityFor(product, typeof item.quantity === 'number' ? item.quantity : product.minQty);
  const extraPrice = product.extra && item.extraPrice === product.extra.price ? product.extra.price : 0;
  const details = Array.isArray(item.details) ? item.details.filter(detail =>
    detail && typeof detail.label === 'string' && typeof detail.value === 'string'
  ).map(detail => ({label: detail.label, value: detail.value})) : [];
  if (extraPrice && product.extra && !details.some(detail => detail.label === 'Carimbo exclusivo')) {
    details.push({label: 'Carimbo exclusivo', value: 'Sim'});
  }
  return {
    key: typeof item.key === 'string' && item.key ? item.key : `${product.id}-${Date.now()}`,
    productId: product.id,
    name: product.name,
    image: variant.image ?? product.image,
    variantId: variant.id,
    variantName: product.variants.length > 1 ? variant.name : '',
    unitPrice: variant.price,
    priceFrom: Boolean(variant.priceFrom),
    quantity,
    extraPrice,
    total: lineTotal(variant.price, quantity, extraPrice),
    details,
  };
}

export function normalizeCartItems(value: unknown): CartItem[] {
  if (!Array.isArray(value)) return [];
  return value.map(normalizeItem).filter((item): item is CartItem => item !== null);
}

export function updateLineQuantity(items: CartItem[], key: string, value: number) {
  return items.map(item => {
    if (item.key !== key) return item;
    const product = catalog.find(entry => entry.id === item.productId);
    if (!product) return item;
    const quantity = quantityFor(product, value);
    return {...item, quantity, total: lineTotal(item.unitPrice, quantity, item.extraPrice)};
  });
}

export function appendCartItem(items: CartItem[], raw: CartItem) {
  const normalized = normalizeItem(raw);
  return normalized ? [...items, normalized] : items;
}

export function removeCartItem(items: CartItem[], key: string) {
  return items.filter(item => item.key !== key);
}
