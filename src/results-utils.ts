interface Result {
  element: HTMLElement;
  rating: number;
  price: number;
  title: string;
}

export const getSortedResults = (): Result[] => {
  const resultElements = Array.from(
    document.querySelectorAll<HTMLElement>('[data-component-type="s-search-result"]')
  );

  const visibleResultElements = resultElements.filter((result) => {
    const display = result.computedStyleMap().get('display')?.toString();
    return display !== 'none';
  });

  const results = visibleResultElements.map(getResult);

  return results.sort((a, b) => a.rating - b.rating);
};

const getResult = (resultElement: HTMLElement): Result => {
  const ratingElement = resultElement.querySelector('[aria-label*="out of 5 stars"]')
    ?.nextSibling as HTMLElement;
  const rating = Number(ratingElement.ariaLabel?.replace(',', ''));

  const priceText = resultElement.querySelector('span.a-price span.a-offscreen')?.textContent;
  const price = priceText ? Number(priceText.slice(1)) : 0;

  const title = resultElement.querySelector('[data-cy="title-recipe"]')?.textContent || '';

  return { element: resultElement, rating, price, title };
};

export const updateResults = (oldResults: Result[], newResults: Result[]) => {
  oldResults.forEach(({ element }) => element.remove());

  const resultsTitle = document.querySelector('[data-index="1"]');

  newResults.forEach(({ element }) => resultsTitle?.after(element));
};
