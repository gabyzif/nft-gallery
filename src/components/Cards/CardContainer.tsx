'use client';
import { useEffect, useRef } from 'react';
import Card from './Card';
import useSWRInfinite from 'swr/infinite';

const CardContainer = () => {
  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data, mutate, size, setSize, isValidating, isLoading } = useSWRInfinite(
    (index) => `${process.env.API_URL}&limit=20&offset=${index * 20}`,
    fetcher
  );
  const nfts = data ? [].concat(...data) : [];

  console.log(nfts);

  const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < 20);
  const isRefreshing = isValidating && data && data.length === size;

  const containerRef = useRef(null);

  return (
    <div className="card-container grid md:gap-3 md:grid-cols-4" ref={containerRef}>
      {nfts.length > 0 &&
        nfts.map(({ results }) =>
          results.map((r) => <Card key={r.name} price={r.price} title={r.title} imageSrc={r.img} />)
        )}

      {isLoadingMore && <div>Loading...</div>}
      {isReachingEnd && <div>End of results</div>}
      <button
        onClick={() => {
          setSize(5);
        }}
      >
        load issues
      </button>
    </div>
  );
};

export default CardContainer;
