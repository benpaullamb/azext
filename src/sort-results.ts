export const getSortedResults = () => {
  const results = Array.from(
    document.querySelectorAll<HTMLElement>('[data-component-type="s-search-result"]')
  );

  const visibleResults = results.filter((result) => {
    const display = result.computedStyleMap().get('display')?.toString();
    return display !== 'none';
  });

  const resultsWithRatings = visibleResults.map((result) => {
    const ratingElement = result.querySelector('[aria-label*="out of 5 stars"]')
      ?.nextSibling as HTMLElement;
    const rating = Number(ratingElement.ariaLabel?.replace(',', ''));
    return { result, rating };
  });

  return resultsWithRatings.sort((a, b) => a.rating - b.rating).map(({ result }) => result);
};

export const updateResults = (oldResults: HTMLElement[], newResults: HTMLElement[]) => {
  oldResults.forEach((result) => result.remove());

  const resultsTitle = document.querySelector('[data-index="1"]');

  newResults.forEach((result) => resultsTitle?.after(result));
};
