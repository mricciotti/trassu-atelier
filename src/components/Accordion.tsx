interface Props {
  title: string;
  children: React.ReactNode;
  open?: boolean;
}

export function Accordion({title, children, open}: Props) {
  return (
    <details open={open} className="group border-b border-line first:border-t">
      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 font-serif text-[1.08rem] text-ink [&::-webkit-details-marker]:hidden">
        {title}
        <span className="font-sans text-2xl font-light leading-none text-muted group-open:hidden">+</span>
        <span className="hidden font-sans text-2xl font-light leading-none text-muted group-open:inline">–</span>
      </summary>
      <div className="grid gap-2 pb-4 text-[0.99rem] text-muted">{children}</div>
    </details>
  );
}
