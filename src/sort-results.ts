export default () => {
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

  const sortedResults = resultsWithRatings
    .sort((a, b) => a.rating - b.rating)
    .map(({ result }) => result);

  const resultsTitle = document.querySelector('[data-index="1"]');

  sortedResults.forEach((result) => resultsTitle?.after(result));
};
