import React from 'react';

const Header = function ({ title }: { title: string }) {
  return (
    <header>
      <h1>{title}</h1>
    </header>
  );
};

export default Header;
