import {X} from 'lucide-react';
import {useEffect} from 'react';
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
  onCustomerChange: (changes: Partial<Customer>) => void;
  onBrowse: () => void;
}

export function CartDrawer({open, items, customer, onClose, onRemove, onCustomerChange, onBrowse}: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  const anyFrom = items.some(item => item.priceFrom);

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-labelledby="pedido-titulo">
      <button aria-label="Fechar" onClick={onClose} className="absolute inset-0 cursor-default bg-[rgba(40,35,32,0.45)]" />
      <aside className="animate-slide-in relative flex h-full w-[min(460px,100%)] flex-col bg-surface shadow-2xl">
        <div className="flex items-center justify-between border-b border-line px-6 pb-5 pt-[calc(env(safe-area-inset-top,0px)+1.25rem)]">
          <h2 id="pedido-titulo" className="text-2xl">Seu pedido</h2>
          <button onClick={onClose} aria-label="Fechar" autoFocus className="grid size-10 cursor-pointer place-items-center rounded-full bg-linen">
            <X className="size-[18px]" strokeWidth={1.6} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {!items.length && (
            <div className="grid justify-items-center gap-4 px-4 py-12 text-center text-muted">
              <h3 className="text-xl">Seu pedido está vazio</h3>
              <p>Escolha um presente no catálogo e personalize do seu jeito.</p>
              <button onClick={onBrowse} className="cursor-pointer rounded-full border border-sage px-6 py-3 font-medium text-ink hover:border-ink">
                Ver catálogo
              </button>
            </div>
          )}
          <div className="grid gap-4">
            {items.map(item => (
              <div key={item.key} className="grid grid-cols-[72px_1fr] gap-4 border-b border-line pb-4">
                <img src={item.image} alt="" className="h-22 w-[72px] rounded-[3px] object-cover" />
                <div>
                  <h3 className="text-[1.05rem]">{item.name}</h3>
                  {item.variantName && <p className="text-sm text-muted">{item.variantName}</p>}
                  {!!item.details.length && (
                    <dl className="mt-1.5 grid grid-cols-[auto_1fr] gap-x-2 gap-y-0.5 text-[0.85rem] text-muted">
                      {item.details.map(detail => (
                        <div key={detail.label} className="contents">
                          <dt className="font-medium">{detail.label}</dt>
                          <dd className="break-words">{detail.value}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  <div className="mt-2 flex items-center justify-between text-[0.92rem]">
                    <span>
                      {item.quantity} × {formatCurrency(item.unitPrice)} ·{' '}
                      <strong className="font-medium text-ink">{formatCurrency(item.total)}</strong>
                    </span>
                    <button onClick={() => onRemove(item.key)} className="cursor-pointer text-sm text-muted underline">
                      Remover
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {!!items.length && (
          <div className="grid gap-3.5 border-t border-line px-6 pb-[calc(env(safe-area-inset-bottom,0px)+1.25rem)] pt-5">
            <div className="flex items-baseline justify-between">
              <span className="text-[0.95rem] text-muted">Total estimado{anyFrom ? ', a partir de' : ''}</span>
              <strong className="font-serif text-2xl font-medium text-ink">{formatCurrency(cartTotal(items))}</strong>
            </div>
            <div className="grid gap-1.5">
              <label htmlFor="cliente-nome" className={labelClass}>Seu nome</label>
              <input id="cliente-nome" autoComplete="name" value={customer.name} onChange={event => onCustomerChange({name: event.target.value})} className={inputClass} />
            </div>
            <div className="grid gap-3 min-[400px]:grid-cols-2">
              <div className="grid gap-1.5">
                <label htmlFor="cliente-entrega" className={labelClass}>Entrega</label>
                <select id="cliente-entrega" value={customer.delivery} onChange={event => onCustomerChange({delivery: event.target.value})} className={inputClass}>
                  <option value="">A combinar</option>
                  {deliveryOptions.map(option => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className="grid gap-1.5">
                <label htmlFor="cliente-data" className={labelClass}>Preciso até</label>
                <input id="cliente-data" type="date" value={customer.date} onChange={event => onCustomerChange({date: event.target.value})} className={inputClass} />
              </div>
            </div>
            {customer.delivery === shippingOption && (
              <div className="grid gap-1.5">
                <label htmlFor="cliente-cep" className={labelClass}>CEP</label>
                <input id="cliente-cep" inputMode="numeric" autoComplete="postal-code" placeholder="00000-000" value={customer.zip} onChange={event => onCustomerChange({zip: event.target.value})} className={inputClass} />
              </div>
            )}
            <a
              href={whatsappUrl(buildOrderMessage(items, customer))}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 font-medium text-white hover:brightness-95">
              <WhatsAppIcon />
              Finalizar no WhatsApp
            </a>
            <p className="text-[0.84rem] text-muted">
              Você será levado ao WhatsApp com o resumo do pedido. Frete, prazo e pagamento são confirmados por lá antes da produção.
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}
