import Image from 'next/image';

const Card = ({ title, children }) => {
  return (
    <div className="border rounded-2xl p-[8px] flex flex-col overflow-hidden border-secondary-dark relative h-[240px] group cursor-pointer transition-transform transform hover:-translate-y-2 duration-500">
      <div className="h-2/3 w-full relative">
        <Image
          fill
          src="https://arweave.net/7QhZL8C-lAWmCFbQ9saAh3ythEhBFhv0YCzKpwFRR6c"
          alt="ok bears"
          className="relative object-cover rounded-t-2xl"
        />
      </div>
      <div className=" text-gray-400 text-lg px-6  justify-between py-4  rounded-b-2xl">
        <p className="">Okay Bears</p>
        <div className="">
          <p className="font-bold text-[#44e1a4] ">
            700 <span className="text-xs">SOL</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
