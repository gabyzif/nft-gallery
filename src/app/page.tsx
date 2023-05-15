'use client';
import Container from '@/components/Container/Container';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import CardContainer from '@/components/Cards/CardContainer';
import CardContainerVirtualized from '@/components/Cards/CardContainerVirtualized';
import { useState } from 'react';

const SearchBar = dynamic(() => import('../components/Search/SearchBar'), {
  ssr: false
});

export default function Home({ data }) {
  const [virtualized, setVirtualized] = useState(false);
  return (
    <main className="center">
      <Container width="90%">
        <div className="flex justify-between mb-4 py-4 bg-primary-dark/20 z-20 rounded-xl px-2">
          <button className="flex justify-center items-center rounded-lg bg-gray-100 dark:bg-secondary-dark w-14 h-14">
            <svg
              viewBox="0 0 44 45"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              className=" fill-white"
            >
              <path d="M30.45 13.53a11.925 11.925 0 0 0-9.72-3.464c-5.505.555-10.035 5.025-10.65 10.53-.825 7.275 4.8 13.41 11.896 13.41a11.97 11.97 0 0 0 10.815-6.84c.48-1.005-.24-2.16-1.35-2.16-.555 0-1.08.3-1.32.795a8.991 8.991 0 0 1-10.2 4.965c-3.33-.735-6.015-3.45-6.72-6.78a9.003 9.003 0 0 1 8.774-10.98c2.49 0 4.71 1.035 6.33 2.67l-2.264 2.265c-.945.945-.285 2.565 1.05 2.565h5.384c.825 0 1.5-.675 1.5-1.5V13.62c0-1.335-1.62-2.01-2.565-1.065l-.96.975Z"></path>
            </svg>
          </button>
          <div className="w-8/12">
            <SearchBar />
          </div>
        </div>
        <div>
          <button
            onClick={() => setVirtualized(!virtualized)}
            className="flex justify-center items-center rounded-lg text-white bg-primary-regular w-full p-4 h-10"
          >
            {virtualized ? 'Static Grid' : 'Virtualize Grid'}
          </button>
        </div>

        {virtualized ? <CardContainerVirtualized /> : <CardContainer />}
      </Container>
    </main>
  );
}
