import {whatsappUrl} from '../utils/whatsapp';
import {WhatsAppIcon} from './WhatsAppIcon';

export function WhatsAppFab() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-[calc(env(safe-area-inset-bottom,0px)+5.75rem)] right-4 z-30 grid size-12 place-items-center rounded-full bg-whatsapp text-white shadow-[0_8px_24px_rgba(0,0,0,0.2)] lg:bottom-[calc(env(safe-area-inset-bottom,0px)+1.25rem)] lg:right-5 lg:size-14">
      <WhatsAppIcon className="size-6 lg:size-7" />
    </a>
  );
}
