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
