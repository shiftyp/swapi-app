import * as React from 'react';
import { api, makePagedResult } from '../utils/api';
import { PagedResults } from '../types';

export function createSearch<T>(
  doSearch: (input: string) => Promise<PagedResults<T>>
) {
  return (
    initial: string = ''
  ): {
    term: string; // search term
    items: T[]; // search results
    nextTerm: (input: string) => void; // update term
    search: (input: string) => void; // do search,
    nextPage: () => void | null;
    previousPage: () => void | null;
  } => {
    const [term, nextTerm] = React.useState(initial);
    const [results, nextResults] = React.useState(
      makePagedResult<T>(
        {
          results: [] as T[],
          next: null
        },
        null,
        null
      )
    );
    const { items, next, prev } = results;

    const search = async (input: string) => {
      const results = await doSearch(input);
      nextResults(results);
    };

    const nextPage =
      next &&
      (async () => {
        const results = await next();
        nextResults(results);
      });

    const previousPage =
      prev &&
      (async () => {
        const results = await prev();
        nextResults(results);
      });

    return { term, items, nextTerm, search, nextPage, previousPage };
  };
}

export const useStarshipSearch = createSearch(async (input: string) => {
  return await api.starships.search(input);
});
