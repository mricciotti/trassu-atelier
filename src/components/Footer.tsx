import {brand} from '../data/content';
import type {Route} from '../types';
import {whatsappUrl} from '../utils/whatsapp';
import {BrandMark} from './BrandMark';

interface Props {
  onNavigate: (route: Route) => void;
}

export function Footer({onNavigate}: Props) {
  const go = (route: Route) => () => onNavigate(route);
  const link = 'cursor-pointer py-1 text-left hover:text-ink hover:underline';

  return (
    <footer className="border-t border-line pb-28 pt-12 text-[0.95rem] text-muted lg:pb-10 lg:pt-14">
      <div className="mx-auto grid w-[min(1180px,100%-2.5rem)] grid-cols-2 gap-8 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div className="col-span-2 grid content-start gap-4 lg:col-span-1">
          <BrandMark onClick={go({page: 'home'})} />
          <p className="max-w-[32ch]">Porcelanas e biscoitos artesanais para celebrar fé, encontros e pessoas queridas.</p>
        </div>
        <div>
          <h3 className="mb-2 font-sans text-[0.95rem] font-semibold">Loja</h3>
          <ul className="grid gap-1">
            <li><button className={link} onClick={go({page: 'catalog'})}>Catálogo</button></li>
            <li><button className={link} onClick={go({page: 'catalog', category: 'presentes'})}>Para presentear</button></li>
            <li><button className={link} onClick={go({page: 'info'})}>Como encomendar</button></li>
            <li><button className={link} onClick={go({page: 'info', section: 'duvidas'})}>Dúvidas</button></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-2 font-sans text-[0.95rem] font-semibold">Atelier</h3>
          <ul className="grid gap-1">
            <li><button className={link} onClick={go({page: 'atelier'})}>Nossa história</button></li>
            <li><button className={link} onClick={go({page: 'info', section: 'cuidados'})}>Cuidados com a peça</button></li>
            <li><button className={link} onClick={go({page: 'admin'})}>Painel da loja</button></li>
          </ul>
        </div>
        <div className="col-span-2 lg:col-span-1">
          <h3 className="mb-2 font-sans text-[0.95rem] font-semibold">Contato</h3>
          <ul className="grid gap-1">
            <li><a className={link} href={whatsappUrl()} target="_blank" rel="noopener">WhatsApp {brand.whatsappLabel}</a></li>
            <li><a className={link} href={`https://instagram.com/${brand.instagram}`} target="_blank" rel="noopener">Instagram @{brand.instagram}</a></li>
            <li className="py-1">{brand.city}</li>
          </ul>
        </div>
        <p className="col-span-full mt-2 border-t border-line pt-6 text-sm">
          © 2026 Trassu Atelier. Pagamento por PIX ou cartão via Infinity Pay.
        </p>
      </div>
    </footer>
  );
}
