'use client';
import { useEffect } from 'react';
import Card from './Card';
import useSWR from 'swr';

const CardContainer = () => {
  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR(`${process.env.API_URL}&limit=20&offset=0s`, fetcher);

  return (
    <div className="card-container grid md:gap-3 md:grid-cols-4">
      {!isLoading && data.results
        ? data.results.map((nft) => (
            <Card key={nft.name} price={nft.price} title={nft.title} imageSrc={nft.img} />
          ))
        : null}
    </div>
  );
};

export default CardContainer;
