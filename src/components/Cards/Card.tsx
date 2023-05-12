const Card = ({ title, children }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-gray-200 text-gray-700 text-lg px-6 py-4">{title}</div>
      <div className="p-6">{children}</div>
    </div>
  );
};

export default Card;
