import {ArrowLeft} from 'lucide-react';
import {useMemo, useState} from 'react';
import {PersonalizationFields} from '../components/PersonalizationFields';
import {QuantitySelector} from '../components/QuantitySelector';
import {WhatsAppIcon} from '../components/WhatsAppIcon';
import type {CartItem, Product, Route} from '../types';
import {formatCurrency} from '../utils/format';
import {whatsappUrl} from '../utils/whatsapp';

interface Props {
  product: Product;
  themes: string[];
  onAddToCart: (item: CartItem) => void;
  onNavigate: (route: Route) => void;
}

export function ProductScreen({product, themes, onAddToCart, onNavigate}: Props) {
  const [variantId, setVariantId] = useState(product.variants[0]?.id);
  const [quantity, setQuantity] = useState(product.minQty);
  const [values, setValues] = useState<Record<string, string>>({});
  const [withExtra, setWithExtra] = useState(false);
  const [invalid, setInvalid] = useState<string[]>([]);
  const [error, setError] = useState('');

  const variant = product.variants.find(item => item.id === variantId) ?? product.variants[0];
  const extraPrice = product.extra && withExtra ? product.extra.price : 0;
  const total = variant.price * quantity + extraPrice;
  const priceFrom = Boolean(variant.priceFrom);
  const image = variant.image ?? product.image;

  const related = useMemo(() => `Olá! Tenho interesse em ${product.name}. Pode me ajudar?`, [product.name]);

  function updateValue(id: string, value: string) {
    setValues(current => ({...current, [id]: value}));
    setInvalid(current => current.filter(item => item !== id));
    setError('');
  }

  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (quantity < product.minQty) {
      setQuantity(product.minQty);
      setError(`A quantidade mínima deste produto é ${product.minQty} unidades.`);
      return;
    }
    const missing = product.fields.filter(field => field.required && !values[field.id]?.trim());
    if (missing.length) {
      setInvalid(missing.map(field => field.id));
      setError(`Preencha: ${missing.map(field => field.label.toLowerCase()).join(', ')}.`);
      document.getElementById(`campo-${missing[0].id}`)?.focus();
      return;
    }
    const details = product.fields
      .map(field => ({label: field.label, value: values[field.id]?.trim() ?? ''}))
      .filter(detail => detail.value);
    if (extraPrice && product.extra) {
      details.push({label: 'Carimbo exclusivo', value: `Sim (+${formatCurrency(product.extra.price)})`});
    }
    onAddToCart({
      key: `${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      image,
      variantName: product.variants.length > 1 ? variant.name : '',
      unitPrice: variant.price,
      priceFrom,
      quantity,
      extraPrice,
      total,
      details,
    });
    setValues({});
    setWithExtra(false);
    setQuantity(product.minQty);
  }

  return (
    <main className="mx-auto w-[min(1180px,100%-2.5rem)] pb-20 pt-6">
      <nav aria-label="Navegação" className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted">
        <button onClick={() => onNavigate({page: 'home', section: 'catalogo'})} className="inline-flex cursor-pointer items-center gap-1.5 hover:text-ink">
          <ArrowLeft className="size-4" />
          Catálogo
        </button>
        <span>/</span>
        <span>{product.category}</span>
        <span>/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="aspect-[4/5] overflow-hidden rounded-[3px] bg-linen">
            <img src={image} alt={product.name} className="size-full object-cover" />
          </div>
        </div>

        <form onSubmit={submit} noValidate className="grid content-start gap-6">
          <div>
            <h1 className="text-[clamp(2rem,3.6vw,2.6rem)] leading-tight">{product.name}</h1>
            <p className="mt-2 font-serif text-lg italic text-muted">{product.subtitle}</p>
            <p className="mt-1 text-sm text-muted">{product.size}</p>
          </div>
          <p className="text-[1.05rem]">{product.description}</p>

          {!product.active && (
            <div className="grid gap-3 rounded-[4px] border border-line bg-linen p-5">
              <p className="font-medium text-ink">Este produto está indisponível no momento.</p>
              <p className="text-[0.95rem] text-muted">Fale com a gente para saber quando volta ou para uma alternativa.</p>
              <a href={whatsappUrl(related)} target="_blank" rel="noopener" className="inline-flex w-max items-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 font-medium text-white">
                <WhatsAppIcon />
                Perguntar no WhatsApp
              </a>
            </div>
          )}

          {product.active && (
            <>
              {product.notice && <p className="border-l-2 border-blush pl-3 text-[0.92rem] text-muted">{product.notice}</p>}

              {product.variants.length > 1 && (
                <fieldset className="grid gap-2">
                  <legend className="mb-2 text-[0.9rem] font-medium text-ink">Escolha a opção</legend>
                  {product.variants.map(option => (
                    <label
                      key={option.id}
                      className="flex cursor-pointer items-center justify-between gap-4 rounded-[4px] border border-line px-4 py-3 text-[0.97rem] has-checked:border-ink has-checked:bg-paper">
                      <span className="flex items-center gap-3">
                        <input type="radio" name="variante" value={option.id} checked={option.id === variant.id} onChange={() => setVariantId(option.id)} className="accent-ink" />
                        {option.name}
                      </span>
                      <strong className="whitespace-nowrap font-medium text-ink">{formatCurrency(option.price)}</strong>
                    </label>
                  ))}
                </fieldset>
              )}

              <PersonalizationFields fields={product.fields} values={values} themes={themes} invalid={invalid} onChange={updateValue} />

              {product.extra && (
                <label className="flex cursor-pointer items-start gap-3 text-[0.95rem]">
                  <input type="checkbox" checked={withExtra} onChange={event => setWithExtra(event.target.checked)} className="mt-1.5 accent-ink" />
                  <span>
                    {product.extra.label} (+{formatCurrency(product.extra.price)})
                    <span className="block text-sm text-muted">{product.extra.help}</span>
                  </span>
                </label>
              )}

              <div className="grid gap-2">
                <label htmlFor="quantidade" className="text-[0.9rem] font-medium text-ink">Quantidade</label>
                <QuantitySelector value={quantity} min={product.minQty} step={product.step} onChange={setQuantity} />
                {product.minQty > 1 && (
                  <span className="text-sm font-medium text-rosewood">Pedido mínimo de {product.minQty} unidades</span>
                )}
              </div>

              {product.includes && <p className="border-l-2 border-blush pl-3 text-[0.92rem] text-muted">{product.includes}</p>}

              {error && <p role="alert" className="text-sm text-danger">{error}</p>}

              <div className="flex items-baseline justify-between border-t border-line pt-4">
                <span className="text-[0.95rem] text-muted">Total estimado{priceFrom ? ', a partir de' : ''}</span>
                <strong className="font-serif text-2xl font-medium text-ink">{formatCurrency(total)}</strong>
              </div>

              <button type="submit" className="cursor-pointer rounded-full bg-ink px-6 py-3.5 font-medium text-paper hover:opacity-90">
                Adicionar ao pedido
              </button>
            </>
          )}
        </form>
      </div>
    </main>
  );
}
