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
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <div className="flex-auto flex flex-col gap-2">
            <AveragePrice results={results} />
            <CommonWords results={results} />
          </div>
          <div className="flex-initial">
            <button onClick={load} className="px-4 py-1 border border-[#BBBFBF] rounded">
              Reload
            </button>
          </div>
        </div>

        <SearchBar results={results} />
      </div>
    </div>
  );
};
