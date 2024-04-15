export interface Result {
  element: HTMLElement;
  rating: number;
  price: number;
  title: string;
}

export const getAmazonResults = (): Result[] => {
  const resultElements = Array.from(
    document.querySelectorAll<HTMLElement>('[data-component-type="s-search-result"]')
  );

  const visibleResults = resultElements.filter((result) => {
    const display = result.computedStyleMap().get('display')?.toString();
    return display !== 'none';
  });

  const results = visibleResults.map(getResult);

  return results.sort((a, b) => a.rating - b.rating);
};

export const setAmazonResults = (oldResults: Result[], newResults: Result[]) => {
  const resultsTitle = document.querySelector('[data-index="1"]');
  if (!resultsTitle) return;

  oldResults.forEach(({ element }) => element.remove());
  newResults.forEach(({ element }) => resultsTitle.after(element));
};

export const initAmazonResults = () => {
  const results = getAmazonResults();
  setAmazonResults([], results);
  return results;
};

const getResult = (resultElement: HTMLElement): Result => {
  return {
    element: resultElement,
    rating: getRating(resultElement),
    price: getPrice(resultElement),
    title: getTitle(resultElement),
  };
};

const getRating = (resultElement: HTMLElement): number => {
  const rating = resultElement.querySelector('[aria-label*="ratings"]');
  if (!rating) return 0;

  const ratingText = rating.ariaLabel?.replace(',', '').match(/\d+/gi)?.[0];
  return Number(ratingText);
};

const getPrice = (resultElement: HTMLElement): number => {
  const price = resultElement.querySelector('.a-price .a-offscreen');
  if (!price) return 0;

  return Number(price.textContent?.slice(1));
};

const getTitle = (resultElement: HTMLElement): string => {
  const title = resultElement.querySelector('[data-cy="title-recipe"]');
  if (!title) return '';

  return title.textContent || '';
};
