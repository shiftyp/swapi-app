import * as React from 'react';

export type ActionButtonProps = {
  action: () => void | null;
  label: string;
};

export function ActionButton({ action, label }: ActionButtonProps) {
  return (
    <button type="button" disabled={!action} onClick={() => action()}>
      {label}
    </button>
  );
}
