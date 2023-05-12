'use client'; // this is a client component 👈🏽

import { useState } from 'react';

const SearchBar = () => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="flex-1 px-4 py-2 w-full h-14  text-white rounded-xl border-0 outline-none bg-secondary-dark"
        type="text"
        value={query}
        placeholder="Search an NFT"
        onChange={handleChange}
      />
    </form>
  );
};

export default SearchBar;
