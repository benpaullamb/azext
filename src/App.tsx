import React, { useState, useEffect } from 'react';
import { getSortedResults, updateResults } from './results-utils';
import AveragePrice from './AveragePrice';

export default () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<HTMLElement[]>([]);

  useEffect(() => {
    setResults(getSortedResults());
  }, []);

  const onSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;

    const filteredResults = results.filter(({ title }: HTMLElement) => {
      const searchRegex = new RegExp((search as string).toLowerCase().trim(), 'ims');
      return searchRegex.test(title.toLowerCase().trim());
    });

    updateResults(results, filteredResults);
  };

  return (
    <div>
      <AveragePrice results={results} />

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={onSubmit}
        className="w-full px-2 py-1 mb-4 border border-[#BBBFBF] rounded"
        placeholder="Search..."
      />
    </div>
  );
};
