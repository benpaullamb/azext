import React, { useState, useEffect } from 'react';
import { getSortedResults, updateResults } from './sort-results';

export default () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<HTMLElement[]>([]);

  useEffect(() => {
    setResults(getSortedResults());
  }, []);

  const onSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;

    const filteredResults = results.filter((result: HTMLElement) => {
      const productTitle = result.querySelector('[data-cy="title-recipe"]')?.textContent;
      const searchText = (search as string).toLowerCase().trim();
      return productTitle?.toLowerCase().trim().includes(searchText);
    });

    updateResults(results, filteredResults);
  };

  return (
    <input
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      onKeyDown={onSubmit}
      className="w-full px-2 py-1 mb-4 border border-[#BBBFBF] rounded"
      placeholder="Search..."
    />
  );
};
