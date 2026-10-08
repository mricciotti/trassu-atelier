import {ArrowLeft, ImagePlus, Plus, Trash2} from 'lucide-react';
import {useState} from 'react';
import {categories} from '../../data/catalog';
import {fieldPresets} from '../../data/fields';
import type {Category, PersonalizationField, Product, Variant} from '../../types';
import {moneyInput, parseMoney, slugify} from '../../utils/format';
import {compressImage} from '../../utils/image';
import {inputClass, labelClass} from '../fieldStyles';
import {Toggle} from './Toggle';

interface Props {
  product?: Product;
  existingIds: string[];
  onSave: (product: Product) => void;
  onDelete?: (id: string) => void;
  onCancel: () => void;
}

interface VariantDraft extends Variant {
  priceText: string;
}

function toDraft(variant: Variant): VariantDraft {
  return {...variant, priceText: moneyInput(variant.price)};
}

export function ProductEditor({product, existingIds, onSave, onDelete, onCancel}: Props) {
  const isNew = !product;
  const [name, setName] = useState(product?.name ?? '');
  const [category, setCategory] = useState<Category>(product?.category ?? 'Porcelanas');
  const [size, setSize] = useState(product?.size ?? '');
  const [subtitle, setSubtitle] = useState(product?.subtitle ?? '');
  const [description, setDescription] = useState(product?.description ?? '');
  const [image, setImage] = useState(product?.image ?? '');
  const [variants, setVariants] = useState<VariantDraft[]>(
    (product?.variants ?? [{id: 'unidade', name: 'Unidade', price: 0}]).map(toDraft),
  );
  const [minQty, setMinQty] = useState(String(product?.minQty ?? 1));
  const [step, setStep] = useState(String(product?.step ?? 1));
  const [fields, setFields] = useState<PersonalizationField[]>(product?.fields ?? []);
  const [includes, setIncludes] = useState(product?.includes ?? '');
  const [notice, setNotice] = useState(product?.notice ?? '');
  const [active, setActive] = useState(product?.active ?? true);
  const [featured, setFeatured] = useState(Boolean(product?.featured));
  const [errors, setErrors] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  async function handleImage(file?: File) {
    if (!file) return;
    setUploading(true);
    try {
      setImage(await compressImage(file));
      setErrors(current => current.filter(error => !error.startsWith('Foto')));
    } catch (error) {
      setErrors([`Foto: ${(error as Error).message}`]);
    } finally {
      setUploading(false);
    }
  }

  function updateVariant(index: number, changes: Partial<VariantDraft>) {
    setVariants(current => current.map((variant, i) => (i === index ? {...variant, ...changes} : variant)));
  }

  function toggleField(id: string) {
    setFields(current => {
      if (current.some(field => field.id === id)) {
        return current.filter(field => field.id !== id);
      }
      const preset = fieldPresets.find(field => field.id === id)!;
      const order = fieldPresets.map(field => field.id);
      return [...current, {...preset}].sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
    });
  }

  function toggleRequired(id: string) {
    setFields(current => current.map(field => (field.id === id ? {...field, required: !field.required} : field)));
  }

  function save(event: React.FormEvent) {
    event.preventDefault();
    const parsed: Variant[] = variants.map(({priceText, ...variant}) => ({
      ...variant,
      name: variant.name.trim() || 'Unidade',
      price: parseMoney(priceText, 0),
    }));
    const nextErrors: string[] = [];
    if (!name.trim()) nextErrors.push('Dê um nome ao produto.');
    if (!image) nextErrors.push('Foto: adicione uma foto do produto.');
    if (parsed.some(variant => variant.price <= 0)) nextErrors.push('Todas as opções precisam de um preço maior que zero.');
    if (nextErrors.length) {
      setErrors(nextErrors);
      window.scrollTo({top: 0, behavior: 'smooth'});
      return;
    }
    let id = product?.id ?? slugify(name);
    if (isNew) {
      let suffix = 2;
      const base = id || 'produto';
      id = base;
      while (existingIds.includes(id)) id = `${base}-${suffix++}`;
    }
    onSave({
      ...(product ?? {}),
      id,
      name: name.trim(),
      category,
      size: size.trim(),
      subtitle: subtitle.trim(),
      description: description.trim(),
      image,
      variants: parsed,
      minQty: Math.max(1, parseInt(minQty, 10) || 1),
      step: Math.max(1, parseInt(step, 10) || 1),
      fields,
      includes: includes.trim() || undefined,
      notice: notice.trim() || undefined,
      active,
      featured,
      custom: product ? product.custom : true,
    });
  }

  const section = 'grid gap-5 rounded-md border border-line bg-surface p-5 sm:p-6';

  return (
    <form onSubmit={save} noValidate className="grid gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="grid gap-1">
          <button type="button" onClick={onCancel} className="inline-flex w-max cursor-pointer items-center gap-1.5 text-sm text-muted hover:text-ink">
            <ArrowLeft className="size-4" />
            Produtos
          </button>
          <h1 className="text-3xl">{isNew ? 'Novo produto' : `Editar ${product.name}`}</h1>
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={onCancel} className="cursor-pointer rounded-full border border-line px-5 py-2.5 font-medium text-ink hover:border-ink-soft">
            Cancelar
          </button>
          <button type="submit" className="cursor-pointer rounded-full bg-ink px-5 py-2.5 font-medium text-paper hover:opacity-90">
            {isNew ? 'Cadastrar produto' : 'Salvar alterações'}
          </button>
        </div>
      </div>

      {!!errors.length && (
        <div role="alert" className="rounded-md border border-danger/40 bg-blush-soft p-4 text-sm text-danger">
          {errors.map(error => (
            <p key={error}>{error.replace(/^Foto: /, '')}</p>
          ))}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <div className={`${section} content-start self-start`}>
          <h2 className="text-xl">Foto</h2>
          <label className="group relative grid aspect-[4/5] cursor-pointer place-items-center overflow-hidden rounded-[3px] border border-dashed border-sage bg-linen text-center text-sm text-muted">
            {image ? (
              <img src={image} alt="" className="absolute inset-0 size-full object-cover" />
            ) : (
              <span className="grid justify-items-center gap-2 p-6">
                <ImagePlus className="size-7" strokeWidth={1.4} />
                {uploading ? 'Processando…' : 'Clique para enviar uma foto'}
              </span>
            )}
            {image && (
              <span className="absolute inset-x-3 bottom-3 rounded-full bg-surface/90 px-3 py-1.5 text-center text-ink opacity-0 transition-opacity group-hover:opacity-100">
                Trocar foto
              </span>
            )}
            <input type="file" accept="image/*" className="sr-only" onChange={event => handleImage(event.target.files?.[0])} />
          </label>
          <p className="text-xs text-muted">A foto é reduzida automaticamente para carregar rápido no celular.</p>
          <div className="grid gap-3 border-t border-line pt-4">
            <Toggle checked={active} label="Disponível na loja" onChange={setActive} />
            <Toggle checked={featured} label="Mostrar nos destaques" onChange={setFeatured} />
          </div>
        </div>

        <div className="grid content-start gap-6">
          <div className={section}>
            <h2 className="text-xl">Informações</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <label htmlFor="ed-nome" className={labelClass}>Nome *</label>
                <input id="ed-nome" value={name} onChange={event => setName(event.target.value)} className={inputClass} placeholder="Ex.: Prato Memória" />
              </div>
              <div className="grid gap-1.5">
                <label htmlFor="ed-cat" className={labelClass}>Categoria</label>
                <select id="ed-cat" value={category} onChange={event => setCategory(event.target.value as Category)} className={inputClass}>
                  {categories.map(option => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className="grid gap-1.5">
                <label htmlFor="ed-tam" className={labelClass}>Medida ou formato</label>
                <input id="ed-tam" value={size} onChange={event => setSize(event.target.value)} className={inputClass} placeholder="Ex.: 19 cm" />
              </div>
              <div className="grid gap-1.5">
                <label htmlFor="ed-sub" className={labelClass}>Frase de apresentação</label>
                <input id="ed-sub" value={subtitle} onChange={event => setSubtitle(event.target.value)} className={inputClass} placeholder="Ex.: Uma lembrança feita para continuar presente." />
              </div>
            </div>
            <div className="grid gap-1.5">
              <label htmlFor="ed-desc" className={labelClass}>Descrição</label>
              <textarea id="ed-desc" value={description} onChange={event => setDescription(event.target.value)} className={`${inputClass} min-h-24 resize-y`} />
            </div>
          </div>

          <div className={section}>
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl">Opções e preços</h2>
              <button
                type="button"
                onClick={() => setVariants(current => [...current, {id: `opcao-${Date.now()}`, name: '', price: 0, priceText: ''}])}
                className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-ink underline decoration-blush underline-offset-4">
                <Plus className="size-4" />
                Adicionar opção
              </button>
            </div>
            <div className="grid gap-3">
              {variants.map((variant, index) => (
                <div key={variant.id} className="grid items-end gap-3 sm:grid-cols-[1fr_130px_auto_auto]">
                  <div className="grid gap-1.5">
                    <label htmlFor={`v-nome-${index}`} className="text-xs text-muted">Nome da opção</label>
                    <input id={`v-nome-${index}`} value={variant.name} onChange={event => updateVariant(index, {name: event.target.value})} className={inputClass} placeholder="Ex.: Pintura à mão" />
                  </div>
                  <div className="grid gap-1.5">
                    <label htmlFor={`v-preco-${index}`} className="text-xs text-muted">Preço (R$)</label>
                    <input id={`v-preco-${index}`} inputMode="decimal" value={variant.priceText} onChange={event => updateVariant(index, {priceText: event.target.value})} className={inputClass} placeholder="0,00" />
                  </div>
                  <label className="flex cursor-pointer items-center gap-2 pb-3 text-sm">
                    <input type="checkbox" checked={Boolean(variant.priceFrom)} onChange={event => updateVariant(index, {priceFrom: event.target.checked})} className="accent-ink" />
                    “a partir de”
                  </label>
                  <button
                    type="button"
                    disabled={variants.length === 1}
                    onClick={() => setVariants(current => current.filter((_, i) => i !== index))}
                    aria-label="Remover opção"
                    className="mb-1 grid size-10 cursor-pointer place-items-center rounded-full text-muted hover:bg-linen hover:text-danger disabled:cursor-not-allowed disabled:opacity-30">
                    <Trash2 className="size-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="grid gap-4 border-t border-line pt-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <label htmlFor="ed-min" className={labelClass}>Pedido mínimo</label>
                <input id="ed-min" inputMode="numeric" value={minQty} onChange={event => setMinQty(event.target.value)} className={inputClass} />
              </div>
              <div className="grid gap-1.5">
                <label htmlFor="ed-step" className={labelClass}>Vender de quantas em quantas</label>
                <input id="ed-step" inputMode="numeric" value={step} onChange={event => setStep(event.target.value)} className={inputClass} />
              </div>
            </div>
          </div>

          <div className={section}>
            <div className="grid gap-1">
              <h2 className="text-xl">Personalização</h2>
              <p className="text-sm text-muted">Escolha o que a cliente preenche ao montar o pedido. Essas respostas vão para a mensagem do WhatsApp.</p>
            </div>
            <div className="grid gap-2">
              {fieldPresets.map(preset => {
                const selected = fields.find(field => field.id === preset.id);
                return (
                  <div key={preset.id} className={`flex flex-wrap items-center justify-between gap-3 rounded-[4px] border px-4 py-3 ${selected ? 'border-ink-soft' : 'border-line'}`}>
                    <label className="flex cursor-pointer items-center gap-3 text-[0.95rem] text-ink">
                      <input type="checkbox" checked={Boolean(selected)} onChange={() => toggleField(preset.id)} className="accent-ink" />
                      {selected?.label ?? preset.label}
                    </label>
                    {selected && (
                      <label className="flex cursor-pointer items-center gap-2 text-sm text-muted">
                        <input type="checkbox" checked={Boolean(selected.required)} onChange={() => toggleRequired(preset.id)} className="accent-ink" />
                        Obrigatório
                      </label>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className={section}>
            <h2 className="text-xl">Avisos na página</h2>
            <div className="grid gap-1.5">
              <label htmlFor="ed-inclui" className={labelClass}>O que acompanha</label>
              <input id="ed-inclui" value={includes} onChange={event => setIncludes(event.target.value)} className={inputClass} placeholder="Ex.: Acompanha suporte de acrílico." />
            </div>
            <div className="grid gap-1.5">
              <label htmlFor="ed-aviso" className={labelClass}>Aviso importante</label>
              <input id="ed-aviso" value={notice} onChange={event => setNotice(event.target.value)} className={inputClass} placeholder="Ex.: Para modelos religiosos, a arte segue as opções do atelier." />
            </div>
          </div>

          {product?.custom && onDelete && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => window.confirm(`Excluir ${product.name}? Essa ação não pode ser desfeita.`) && onDelete(product.id)}
                className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-danger hover:underline">
                <Trash2 className="size-4" />
                Excluir produto
              </button>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
