import {brand} from '../data/content';
import type {Route} from '../types';
import {whatsappUrl} from '../utils/whatsapp';
import {BrandMark} from './BrandMark';

interface Props {
  onNavigate: (route: Route) => void;
}

export function Footer({onNavigate}: Props) {
  const go = (section: string) => () => onNavigate({page: 'home', section});
  const link = 'cursor-pointer text-left hover:text-ink hover:underline';

  return (
    <footer className="border-t border-line pb-10 pt-14 text-[0.95rem] text-muted">
      <div className="mx-auto grid w-[min(1180px,100%-2.5rem)] gap-8 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div className="grid content-start gap-4">
          <BrandMark onClick={() => onNavigate({page: 'home'})} />
          <p className="max-w-[32ch]">Porcelanas e biscoitos artesanais para celebrar fé, encontros e pessoas queridas.</p>
        </div>
        <div>
          <h3 className="mb-3 font-sans text-[0.95rem] font-semibold">Loja</h3>
          <ul className="grid gap-2">
            <li><button className={link} onClick={go('catalogo')}>Catálogo</button></li>
            <li><button className={link} onClick={go('como-funciona')}>Como encomendar</button></li>
            <li><button className={link} onClick={go('duvidas')}>Dúvidas</button></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 font-sans text-[0.95rem] font-semibold">Atelier</h3>
          <ul className="grid gap-2">
            <li><button className={link} onClick={go('sobre')}>Quem somos</button></li>
            <li><button className={link} onClick={go('cuidados')}>Cuidados com a peça</button></li>
            <li><button className={link} onClick={() => onNavigate({page: 'admin'})}>Painel da loja</button></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 font-sans text-[0.95rem] font-semibold">Contato</h3>
          <ul className="grid gap-2">
            <li><a className={link} href={whatsappUrl()} target="_blank" rel="noopener">WhatsApp {brand.whatsappLabel}</a></li>
            <li><a className={link} href={`https://instagram.com/${brand.instagram}`} target="_blank" rel="noopener">Instagram @{brand.instagram}</a></li>
            <li>{brand.city}</li>
          </ul>
        </div>
        <p className="col-span-full mt-4 border-t border-line pt-6 text-sm">
          © 2026 Trassu Atelier. Pagamento por PIX ou cartão via Infinity Pay.
        </p>
      </div>
    </footer>
  );
}
