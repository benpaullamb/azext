import React, { useMemo } from 'react';
import { removeStopwords } from 'stopword';
import { Result } from '../results-utils';

interface Props {
  results: Result[];
}

export default ({ results }: Props) => {
  const commonWords = useMemo(() => {
    if (!results.length) return [];

    const words = results.reduce((acc, { title }) => {
      const titleWords = title
        .replace(/[^\w\s]/g, '')
        .toLowerCase()
        .trim()
        .split(' ')
        .filter((word) => !!word && word.length > 1);
      return [...acc, ...titleWords];
    }, [] as string[]);

    const mainWords = removeStopwords(words);

    const wordCounts = mainWords.reduce((acc, word) => {
      const count = acc.get(word) || 0;
      acc.set(word, count + 1);
      return acc;
    }, new Map<string, number>());

    const sortedWords = Array.from(wordCounts.entries())
      .sort(([_a, countA], [_b, countB]) => countB - countA)
      .slice(0, 20)
      .map(([word]) => word);

    return sortedWords;
  }, [results]);

  return (
    <div className="flex gap-1">
      {commonWords.map((word) => (
        <span
          key={word}
          className="px-2 py-1 border border-[#007185] rounded-full text-[#007185] text-sm font-bold">
          {word}
        </span>
      ))}
    </div>
  );
};
