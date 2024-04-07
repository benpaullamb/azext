import React, { useMemo } from 'react';
import { Result } from '../results-utils';

interface Props {
  results: Result[];
}

export default ({ results }: Props) => {
  const averagePrice = useMemo(() => {
    const nonZeros = results.filter(({ price }) => price > 0);
    const sum = nonZeros.reduce((acc, { price }) => acc + price, 0);
    return (sum / nonZeros.length).toFixed(2);
  }, [results]);

  return (
    <span className="block text-base">
      Average Price: <span className="text-lg font-bold">£{averagePrice}</span>
    </span>
  );
};
