/** A labelled input or select. Contract: contracts/field.md */
type Common = { id: string; label: string; hint?: string; error?: string; name?: string; required?: boolean };
export type FieldProps =
  | (Common & { type?: 'text' | 'email' | 'number' | 'date' | 'time' | 'tel'; defaultValue?: string; placeholder?: string; options?: never })
  | (Common & { options: string[]; defaultValue?: string; type?: never; placeholder?: never });

export function Field(props: FieldProps) {
  const { id, label, hint, error, name, required } = props;
  const described = error || hint ? `${id}-note` : undefined;
  return (
    <div className="field">
      <label className="field__label" htmlFor={id}>{label}</label>
      {props.options
        ? <select className="field__input" id={id} name={name} required={required} defaultValue={props.defaultValue} aria-describedby={described} aria-invalid={error ? true : undefined}>
            {props.options.map(o => <option key={o}>{o}</option>)}
          </select>
        : <input className="field__input" id={id} name={name} required={required} type={props.type ?? 'text'} defaultValue={props.defaultValue} placeholder={props.placeholder} aria-describedby={described} aria-invalid={error ? true : undefined} />}
      {error ? <p className="field__error" id={described}>{error}</p> : hint ? <p className="field__hint" id={described}>{hint}</p> : null}
    </div>
  );
}
