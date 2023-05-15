'use client';
import React, { useState, useEffect, useMemo, CSSProperties } from 'react';
import { AutoSizer, Grid } from 'react-virtualized';
import Card from './Card';
import SearchBar from '../Search/SearchBar';

const PAGE_SIZE = 20;
interface CardContainerVirtualizedProps {}
interface CellRendererParams {
  columnIndex: number;
  key: string;
  rowIndex: number;
  style: CSSProperties;
}

interface ScrollParams {
  clientHeight: number;
  scrollHeight: number;
  scrollTop: number;
}

interface NFT {
  title: string;
  price: string | number;
  img: string;
}

interface CellRendererProps {
  columnIndex: number;
  key: string;
  rowIndex: number;
  style: CSSProperties;
  nfts: NFT[];
}

const cellRenderer = ({ columnIndex, key, rowIndex, style, nfts }: CellRendererProps) => {
  const index = rowIndex * 4 + columnIndex;
  if (index >= nfts.length || !nfts[index]) {
    return null;
  }

  const { title, price, img } = nfts[index];

  return (
    <div key={key} style={style}>
      <Card price={price} title={title} imageSrc={img} />
    </div>
  );
};

const CardContainerVirtualized: React.FC<CardContainerVirtualizedProps> = () => {
  const [nfts, setNfts] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const fetchNfts = async () => {
      try {
        const response = await fetch(
          `https://api-mainnet.magiceden.io/idxv2/getListedNftsByCollectionSymbol?collectionSymbol=okay_bears&limit=${PAGE_SIZE}&offset=${offset}`,
          { mode: 'no-cors' }
        );
        const data = await response.json();
        setNfts((prevNfts) => [...prevNfts, ...data.results]);
      } catch (error) {
        console.error(error);
        console.log('Retrying API call...');
        fetchNfts();
      }
    };

    fetchNfts();
  }, [offset]);

  const filteredNfts = useMemo(() => {
    if (searchString === '') {
      return nfts;
    }

    return nfts.length > 0
      ? nfts.filter((nft) => nft.title.toLowerCase().includes(searchString.toLowerCase()))
      : [];
  }, [nfts, searchString]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);
  };

  const handleScroll = ({
    clientHeight,
    scrollHeight,
    scrollTop
  }: {
    clientHeight: number;
    scrollHeight: number;
    scrollTop: number;
  }) => {
    if (clientHeight + scrollTop >= scrollHeight) {
      setOffset((prevOffset) => prevOffset + PAGE_SIZE);
    }
  };

  return (
    <div style={{ height: '100vh' }}>
      <div className="fixed  rounded-xl z-50 top-20  ">
        <SearchBar value={searchString} onChange={handleSearch} placeholder="Search NFTs" />
      </div>
      <AutoSizer>
        {({ height, width }: { height: number; width: number }) => (
          <Grid
            columnCount={4}
            columnWidth={width / 4}
            height={height}
            rowCount={Math.ceil(filteredNfts.length / 4) || 1}
            rowHeight={300}
            width={width}
            onScroll={({ clientHeight, scrollHeight, scrollTop }: ScrollParams) =>
              handleScroll({ clientHeight, scrollHeight, scrollTop })
            }
            cellRenderer={({ columnIndex, key, rowIndex, style }: CellRendererParams) =>
              cellRenderer({ columnIndex, key, rowIndex, style, nfts: filteredNfts })
            }
          />
        )}
      </AutoSizer>
    </div>
  );
};

export default CardContainerVirtualized;
