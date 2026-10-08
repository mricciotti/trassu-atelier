import type {AdminState, Product} from '../types';
import {readStorage, writeStorage} from './storage';

const STORAGE_KEY = 'trassu-admin';

export const emptyAdminState: AdminState = {overrides: {}, custom: [], themes: null};

export function loadAdminState(): AdminState {
  return {...emptyAdminState, ...readStorage<Partial<AdminState>>(STORAGE_KEY, {})};
}

export function saveAdminState(state: AdminState) {
  return writeStorage(STORAGE_KEY, state);
}

export function applyAdminState(base: Product[], state: AdminState): Product[] {
  return [...base.map(product => ({...product, ...state.overrides[product.id]})), ...state.custom];
}

export function minPrice(product: Product) {
  return Math.min(...product.variants.map(variant => variant.price));
}

export function hasPriceFrom(product: Product) {
  return product.variants.length > 1 || product.variants.some(variant => variant.priceFrom);
}
