const ProductCard = (props) => {
  return (
    <div className="border-2 border-black border-opacity-25 rounded-md p-3 mx-3 text-center">
      <p>{props.title}</p>
    </div>
  );
};

export default ProductCard;