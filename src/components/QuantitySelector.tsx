import {Minus, Plus} from 'lucide-react';

interface Props {
  value: number;
  min: number;
  step: number;
  onChange: (value: number) => void;
}

export function QuantitySelector({value, min, step, onChange}: Props) {
  return (
    <div className="flex w-max items-center rounded-full border border-line">
      <button
        type="button"
        aria-label="Diminuir"
        onClick={() => onChange(Math.max(min, value - step))}
        className="grid size-11 cursor-pointer place-items-center rounded-full hover:bg-linen">
        <Minus className="size-4" />
      </button>
      <input
        id="quantidade"
        type="number"
        inputMode="numeric"
        min={min}
        step={step}
        value={value}
        onChange={event => onChange(Number(event.target.value) || 0)}
        onBlur={() => onChange(Math.max(min, value))}
        className="w-16 bg-transparent text-center text-base font-normal text-ink outline-none"
      />
      <button
        type="button"
        aria-label="Aumentar"
        onClick={() => onChange(Math.max(min, value + step))}
        className="grid size-11 cursor-pointer place-items-center rounded-full hover:bg-linen">
        <Plus className="size-4" />
      </button>
    </div>
  );
}
