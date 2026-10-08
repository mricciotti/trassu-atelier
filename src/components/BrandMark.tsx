interface Props {
  onClick: () => void;
}

export function BrandMark({onClick}: Props) {
  return (
    <button onClick={onClick} className="flex cursor-pointer flex-col items-start leading-none text-ink" aria-label="Trassu Atelier, início">
      <span className="font-serif text-[1.3rem] tracking-[0.28em]">TRASSU</span>
      <span className="mt-1.5 pl-[0.15em] text-[0.58rem] tracking-[0.5em] text-muted">ATELIER</span>
    </button>
  );
}
