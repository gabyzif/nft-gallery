import { useState, useEffect } from 'react';
import { AutoSizer, Grid } from 'react-virtualized';
import Card from './Card';

const App = () => {
  const [nfts, setNfts] = useState([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const fetchNfts = async () => {
      const response = await fetch(
        `https://api-mainnet.magiceden.io/idxv2/getListedNftsByCollectionSymbol?collectionSymbol=okay_bears&limit=20&offset=${offset}`
      );
      const data = await response.json();
      setNfts((prevNfts) => [...prevNfts, ...data.results]);
    };
    fetchNfts();
  }, [offset]);

  const isSmallScreen = window.innerWidth < 768;

  const cellRenderer = ({ columnIndex, key, rowIndex, style }) => {
    const index = rowIndex * 4 + columnIndex;
    const nft = nfts[index];
    return (
      <div key={key} style={style} className="p-3">
        {nft && <Card price={nft.price} title={nft.name} imageSrc={nft.img} key={nft.id} />}
      </div>
    );
  };

  const handleOnScroll = ({ clientHeight, scrollHeight, scrollTop }) => {
    if (scrollHeight - (clientHeight + scrollTop) < 100) {
      setOffset((prevOffset) => prevOffset + 20);
    }
  };

  return (
    <div className="h-full  bg-violet-950">
      <AutoSizer>
        {({ height, width }) => (
          <Grid
            columnCount={isSmallScreen ? 1 : 4}
            columnWidth={isSmallScreen ? width : width / 4}
            height={height}
            rowCount={Math.ceil(nfts.length / 4)}
            rowHeight={270}
            width={width}
            cellRenderer={cellRenderer}
            onScroll={handleOnScroll}
          />
        )}
      </AutoSizer>
    </div>
  );
};

export default App;
