import {CatalogSection} from '../components/CatalogSection';
import {ProductCard} from '../components/ProductCard';
import {careItems, deliveryInfo, faq, gallery, heroPhotos, images, steps} from '../data/content';
import type {Product, Route} from '../types';

interface Props {
  products: Product[];
  onNavigate: (route: Route) => void;
}

const wrap = 'mx-auto w-[min(1180px,100%-2.5rem)]';

function Accordion({title, children, open}: {title: string; children: React.ReactNode; open?: boolean}) {
  return (
    <details open={open} className="group border-b border-line py-4 first:border-t">
      <summary className="flex cursor-pointer list-none justify-between gap-4 font-serif text-[1.12rem] text-ink [&::-webkit-details-marker]:hidden">
        {title}
        <span className="font-sans text-2xl font-light leading-none text-muted group-open:hidden">+</span>
        <span className="hidden font-sans text-2xl font-light leading-none text-muted group-open:inline">–</span>
      </summary>
      <div className="grid gap-2 pt-3 text-[0.99rem] text-muted">{children}</div>
    </details>
  );
}

export function HomeScreen({products, onNavigate}: Props) {
  const openProduct = (id: string) => onNavigate({page: 'product', id});
  const featured = products.filter(product => product.featured && product.active).slice(0, 3);

  return (
    <main>
      <section id="inicio" className="overflow-hidden bg-cover pt-9 text-cover-ink">
        <div className={`${wrap} grid justify-items-center text-center`}>
          <span className="font-serif tracking-[0.2em] text-cover-muted">2026</span>
          <img src={images.logo} alt="Trassu Atelier" className="mb-3 mt-1 w-[min(400px,82%)] mix-blend-multiply" />
          <h1 className="max-w-[21ch] text-[clamp(1.9rem,4.2vw,2.9rem)] leading-[1.15] text-cover-ink">
            Presentes que carregam a fé em cada detalhe.
          </h1>
          <p className="mt-4 max-w-[46ch] text-lg text-cover-muted">
            Porcelanas e biscoitos artesanais com arte autoral, feitos especialmente para quem você quer honrar.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button onClick={() => onNavigate({page: 'home', section: 'catalogo'})} className="cursor-pointer rounded-full bg-cover-ink px-6 py-3.5 font-medium text-cover hover:opacity-90">
              Ver catálogo
            </button>
            <button onClick={() => onNavigate({page: 'home', section: 'como-funciona'})} className="cursor-pointer rounded-full border border-[#bdbcb1] px-6 py-3.5 font-medium text-cover-ink hover:border-cover-ink">
              Como encomendar
            </button>
          </div>
          <div className="mt-11 grid w-full grid-cols-2 items-end gap-4 md:grid-cols-[1fr_1.25fr_1fr]">
            {heroPhotos.map((photo, index) => (
              <figure
                key={photo.src}
                className={`overflow-hidden rounded-t-[3px] ${index === 0 ? 'hidden h-[300px] md:block' : index === 1 ? 'h-[300px] md:h-[400px]' : 'h-[250px] md:h-[340px]'}`}>
                <img src={photo.src} alt={photo.alt} className="size-full object-cover" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-linen py-4 text-[0.95rem] text-muted">
        <ul className={`${wrap} flex flex-wrap justify-center gap-x-10 gap-y-2`}>
          {['Arte autoral, feita à mão', 'Retirada em Indaiatuba, motoboy na região e Correios para todo o Brasil', 'PIX ou cartão'].map(item => (
            <li key={item} className="flex items-center gap-2 before:size-1.5 before:rounded-full before:bg-rosewood/60">
              {item}
            </li>
          ))}
        </ul>
      </div>

      {featured.length > 0 && (
        <section className="pt-22">
          <div className={wrap}>
            <div className="mb-10 grid max-w-[60ch] gap-3">
              <h2 className="text-[clamp(1.8rem,3.4vw,2.5rem)]">Destaques do atelier</h2>
              <p className="text-[1.075rem] text-muted">Peças escolhidas pelo atelier para começar.</p>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-x-7 gap-y-10">
              {featured.map(product => (
                <ProductCard key={product.id} product={product} onOpen={openProduct} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CatalogSection products={products} onOpen={openProduct} />

      <section id="como-funciona" className="bg-linen py-22">
        <div className={wrap}>
          <div className="mb-10 grid max-w-[60ch] gap-3">
            <h2 className="text-[clamp(1.8rem,3.4vw,2.5rem)]">Como funciona a encomenda</h2>
            <p className="text-[1.075rem] text-muted">
              Cada peça é produzida sob encomenda, com agenda de produção. Quanto antes você pedir, mais tranquilo fica.
            </p>
          </div>
          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <li key={step.title} className="grid content-start gap-2.5 border-t border-sage pt-5">
                <span className="font-serif text-4xl leading-none text-rosewood">{index + 1}</span>
                <h3 className="text-xl">{step.title}</h3>
                <p className="text-[0.98rem] text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="sobre" className="py-22">
        <div className={`${wrap} grid items-center gap-10 md:grid-cols-[1fr_1.1fr] md:gap-18`}>
          <figure className="aspect-[4/3] overflow-hidden rounded-[3px] md:aspect-[4/5]">
            <img src={images.singelos} alt="Biscoitos singelos com Oxalá e Iemanjá pintados à mão" className="size-full object-cover" />
          </figure>
          <div className="grid max-w-[52ch] gap-5 text-[1.08rem]">
            <h2 className="text-[clamp(1.9rem,3.4vw,2.6rem)]">A Trassu Atelier</h2>
            <p>
              Acreditamos que um presente pode carregar muito mais do que aquilo que se vê. Foi desse olhar que nasceu a
              Trassu: um espaço onde porcelanas e biscoitos artesanais se transformam em presentes pensados para alguém.
            </p>
            <p>
              Fomos pioneiras no Brasil ao levar a estética afroreligiosa aos biscoitos decorados em glacê real, um trabalho
              que nasceu do desejo de representar a fé com beleza, delicadeza e respeito. Com o tempo vieram as porcelanas,
              com novos traços e possibilidades, e o mesmo cuidado em transformar significado em arte.
            </p>
            <blockquote className="mt-2 border-l-2 border-blush pl-5 font-serif text-[1.35rem] italic leading-snug text-ink">
              Porque alguns momentos passam. Outros merecem permanecer.
            </blockquote>
          </div>
        </div>
      </section>

      <section className="pb-22">
        <div className={wrap}>
          <div className="mb-10 grid max-w-[60ch] gap-3">
            <h2 className="text-[clamp(1.8rem,3.4vw,2.5rem)]">Do atelier para quem recebe</h2>
            <p className="text-[1.075rem] text-muted">Algumas peças que já saíram daqui para celebrar fé, encontros e pessoas queridas.</p>
          </div>
          <div className="grid auto-rows-[170px] grid-cols-2 gap-4 md:auto-rows-[220px] md:grid-cols-4">
            {gallery.map((photo, index) => (
              <figure key={photo.src} className={`overflow-hidden rounded-[3px] ${index === 0 || index === 3 ? 'row-span-2' : ''}`}>
                <img src={photo.src} alt={photo.alt} loading="lazy" className="size-full object-cover" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="cuidados" className="bg-linen py-22">
        <div className={`${wrap} grid gap-12 lg:grid-cols-2 lg:gap-16`}>
          <div>
            <div className="mb-8 grid gap-3">
              <h2 className="text-[clamp(1.8rem,3.4vw,2.5rem)]">Cuidados com sua peça</h2>
              <p className="text-[1.075rem] text-muted">Alguns cuidados simples preservam a personalização por muito mais tempo.</p>
            </div>
            {careItems.map((item, index) => (
              <Accordion key={item.title} title={item.title} open={index === 0}>
                {item.items ? (
                  <ul className="list-disc pl-5">
                    {item.items.map(line => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{item.text}</p>
                )}
              </Accordion>
            ))}
          </div>
          <div className="grid content-start gap-6">
            <h2 className="text-[clamp(1.8rem,3.4vw,2.5rem)]">Entrega e pagamento</h2>
            {deliveryInfo.map(info => (
              <div key={info.title} className="grid gap-1">
                <h3 className="text-[1.15rem]">{info.title}</h3>
                <p className="text-[0.99rem] text-muted">{info.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="duvidas" className="py-22">
        <div className={`${wrap} grid gap-10 lg:grid-cols-2 lg:gap-16`}>
          <div className="grid content-start gap-3">
            <h2 className="text-[clamp(1.8rem,3.4vw,2.5rem)]">Dúvidas frequentes</h2>
            <p className="text-[1.075rem] text-muted">Não encontrou o que procura? Fale com a gente no WhatsApp.</p>
          </div>
          <div>
            {faq.map(item => (
              <Accordion key={item.q} title={item.q}>
                <p>{item.a}</p>
              </Accordion>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blush-soft py-22 text-center">
        <div className={`${wrap} grid justify-items-center gap-4`}>
          <h2 className="text-[clamp(2rem,4vw,2.8rem)]">Já imaginou o seu?</h2>
          <p className="max-w-[44ch] text-muted">
            Conte pra gente o que você gostaria de criar. Cada criação leva um pouco de quem escolhe e é pensada para quem vai receber.
          </p>
          <button onClick={() => onNavigate({page: 'home', section: 'catalogo'})} className="mt-4 cursor-pointer rounded-full bg-ink px-6 py-3.5 font-medium text-paper hover:opacity-90">
            Montar meu pedido
          </button>
        </div>
      </section>
    </main>
  );
}
