import {brand} from '../data/content';
import type {CartItem, Customer} from '../types';
import {formatCurrency} from './format';

export function cartTotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.total, 0);
}

export function buildOrderMessage(items: CartItem[], customer: Customer) {
  const lines = ['Olá, Trassu Atelier! Montei este pedido pelo site:', ''];

  items.forEach((item, index) => {
    lines.push(`${index + 1}. ${item.name}${item.variantName ? ` — ${item.variantName}` : ''}`);
    lines.push(`   Quantidade: ${item.quantity} × ${formatCurrency(item.unitPrice)}${item.priceFrom ? ' (a partir de)' : ''}`);
    item.details.forEach(detail => lines.push(`   ${detail.label}: ${detail.value}`));
    lines.push(`   Subtotal: ${formatCurrency(item.total)}`);
    lines.push('');
  });

  const anyFrom = items.some(item => item.priceFrom);
  lines.push(`Total estimado: ${formatCurrency(cartTotal(items))}${anyFrom ? ' (valores a partir de)' : ''}`);
  lines.push('Frete e forma de pagamento a combinar.');

  const extra: string[] = [];
  if (customer.name) extra.push(`Nome: ${customer.name}`);
  if (customer.delivery) {
    const zip = customer.delivery === 'Correios' && customer.zip ? ` — CEP ${customer.zip}` : '';
    extra.push(`Entrega: ${customer.delivery}${zip}`);
  }
  if (customer.date) {
    extra.push(`Preciso receber até: ${new Date(`${customer.date}T12:00`).toLocaleDateString('pt-BR')}`);
  }
  if (extra.length) {
    lines.push('', ...extra);
  }

  return lines.join('\n');
}

export function whatsappUrl(message?: string) {
  const base = `https://wa.me/${brand.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
