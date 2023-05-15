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

  const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < 20);
  const isRefreshing = isValidating && data && data.length === size;

  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current && containerRef.current.getBoundingClientRect().bottom <= window.innerHeight) {
        setSize(size + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setSize, size]);
  return (
    <>
      <div className="card-container grid md:gap-3 md:grid-cols-4" ref={containerRef}>
        {nfts.length > 0 &&
          nfts.map(({ results }) =>
            results.map((r) => <Card key={r.title} price={r.price} title={r.title} imageSrc={r.img} />)
          )}
      </div>
      {isLoadingMore ? (
        <div className="flex my-10 justify-center">
          <button
            type="button"
            className="flex items-center rounded-lg bg-tertiary-regular p-4  text-white"
            disabled
          >
            <svg
              className="mr-3 h-5 w-5 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span className="font-medium"> Loading ... </span>
          </button>
        </div>
      ) : null}
      {isReachingEnd ? (
        <div>
          <p className="text-white ">End of results</p>
        </div>
      ) : null}
    </>
  );
};

export default CardContainer;
