import React from 'react';

interface IContainer {
  children: React.ReactNode;
  width?: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  height?: string;
  className?: string;
}
const Container: React.FC<IContainer> = ({ children, width, variant, height, className }) => {
  const color = {
    primary: 'bg-primary-regular',
    secondary: 'bg-secondary-regular ',
    tertiary: 'bg-tertiary-regular text-gray-700'
  };
  return (
    <div
      className={`${
        variant ? color[variant] : ''
      } ${className} h-screen-3/4 w-12/12 m-auto py-2 md:p-5 rounded-xl justify-center`}
      style={{ width, height }}
    >
      {children}
    </div>
  );
};

export default Container;
