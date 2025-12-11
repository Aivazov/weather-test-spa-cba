import React from 'react';
import SearchBar from './SearchBar';

type Props = {}

const Header = (props: Props) => {
  return (
    <header className="w-full max-w-3xl mx-auto p-4">
      <SearchBar />
    </header>
  );
};

export default Header;