import Card from './Card';
const data = [1, 2, 3, 4, 5];

const CardContainer = () => {
  return (
    <div className="card-container grid md:gap-3 md:grid-cols-4">
      {data.map((item) => (
        <Card key={item.id} />
      ))}
    </div>
  );
};

export default CardContainer;
