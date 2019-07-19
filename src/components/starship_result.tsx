import * as React from 'react';

import { Starship } from '../types';

export type StarshipResultProps = {
  starship: Starship;
};

export function StarshipResult({ starship }: StarshipResultProps) {
  return (
    <table>
      <tbody>
        <tr>
          <td>Name:</td>
          <td>{starship.name}</td>
        </tr>
        <tr>
          <td>Model:</td>
          <td>{starship.model}</td>
        </tr>
      </tbody>
    </table>
  );
}
