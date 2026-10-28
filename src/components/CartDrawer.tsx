import {X} from 'lucide-react';
import {useEffect} from 'react';
import {QuantitySelector} from './QuantitySelector';
import {catalog} from '../data/catalog';
import {deliveryOptions, shippingOption} from '../data/fields';
import type {CartItem, Customer} from '../types';
import {formatCurrency} from '../utils/format';
import {buildOrderMessage, cartTotal, whatsappUrl} from '../utils/whatsapp';
import {inputClass, labelClass} from './fieldStyles';
import {WhatsAppIcon} from './WhatsAppIcon';

interface Props {
  open: boolean;
  items: CartItem[];
  customer: Customer;
  onClose: () => void;
  onRemove: (key: string) => void;
  onQuantityChange: (key: string, quantity: number) => void;
  onCustomerChange: (changes: Partial<Customer>) => void;
  onBrowse: () => void;
}

export function CartDrawer({open, items, customer, onClose, onRemove, onQuantityChange, onCustomerChange, onBrowse}: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    const previousOverflow = document.body.style.overflow;
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  const anyFrom = items.some(item => item.priceFrom);

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-labelledby="pedido-titulo">
      <button aria-label="Fechar pedido" onClick={onClose} className="absolute inset-0 cursor-default bg-[rgba(40,35,32,0.45)]" />
      <aside className="animate-slide-in relative flex h-[100dvh] w-[min(460px,100%)] flex-col overflow-hidden bg-surface shadow-2xl">
        <div className="flex shrink-0 items-center justify-between border-b border-line px-4 pb-3 pt-[calc(env(safe-area-inset-top,0px)+0.75rem)] sm:px-6">
          <h2 id="pedido-titulo" className="text-2xl">Seu pedido</h2>
          <button type="button" onClick={onClose} aria-label="Fechar" autoFocus className="grid size-11 cursor-pointer place-items-center rounded-full bg-linen">
            <X className="size-[18px]" strokeWidth={1.6} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6">
          {!items.length ? (
            <div className="grid justify-items-center gap-4 px-4 py-12 text-center text-muted">
              <h3 className="text-xl">Seu pedido está vazio</h3>
              <p>Escolha um presente no catálogo e personalize do seu jeito.</p>
              <button type="button" onClick={onBrowse} className="min-h-11 cursor-pointer rounded-full border border-sage px-6 py-3 font-medium text-ink hover:border-ink">
                Ver catálogo
              </button>
            </div>
          ) : (
            <>
              <div className="grid gap-5" aria-live="polite">
                {items.map(item => {
                  const product = catalog.find(entry => entry.id === item.productId);
                  return (
                    <article key={item.key} className="grid grid-cols-[64px_minmax(0,1fr)] gap-3 border-b border-line pb-5 sm:grid-cols-[72px_minmax(0,1fr)] sm:gap-4">
                      <img src={item.image} alt="" className="h-20 w-16 rounded-[3px] object-cover sm:w-[72px]" />
                      <div className="min-w-0">
                        <h3 className="text-[1.05rem]">{item.name}</h3>
                        {item.variantName && <p className="text-sm text-muted">{item.variantName}</p>}
                        {!!item.details.length && (
                          <dl className="mt-1.5 grid gap-1 text-[0.85rem] text-muted">
                            {item.details.filter(detail => detail.label !== 'Carimbo exclusivo').map((detail, index) => (
                              <div key={`${detail.label}-${index}`} className="break-words">
                                <dt className="inline font-medium">{detail.label}: </dt>
                                <dd className="inline">{detail.value}</dd>
                              </div>
                            ))}
                          </dl>
                        )}
                        <p className="mt-2 text-[0.85rem] text-muted">
                          {formatCurrency(item.unitPrice)} por unidade{item.priceFrom ? ' (a partir de)' : ''}
                        </p>
                        {item.extraPrice > 0 && (
                          <p className="text-[0.85rem] text-muted">Criação do carimbo (taxa única): {formatCurrency(item.extraPrice)}</p>
                        )}
                        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                          <QuantitySelector
                            id={`quantidade-${item.key}`}
                            label={`Quantidade de ${item.name}`}
                            value={item.quantity}
                            min={product?.minQty ?? 1}
                            step={product?.step ?? 1}
                            onChange={value => onQuantityChange(item.key, value)}
                          />
                          <strong className="text-[0.95rem] font-medium text-ink">{formatCurrency(item.total)}</strong>
                        </div>
                        {product && product.minQty > 1 && <p className="mt-1 text-xs text-rosewood">Mínimo: {product.minQty} unidades</p>}
                        <button type="button" onClick={() => onRemove(item.key)} aria-label={`Remover ${item.name}`} className="mt-2 min-h-9 cursor-pointer text-sm text-muted underline underline-offset-4 hover:text-ink">
                          Remover item
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className="mt-6 grid gap-4 border-t border-line pt-5">
                <h3 className="font-serif text-xl text-ink">Dados para encomenda</h3>
                <p className="text-sm text-muted">Opcional nesta etapa. Você poderá confirmar os detalhes no WhatsApp.</p>
                <div className="grid gap-1.5">
                  <label htmlFor="cliente-nome" className={labelClass}>Seu nome</label>
                  <input id="cliente-nome" autoComplete="name" value={customer.name} onChange={event => onCustomerChange({name: event.target.value})} className={inputClass} />
                </div>
                <div className="grid gap-3 min-[400px]:grid-cols-2">
                  <div className="grid gap-1.5">
                    <label htmlFor="cliente-entrega" className={labelClass}>Entrega</label>
                    <select id="cliente-entrega" value={customer.delivery} onChange={event => onCustomerChange({delivery: event.target.value, zip: event.target.value === shippingOption ? customer.zip : ''})} className={inputClass}>
                      <option value="">A combinar</option>
                      {deliveryOptions.map(option => <option key={option}>{option}</option>)}
                    </select>
                  </div>
                  <div className="grid gap-1.5">
                    <label htmlFor="cliente-data" className={labelClass}>Data desejada</label>
                    <input id="cliente-data" type="date" value={customer.date} onChange={event => onCustomerChange({date: event.target.value})} className={inputClass} />
                  </div>
                </div>
                {customer.delivery === shippingOption && (
                  <div className="grid gap-1.5">
                    <label htmlFor="cliente-cep" className={labelClass}>CEP</label>
                    <input id="cliente-cep" inputMode="numeric" autoComplete="postal-code" placeholder="00000-000" value={customer.zip} onChange={event => onCustomerChange({zip: event.target.value})} className={inputClass} />
                  </div>
                )}
                <button type="button" onClick={onBrowse} className="min-h-11 justify-self-start cursor-pointer text-sm font-medium text-ink underline underline-offset-4">Continuar escolhendo produtos</button>
              </div>
            </>
          )}
        </div>

        {!!items.length && (
          <div className="grid shrink-0 gap-2 border-t border-line bg-surface px-4 pb-[calc(env(safe-area-inset-bottom,0px)+0.75rem)] pt-3 sm:px-6">
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-[0.9rem] text-muted">Total dos itens{anyFrom ? ', a partir de' : ''}</span>
              <strong className="font-serif text-[1.4rem] font-medium text-ink">{formatCurrency(cartTotal(items))}</strong>
            </div>
            <p className="text-xs text-muted">Frete, prazos e valores sob orçamento serão confirmados pelo atelier.</p>
            <a href={whatsappUrl(buildOrderMessage(items, customer))} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-3 font-medium text-white hover:brightness-95">
              <WhatsAppIcon />
              Enviar pedido pelo WhatsApp
            </a>
            <p className="text-center text-xs text-muted">Seu pedido ainda não está confirmado. O carrinho será mantido.</p>
          </div>
        )}
      </aside>
    </div>
  );
}
