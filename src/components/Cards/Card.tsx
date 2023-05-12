import Image from 'next/image';

import { FC } from 'react';

interface CardProps {
  price: number;
  title: string;
  imageSrc: string;
  key: string;
}

const Card: FC<CardProps> = ({ price, title, imageSrc, key }) => {
  console.log(imageSrc);
  return (
    <div
      key={key}
      className="border rounded-2xl p-[8px] flex flex-col overflow-hidden border-secondary-dark relative h-[240px] group transition-transform transform  duration-500"
    >
      <div className="h-2/3 w-full relative">
        <Image
          fill
          src={imageSrc}
          alt={title}
          className="relative object-cover rounded-t-2xl"
          quality={20}
          loading="lazy"
        />
      </div>
      <div className=" text-gray-400 text-lg px-6  justify-between py-4  rounded-b-2xl">
        <p>{title}</p>
        <div className="">
          <p className="font-bold text-[#44e1a4] ">
            {price} <span className="text-xs">SOL</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
