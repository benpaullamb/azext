import React, { useState, useEffect } from 'react';
import { initAmazonResults } from './results-utils';
import AveragePrice from './components/AveragePrice';
import CommonWords from './components/CommonWords';
import SearchBar from './components/SearchBar';

export default () => {
  const [results, setResults] = useState<HTMLElement[]>([]);

  useEffect(() => {
    load();
  }, []);

  const load = () => {
    setResults(initAmazonResults());
  };

  return (
    <div id="azext">
      <div className="mb-4 flex flex-col gap-2">
        <button onClick={load} className="w-fit px-4 py-1 border border-[#BBBFBF] rounded">
          Reload
        </button>
        <AveragePrice results={results} />
        <CommonWords results={results} />
        <SearchBar results={results} />
      </div>
    </div>
  );
};
