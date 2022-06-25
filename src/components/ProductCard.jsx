import { useState } from "react";

const ProductCard = (props) => {
  let [mouseEnter, setMouseEnter] = useState(false);
  const toggleMouseEnter = () => {
    setMouseEnter(!mouseEnter);
  };

  return (
    <div className="border-2 border-black border-opacity-25 rounded-md p-6 mr-12 mb-6 min-w-full md:min-w-0 md:w-[30rem] hover:drop-shadow-xl hover:-translate-y-2 bg-white bg-opacity-75 duration-200" onMouseEnter={toggleMouseEnter} onMouseLeave={toggleMouseEnter}>
      <div className="w-full h-48 overflow-hidden border-black border-opacity-50 border-2 rounded-md mb-6">
        <img src={props.image} alt={props.title} className={`w-full object-cover bg-black bg-opacity-50 h-full text-center text-white duration-500 ${mouseEnter? "scale-105" : ""}`} />
      </div>
      <p>{props.type}</p>
      <h2 className="text-blue">{props.title}</h2>
      <p>{props.desc}</p>
    </div>
  );
};

export default ProductCard;