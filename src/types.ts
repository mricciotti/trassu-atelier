export type Category = 'Biscoitos' | 'Porcelanas' | 'Garrafas' | 'Para presentear';

export type FieldType = 'text' | 'textarea' | 'theme' | 'occasion' | 'select';

export interface PersonalizationField {
  id: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  options?: string[];
}

export interface Variant {
  id: string;
  name: string;
  price: number;
  priceFrom?: boolean;
  image?: string;
}

export interface Extra {
  label: string;
  price: number;
  help: string;
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  size: string;
  subtitle: string;
  description: string;
  image: string;
  variants: Variant[];
  minQty: number;
  step: number;
  fields: PersonalizationField[];
  extra?: Extra;
  notice?: string;
  includes?: string;
  featured?: boolean;
  active: boolean;
}

export interface CartDetail {
  label: string;
  value: string;
}

export interface CartItem {
  key: string;
  productId: string;
  name: string;
  image: string;
  variantName: string;
  variantId?: string;
  unitPrice: number;
  priceFrom: boolean;
  quantity: number;
  extraPrice: number;
  total: number;
  details: CartDetail[];
}

export interface Customer {
  name: string;
  delivery: string;
  zip: string;
  date: string;
}

export type Route =
  | {page: 'home'}
  | {page: 'catalog'; category?: string}
  | {page: 'atelier'}
  | {page: 'info'; section?: string}
  | {page: 'product'; id: string};
