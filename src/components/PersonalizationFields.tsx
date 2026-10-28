import {occasions} from '../data/fields';
import type {PersonalizationField} from '../types';
import {inputClass, labelClass} from './fieldStyles';

interface Props {
  fields: PersonalizationField[];
  values: Record<string, string>;
  themes: string[];
  invalid: string[];
  onChange: (id: string, value: string) => void;
}

export function PersonalizationFields({fields, values, themes, invalid, onChange}: Props) {
  return (
    <>
      <datalist id="temas">
        {themes.map(theme => (
          <option key={theme} value={theme} />
        ))}
      </datalist>
      {fields.map(field => {
        const id = `campo-${field.id}`;
        const value = values[field.id] ?? '';
        const error = invalid.includes(field.id);
        const className = `${inputClass} ${error ? 'border-danger' : ''}`;
        return (
          <div key={field.id} className="grid gap-1.5">
            <label htmlFor={id} className={labelClass}>
              {field.label}
              {field.required && <span className="text-rosewood"> *</span>}
            </label>
            {(field.type === 'occasion' || field.type === 'select') && (
              <select id={id} value={value} onChange={event => onChange(field.id, event.target.value)} className={className}>
                <option value="">Selecione</option>
                {(field.type === 'occasion' ? occasions : field.options ?? []).map(occasion => (
                  <option key={occasion}>{occasion}</option>
                ))}
              </select>
            )}
            {field.type === 'textarea' && (
              <textarea
                id={id}
                value={value}
                placeholder={field.placeholder}
                onChange={event => onChange(field.id, event.target.value)}
                className={`${className} min-h-22 resize-y`}
              />
            )}
            {(field.type === 'text' || field.type === 'theme') && (
              <input
                id={id}
                type="text"
                value={value}
                autoComplete="off"
                list={field.type === 'theme' ? 'temas' : undefined}
                placeholder={field.placeholder}
                onChange={event => onChange(field.id, event.target.value)}
                className={className}
              />
            )}
          </div>
        );
      })}
    </>
  );
}
