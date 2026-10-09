import {Accordion} from '../components/Accordion';
import {SectionHeading} from '../components/SectionHeading';
import {WhatsAppIcon} from '../components/WhatsAppIcon';
import {primaryButton, wrap} from '../components/layoutStyles';
import {careItems, deliveryInfo, faq, steps} from '../data/content';
import type {Route} from '../types';
import {whatsappUrl} from '../utils/whatsapp';

interface Props {
  section?: string;
  onNavigate: (route: Route) => void;
}

const sections = [
  {id: 'passo-a-passo', label: 'Passo a passo'},
  {id: 'pagamento', label: 'Pagamento e entrega'},
  {id: 'cuidados', label: 'Cuidados'},
  {id: 'duvidas', label: 'Dúvidas'},
];

const anchor = 'scroll-mt-16';

export function InfoScreen({section, onNavigate}: Props) {
  return (
    <main className="pb-16 md:pb-24">
      <div className={`${wrap} pt-7 md:pt-12`}>
        <h1 className="text-[clamp(1.8rem,3.6vw,2.6rem)] leading-tight">Como encomendar</h1>
        <p className="mt-2 max-w-[56ch] text-[1.02rem] text-muted">
          Cada peça é produzida sob encomenda, com agenda de produção. Quanto antes você pedir, mais tranquilo fica.
        </p>
      </div>

      <div className="sticky top-[calc(env(safe-area-inset-top,0px)+60px)] z-30 mt-5 border-b border-line bg-paper/95 backdrop-blur-md md:top-[calc(env(safe-area-inset-top,0px)+68px)] md:mt-8">
        <nav aria-label="Nesta página" className={`${wrap} scrollbar-none flex gap-2 overflow-x-auto py-3`}>
          {sections.map(item => (
            <button
              key={item.id}
              aria-current={item.id === section ? 'location' : undefined}
              onClick={() => onNavigate({page: 'info', section: item.id})}
              className="shrink-0 cursor-pointer whitespace-nowrap rounded-full border border-line px-4 py-2 text-[0.92rem] text-muted aria-[current=location]:border-ink aria-[current=location]:text-ink">
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <section id="passo-a-passo" className={`${anchor} py-10 md:py-16`}>
        <div className={wrap}>
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {steps.map((step, index) => (
              <li key={step.title} className="grid grid-cols-[2.5rem_1fr] gap-x-3 border-t border-sage pt-4 sm:grid-cols-1 sm:gap-2.5 sm:pt-5">
                <span className="row-span-2 font-serif text-3xl leading-none text-rosewood sm:row-span-1 sm:text-4xl">{index + 1}</span>
                <h2 className="text-[1.15rem] sm:text-xl">{step.title}</h2>
                <p className="text-[0.97rem] text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="pagamento" className={`${anchor} bg-linen py-10 md:py-16`}>
        <div className={wrap}>
          <SectionHeading title="Pagamento e entrega" />
          <div className="grid gap-6 md:grid-cols-3 md:gap-10">
            {deliveryInfo.map(info => (
              <div key={info.title} className="grid content-start gap-1.5">
                <h3 className="text-[1.15rem]">{info.title}</h3>
                <p className="text-[0.98rem] text-muted">{info.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="cuidados" className={`${anchor} py-10 md:py-16`}>
        <div className={`${wrap} grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16`}>
          <SectionHeading title="Cuidados com sua peça" text="Alguns cuidados simples preservam a personalização por muito mais tempo." />
          <div>
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
            <p className="mt-4 text-[0.95rem] font-medium text-ink">
              Pequenas particularidades fazem parte dos processos artesanais e tornam cada peça única.
            </p>
          </div>
        </div>
      </section>

      <section id="duvidas" className={`${anchor} border-t border-line py-10 md:py-16`}>
        <div className={`${wrap} grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16`}>
          <SectionHeading title="Dúvidas frequentes" text="Não encontrou o que procura? Fale com a gente no WhatsApp." />
          <div>
            {faq.map(item => (
              <Accordion key={item.q} title={item.q}>
                <p>{item.a}</p>
              </Accordion>
            ))}
          </div>
        </div>
      </section>

      <div className={`${wrap} grid gap-3 sm:flex sm:justify-center`}>
        <button onClick={() => onNavigate({page: 'catalog'})} className={primaryButton}>
          Montar meu pedido
        </button>
        <a href={whatsappUrl()} target="_blank" rel="noopener" className="inline-flex items-center justify-center gap-2 rounded-full border border-sage px-6 py-3.5 font-medium text-ink hover:border-ink">
          <WhatsAppIcon />
          Tirar uma dúvida
        </a>
      </div>
    </main>
  );
}
