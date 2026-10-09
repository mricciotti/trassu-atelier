import {ArrowRight} from 'lucide-react';
import {ProductCard} from '../components/ProductCard';
import {SectionHeading} from '../components/SectionHeading';
import {WhatsAppIcon} from '../components/WhatsAppIcon';
import {sectionTitle, textLink, wrap} from '../components/layoutStyles';
import {categories, categoryDetails} from '../data/catalog';
import {highlights, images, story} from '../data/content';
import type {Product, Route} from '../types';
import {minPrice} from '../utils/adminCatalog';
import {formatCurrency} from '../utils/format';
import {whatsappUrl} from '../utils/whatsapp';

interface Props {
  products: Product[];
  onNavigate: (route: Route) => void;
}

export function HomeScreen({products, onNavigate}: Props) {
  const openProduct = (id: string) => onNavigate({page: 'product', id});
  const available = products.filter(product => product.active);
  const featured = available.filter(product => product.featured).slice(0, 3);
  const memory = available.find(product => product.id === 'prato-memoria');
  const exclusive = memory?.variants.filter(variant => variant.id.startsWith('exclusiva')) ?? [];

  const tiles = categories
    .map(category => ({category, ...categoryDetails[category], items: available.filter(product => product.category === category)}))
    .filter(tile => tile.items.length);

  return (
    <main>
      <section className="bg-cover text-cover-ink">
        <div className={`${wrap} grid items-center gap-7 pb-10 pt-6 md:grid-cols-[1.1fr_1fr] md:gap-12 md:py-14`}>
          <div className="grid justify-items-center text-center md:justify-items-start md:text-left">
            <img src={images.logo} alt="Trassu Atelier" className="w-[min(280px,72%)] mix-blend-multiply md:w-[340px]" />
            <h1 className="mt-2 max-w-[20ch] text-[clamp(1.75rem,4.2vw,2.9rem)] leading-[1.15] text-cover-ink">
              Presentes que carregam a fé em cada detalhe.
            </h1>
            <p className="mt-3 max-w-[44ch] text-[1.05rem] text-cover-muted md:mt-4 md:text-lg">
              Porcelanas e biscoitos artesanais com arte autoral, feitos especialmente para quem você quer honrar.
            </p>
            <div className="mt-6 grid w-full gap-3 sm:flex sm:w-auto sm:items-center sm:gap-6 md:mt-8">
              <button onClick={() => onNavigate({page: 'catalog'})} className="cursor-pointer rounded-full bg-cover-ink px-7 py-3.5 font-medium text-cover hover:opacity-90">
                Ver catálogo
              </button>
              <button onClick={() => onNavigate({page: 'info'})} className="cursor-pointer py-2 font-medium text-cover-ink underline decoration-[#e6c3c8] underline-offset-[5px]">
                Como encomendar
              </button>
            </div>
          </div>
          <figure className="aspect-[4/3] overflow-hidden rounded-[3px] md:aspect-[4/5] md:max-h-[560px]">
            <img src={images.hero} alt="Biscoito em glacê real com Exu e Iansã, ao lado de um prato ilustrado" className="size-full object-cover" />
          </figure>
        </div>
      </section>

      <div className="bg-linen py-3.5 text-[0.88rem] text-muted md:text-[0.95rem]">
        <ul className={`${wrap} flex flex-wrap justify-center gap-x-6 gap-y-1.5 md:gap-x-10`}>
          {highlights.map(item => (
            <li key={item} className="flex items-center gap-2 before:size-1.5 before:rounded-full before:bg-rosewood/60">
              {item}
            </li>
          ))}
        </ul>
      </div>

      <section className="py-12 md:py-20">
        <div className={wrap}>
          <SectionHeading title="Escolha seu presente" text="Diferentes formas de transformar uma ideia em algo feito especialmente para alguém." />
          <ul className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
            {tiles.map(tile => (
              <li key={tile.category}>
                <button onClick={() => onNavigate({page: 'catalog', category: tile.slug})} className="group grid w-full cursor-pointer gap-2.5 text-left">
                  <div className="aspect-square overflow-hidden rounded-[3px] bg-linen lg:aspect-[4/5]">
                    <img src={tile.image} alt="" loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                  </div>
                  <div className="grid gap-0.5">
                    <h3 className="flex items-center gap-1.5 text-[1.1rem] leading-snug md:text-[1.3rem]">
                      {tile.category}
                      <ArrowRight className="size-4 text-muted transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} />
                    </h3>
                    <span className="text-[0.85rem] text-muted md:text-[0.95rem]">
                      A partir de {formatCurrency(Math.min(...tile.items.map(minPrice)))}
                    </span>
                    <p className="hidden text-[0.95rem] text-muted md:block">{tile.text}</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="pb-12 md:pb-20">
          <div className={wrap}>
            <SectionHeading
              title="Destaques do atelier"
              text="Peças escolhidas pelo atelier para começar."
              action={
                <button onClick={() => onNavigate({page: 'catalog'})} className={textLink}>
                  Ver catálogo completo
                  <ArrowRight className="size-4" strokeWidth={1.5} />
                </button>
              }
            />
            <ul className="scrollbar-none -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-7 lg:overflow-visible lg:px-0">
              {featured.map(product => (
                <li key={product.id} className="w-[68%] shrink-0 snap-start sm:w-[42%] lg:w-auto">
                  <ProductCard product={product} onOpen={openProduct} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="bg-linen py-12 md:py-20">
        <div className={`${wrap} grid items-center gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16`}>
          <figure className="hidden aspect-[3/4] overflow-hidden rounded-[3px] md:block">
            <img src={images.igreja} alt="Prato ilustrado com uma capela e as iniciais A e L" loading="lazy" className="size-full object-cover" />
          </figure>
          <div className="grid max-w-[52ch] gap-4 md:gap-5">
            <h2 className={sectionTitle}>A Trassu Atelier</h2>
            <p className="text-[1.02rem] md:text-[1.08rem]">{story.teaser}</p>
            <blockquote className="border-l-2 border-blush pl-4 font-serif text-[1.2rem] italic leading-snug text-ink md:text-[1.35rem]">
              {story.quote}
            </blockquote>
            <button onClick={() => onNavigate({page: 'atelier'})} className={`${textLink} mt-1 w-max`}>
              Conheça nossa história
              <ArrowRight className="size-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </section>

      {memory && exclusive.length > 0 && (
        <section className="py-12 md:py-20">
          <div className={wrap}>
            <div className="grid overflow-hidden rounded-[4px] bg-ink text-paper md:grid-cols-2">
              <figure className="aspect-[16/10] md:aspect-auto">
                <img src={images.exclusiva} alt="Prato com retrato de casal pintado à mão" loading="lazy" className="size-full object-cover" />
              </figure>
              <div className="grid content-center justify-items-start gap-4 p-6 md:p-12">
                <span className="text-[0.8rem] font-medium uppercase tracking-[0.18em] text-paper/70">Arte exclusiva</span>
                <h2 className="text-[clamp(1.6rem,3.2vw,2.4rem)] leading-tight text-paper">Uma criação pensada para a sua história.</h2>
                <p className="max-w-[44ch] text-paper/80">
                  Desenvolvida só para o seu pedido, a partir de uma fotografia, referência ou ideia. Em impressão em relevo ou pintura à mão.
                </p>
                <p className="text-paper/80">
                  A partir de <strong className="font-serif text-xl font-medium text-paper">{formatCurrency(Math.min(...exclusive.map(variant => variant.price)))}</strong>
                </p>
                <button onClick={() => openProduct(memory.id)} className="mt-2 w-full cursor-pointer rounded-full bg-paper px-6 py-3.5 font-medium text-ink hover:opacity-90 sm:w-auto">
                  Quero uma arte exclusiva
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="bg-blush-soft py-12 text-center md:py-20">
        <div className={`${wrap} grid justify-items-center gap-4`}>
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)]">Já imaginou o seu?</h2>
          <p className="max-w-[44ch] text-muted">Fale com a gente e conte o que você gostaria de criar.</p>
          <div className="mt-2 grid w-full gap-3 sm:flex sm:w-auto sm:items-center sm:gap-6">
            <a href={whatsappUrl()} target="_blank" rel="noopener" className="inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 font-medium text-white hover:brightness-95">
              <WhatsAppIcon />
              Falar no WhatsApp
            </a>
            <button onClick={() => onNavigate({page: 'info'})} className={`${textLink} justify-center py-2`}>
              Como encomendar
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
