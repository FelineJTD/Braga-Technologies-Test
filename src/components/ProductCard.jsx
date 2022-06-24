const ProductCard = (props) => {
  return (
    <div className="border-2 border-black border-opacity-25 rounded-md p-6 mr-12 mb-6 min-w-full md:min-w-0 md:w-[30rem] hover:drop-shadow-xl hover:-translate-y-2 bg-white bg-opacity-75 duration-200">
      <img src={props.image} alt={props.title} className="bg-black bg-opacity-50 rounded-md h-48 text-center text-white mb-6" />
      <p>{props.type}</p>
      <h2>{props.title}</h2>
      <p>{props.desc}</p>
    </div>
  );
};

export default ProductCard;