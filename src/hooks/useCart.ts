import {useEffect, useState} from 'react';
import type {CartItem, Customer} from '../types';
import {appendCartItem, normalizeCartItems, removeCartItem, updateLineQuantity} from '../utils/order';
import {readStorage, writeStorage} from '../utils/storage';

const STORAGE_KEY = 'trassu-pedido';
const emptyCustomer: Customer = {name: '', delivery: '', zip: '', date: ''};

interface Stored {
  items: CartItem[];
  customer: Customer;
}

export function useCart() {
  const [state, setState] = useState<Stored>(() => {
    const stored = readStorage<Partial<Stored>>(STORAGE_KEY, {});
    return {
      items: normalizeCartItems(stored.items),
      customer: {...emptyCustomer, ...(stored.customer && typeof stored.customer === 'object' ? stored.customer : {})},
    };
  });

  useEffect(() => {
    writeStorage(STORAGE_KEY, state);
  }, [state]);

  return {
    items: state.items,
    customer: state.customer,
    add: (item: CartItem) => setState(current => ({...current, items: appendCartItem(current.items, item)})),
    remove: (key: string) => setState(current => ({...current, items: removeCartItem(current.items, key)})),
    updateQuantity: (key: string, value: number) => setState(current => ({...current, items: updateLineQuantity(current.items, key, value)})),
    setCustomer: (changes: Partial<Customer>) =>
      setState(current => ({...current, customer: {...current.customer, ...changes}})),
  };
}
