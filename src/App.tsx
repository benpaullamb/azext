import React, { useState, useEffect } from 'react';
import { getSortedResults, updateResults } from './results-utils';
import AveragePrice from './components/AveragePrice';
import CommonWords from './components/CommonWords';
import SearchBar from './components/SearchBar';

export default () => {
  const [results, setResults] = useState<HTMLElement[]>([]);

  useEffect(() => {
    load();
  }, []);

  const load = () => {
    const newResults = getSortedResults();
    setResults(newResults);
    updateResults([], newResults);
  };

  return (
    <div id="azext">
      <div className="mb-4 flex flex-col gap-2">
        <AveragePrice results={results} />
        <CommonWords results={results} />
        <div className="flex gap-2 items-center">
          <SearchBar results={results} />
          <button onClick={load} className="px-4 py-1 border border-[#BBBFBF] rounded">
            Reload
          </button>
        </div>
      </div>
    </div>
  );
};
