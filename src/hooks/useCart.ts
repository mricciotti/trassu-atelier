import {useEffect, useState} from 'react';
import type {CartItem, Customer} from '../types';
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
      items: Array.isArray(stored.items) ? stored.items : [],
      customer: {...emptyCustomer, ...stored.customer},
    };
  });

  useEffect(() => {
    writeStorage(STORAGE_KEY, state);
  }, [state]);

  return {
    items: state.items,
    customer: state.customer,
    add: (item: CartItem) => setState(current => ({...current, items: [...current.items, item]})),
    remove: (key: string) => setState(current => ({...current, items: current.items.filter(item => item.key !== key)})),
    setCustomer: (changes: Partial<Customer>) =>
      setState(current => ({...current, customer: {...current.customer, ...changes}})),
  };
}
