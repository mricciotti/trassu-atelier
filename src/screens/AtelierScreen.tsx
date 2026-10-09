import {SectionHeading} from '../components/SectionHeading';
import {primaryButton, sectionTitle, wrap} from '../components/layoutStyles';
import {gallery, images, story} from '../data/content';
import type {Route} from '../types';

interface Props {
  onNavigate: (route: Route) => void;
}

export function AtelierScreen({onNavigate}: Props) {
  return (
    <main>
      <section className="py-10 md:py-20">
        <div className={`${wrap} grid items-center gap-8 md:grid-cols-[1.1fr_0.9fr] md:gap-16`}>
          <div className="grid max-w-[54ch] gap-4 text-[1.04rem] md:gap-5 md:text-[1.1rem]">
            <h1 className="text-[clamp(2rem,4vw,3rem)] leading-tight">A Trassu Atelier</h1>
            {story.intro.map(paragraph => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <blockquote className="mt-1 border-l-2 border-blush pl-4 font-serif text-[1.25rem] italic leading-snug text-ink md:text-[1.4rem]">
              {story.quote}
            </blockquote>
          </div>
          <figure className="aspect-[4/3] overflow-hidden rounded-[3px] md:aspect-[3/4]">
            <img src={images.igreja} alt="Prato ilustrado com uma capela e as iniciais A e L" className="size-full object-cover" />
          </figure>
        </div>
      </section>

      <section className="bg-linen py-12 md:py-20">
        <div className={`${wrap} grid items-center gap-8 md:grid-cols-[0.9fr_1.1fr] md:gap-16`}>
          <figure className="aspect-[4/3] overflow-hidden rounded-[3px] md:aspect-[4/5]">
            <img src={images.hero} alt="Biscoito em glacê real com Exu e Iansã, ao lado de um prato ilustrado" loading="lazy" className="size-full object-cover" />
          </figure>
          <div className="grid max-w-[54ch] gap-4 text-[1.04rem] md:gap-5 md:text-[1.1rem]">
            <h2 className={sectionTitle}>Fé representada com respeito</h2>
            {story.origin.map(paragraph => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className={wrap}>
          <SectionHeading title="Do atelier para quem recebe" text="Algumas peças que já saíram daqui para celebrar fé, encontros e pessoas queridas." />
          <div className="grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[200px] md:auto-rows-[220px] md:grid-cols-4 md:gap-4">
            {gallery.map((photo, index) => (
              <figure key={photo.src} className={`overflow-hidden rounded-[3px] ${index === 0 || index === 3 ? 'row-span-2' : ''}`}>
                <img src={photo.src} alt={photo.alt} loading="lazy" className="size-full object-cover" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blush-soft py-12 text-center md:py-20">
        <div className={`${wrap} grid justify-items-center gap-4`}>
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)]">Mais do que presentes</h2>
          <p className="max-w-[48ch] text-muted">
            Cada criação leva um pouco de quem escolhe e é pensada especialmente para quem vai receber.
          </p>
          <button onClick={() => onNavigate({page: 'catalog'})} className={`${primaryButton} mt-2 w-full sm:w-auto`}>
            Ver catálogo
          </button>
        </div>
      </section>
    </main>
  );
}
