import React, { useState, useEffect } from 'react';
import { getSortedResults } from './results-utils';
import AveragePrice from './AveragePrice';
import CommonWords from './CommonWords';
import SearchBar from './SearchBar';

export default () => {
  const [results, setResults] = useState<HTMLElement[]>([]);

  useEffect(() => {
    setResults(getSortedResults());
  }, []);

  return (
    <div className="mb-4 flex flex-col gap-2">
      <AveragePrice results={results} />
      <CommonWords results={results} />
      <SearchBar results={results} />
    </div>
  );
};
