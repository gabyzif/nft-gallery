'use client'; // this is a client component 👈🏽

const SearchBar = ({
  value,
  onChange,
  placeholder
}: {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}) => {
  return (
    <input
      className="  flex-1 px-4 py-2 w-full h-14  text-white rounded-xl border-0 outline-none  bg-gray-700"
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default SearchBar;
