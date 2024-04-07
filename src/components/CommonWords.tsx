import React, { useMemo } from 'react';
import { Result, getCommonWords } from '../results-utils';

interface Props {
  results: Result[];
}

export default ({ results }: Props) => {
  const commonWords = useMemo(() => getCommonWords(results), [results]);

  return (
    <div className="flex gap-1">
      {commonWords.map((word) => (
        <span key={word} className="px-2 py-1 border border-[#007185] rounded-full text-[#007185] text-sm font-bold">
          {word}
        </span>
      ))}
    </div>
  );
};
