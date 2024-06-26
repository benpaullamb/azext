import React, { useState } from 'react';
import { Result, setAmazonResults } from '../results-utils';

interface Props {
  results: Result[];
}

export default ({ results }: Props) => {
  const [search, setSearch] = useState('');

  const onSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;

    const filteredResults = results.filter(({ title }: Result) => {
      const searchRegex = new RegExp((search as string).toLowerCase().trim(), 'ims');
      return searchRegex.test(title.toLowerCase().trim());
    });

    setAmazonResults(results, filteredResults);
  };

  return (
    <input
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      onKeyDown={onSubmit}
      className="w-full px-2 py-1 border border-[#BBBFBF] rounded"
      placeholder="Search..."
    />
  );
};
