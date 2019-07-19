import * as React from 'react';

type InputProps = {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
};

export function Input(props: InputProps) {
  const ref = React.useRef(null);

  return (
    <React.Fragment>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        id={props.id}
        ref={ref}
        onChange={() => props.onChange(ref.current.value)}
      />
    </React.Fragment>
  );
}
