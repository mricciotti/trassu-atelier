import {Plus, X} from 'lucide-react';
import {useState} from 'react';
import {inputClass} from '../fieldStyles';

interface Props {
  themes: string[];
  onChange: (themes: string[]) => void;
  onReset: () => void;
}

export function ThemesPanel({themes, onChange, onReset}: Props) {
  const [draft, setDraft] = useState('');

  function add(event: React.FormEvent) {
    event.preventDefault();
    const value = draft.trim();
    if (!value || themes.some(theme => theme.toLowerCase() === value.toLowerCase())) return;
    onChange([...themes, value]);
    setDraft('');
  }

  return (
    <div className="grid gap-6 rounded-md border border-line bg-surface p-5 sm:p-6">
      <div className="grid gap-1">
        <h2 className="text-xl">Orixás, entidades e temas</h2>
        <p className="max-w-[60ch] text-sm text-muted">
          Sugestões que aparecem quando a cliente escolhe a arte. Ela ainda pode digitar outro tema, que é confirmado no WhatsApp.
        </p>
      </div>
      <form onSubmit={add} className="flex max-w-xl gap-2">
        <label htmlFor="novo-tema" className="sr-only">Novo tema</label>
        <input id="novo-tema" value={draft} onChange={event => setDraft(event.target.value)} placeholder="Ex.: Logunedé" className={inputClass} />
        <button type="submit" className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full bg-ink px-5 font-medium text-paper hover:opacity-90">
          <Plus className="size-4" />
          Adicionar
        </button>
      </form>
      <ul className="flex flex-wrap gap-2">
        {themes.map(theme => (
          <li key={theme} className="inline-flex items-center gap-1 rounded-full border border-line bg-paper py-1.5 pl-4 pr-1.5 text-[0.95rem] text-ink">
            {theme}
            <button onClick={() => onChange(themes.filter(item => item !== theme))} aria-label={`Remover ${theme}`} className="grid size-6 cursor-pointer place-items-center rounded-full text-muted hover:bg-linen hover:text-danger">
              <X className="size-3.5" />
            </button>
          </li>
        ))}
      </ul>
      <button onClick={onReset} className="w-max cursor-pointer text-sm text-muted underline hover:text-ink">
        Restaurar lista original
      </button>
    </div>
  );
}
