interface Props {
  checked: boolean;
  label: string;
  onChange: (value: boolean) => void;
}

export function Toggle({checked, label, onChange}: Props) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="inline-flex cursor-pointer items-center gap-2.5 text-sm text-ink">
      <span className={`relative h-6 w-10 rounded-full transition-colors ${checked ? 'bg-ink' : 'bg-line'}`}>
        <span className={`absolute top-1 size-4 rounded-full bg-paper transition-[left] ${checked ? 'left-5' : 'left-1'}`} />
      </span>
      {label}
    </button>
  );
}
