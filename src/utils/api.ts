import { Starship, PagedResults } from '../types';

const addBase = (path: string) =>
  `https://cors-anywhere.herokuapp.com/swapi.co/api/${path}`;

function connectApi<T, A extends any[]>(
  makeUrl: (...args: A) => string,
  processResult: (result: any, url: string) => T
): (...args: A) => Promise<T> {
  return async (...args: A) => {
    const url = makeUrl.apply(this, args);
    const results = await fetch(url).then(r => r.json());
    return processResult(results, url);
  };
}

function loop<T>(
  nextUrl: string | null,
  prevUrl: string | null
): () => Promise<PagedResults<T>> {
  return nextUrl
    ? connectApi(
        () => nextUrl,
        (result: any) => ({
          items: result.results as T[],
          next: loop<T>(result.next, nextUrl),
          prev: loop<T>(prevUrl, nextUrl)
        })
      )
    : null;
}

export function makePagedResult<T>(
  result: any,
  url: string | null,
  prevUrl: string | null
) {
  return {
    items: result.results as T[],
    next: loop<T>(result.next, url),
    prev: loop<T>(prevUrl, url)
  };
}

export const api = {
  starships: {
    search: connectApi(
      (term: string) => addBase(`starships?search=${encodeURIComponent(term)}`),
      (result, url) => makePagedResult<Starship>(result, url, null)
    ),
    get: connectApi(
      (id: number) => `starships/${id}`,
      (result: any) => result as Starship
    )
  }
};
