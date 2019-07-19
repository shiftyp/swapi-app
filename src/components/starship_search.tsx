import * as React from 'react';

import { Input } from './input';
import { useStarshipSearch } from '../hooks/search';
import { StarshipResult } from './starship_result';
import { ActionButton } from './action_button';

export function StarshipSearch() {
  const {
    term,
    items,
    nextTerm,
    search,
    nextPage,
    previousPage
  } = useStarshipSearch();

  return (
    <React.Fragment>
      <Input
        label="A search term:"
        id="term"
        value={term}
        onChange={nextTerm}
      />
      <button type="button" onClick={() => search(term)}>
        Search
      </button>
      <ol>
        {items.map((result, i) => (
          <li key={`result-${result.name}`}>
            <StarshipResult starship={result} />
          </li>
        ))}
      </ol>
      <div>
        <ActionButton action={previousPage} label="Previous Page" />
        <ActionButton action={nextPage} label="Next Page" />
      </div>
    </React.Fragment>
  );
}
