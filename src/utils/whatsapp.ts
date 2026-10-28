import {brand} from '../data/content';
import type {CartItem, Customer} from '../types';
import {formatCurrency} from './format';
import {orderTotal} from './order';

export const cartTotal = orderTotal;

export function buildOrderMessage(items: CartItem[], customer: Customer) {
  if (!items.length) return '';
  const lines = ['Olá! Gostaria de fazer uma encomenda na Trassu Atelier.', ''];

  items.forEach((item, index) => {
    lines.push(`${index + 1}. ${item.name}`);
    if (item.variantName) lines.push(`   Opção: ${item.variantName}`);
    lines.push(`   Quantidade: ${item.quantity} × ${formatCurrency(item.unitPrice)}${item.priceFrom ? ' (a partir de)' : ''}`);
    item.details.forEach(detail => {
      if (detail.label !== 'Carimbo exclusivo') lines.push(`   ${detail.label}: ${detail.value}`);
    });
    if (item.extraPrice) lines.push(`   Criação do carimbo (taxa única): ${formatCurrency(item.extraPrice)}`);
    lines.push(`   Subtotal: ${formatCurrency(item.total)}${item.priceFrom ? ' (a partir de)' : ''}`);
    lines.push('');
  });

  const anyFrom = items.some(item => item.priceFrom);
  lines.push(`Total estimado dos itens: ${formatCurrency(orderTotal(items))}${anyFrom ? ' (valores a partir de)' : ''}`);
  lines.push('Frete, prazo de produção e valores sujeitos a orçamento serão confirmados pelo atelier.');
  lines.push('Este pedido ainda não foi confirmado nem pago.');
  if (items.some(item => item.productId === 'carimbadinhos')) {
    lines.push('Reutilização de carimbo e pedidos com várias artes: confirmar com o atelier.');
  }

  const extra: string[] = [];
  if (typeof customer.name === 'string' && customer.name.trim()) extra.push(`Nome: ${customer.name.trim()}`);
  if (customer.delivery) {
    const zip = customer.delivery === 'Correios ou transportadora' && typeof customer.zip === 'string' && customer.zip.trim() ? ` — CEP ${customer.zip.trim()}` : '';
    extra.push(`Entrega: ${customer.delivery}${zip}`);
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(customer.date)) {
    const [year, month, day] = customer.date.split('-');
    extra.push(`Data desejada: ${day}/${month}/${year} (a confirmar)`);
  }
  if (extra.length) lines.push('', ...extra);

  return lines.join('\n');
}

export function whatsappUrl(message?: string) {
  const base = `https://wa.me/${brand.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
