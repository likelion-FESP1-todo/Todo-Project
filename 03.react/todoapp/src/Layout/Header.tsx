import React, { ReactNode } from 'react';

interface Props {
  title: string;
  className: string;
  children?: ReactNode;
}

const Header = function ({ title, className, children }: Props) {
  return (
    <header className={className}>
      <h1>{title}</h1>
      {children}
    </header>
  );
};

export default Header;
