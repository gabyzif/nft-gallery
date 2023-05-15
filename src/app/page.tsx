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
        <div>
          <button
            onClick={() => setVirtualized(!virtualized)}
            className={`flex justify-center items-center my-2 rounded-lg  ${
              virtualized ? 'bg-secondary-regular' : 'bg-primary-regular text-white'
            } w-full p-4 h-10`}
          >
            {virtualized ? 'Static Grid' : 'Virtualize Grid'}
          </button>
        </div>

        {virtualized ? <CardContainerVirtualized /> : <CardContainer />}
      </Container>
    </main>
  );
}
