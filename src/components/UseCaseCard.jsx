const UseCaseCard = (props) => {
  return (
    <div className="border-2 border-black border-opacity-25 rounded-md p-6 min-w-[40rem] my-6 mr-12 bg-blue bg-opacity-10 drop-shadow-lg text-black">
      <p>Use Case {props.no}</p>
      <h2 className="opacity-75 mt-3">{props.title}</h2>
      <p>{props.desc}</p>
      <a href={props.link}><button className="border-black bg-white border-2 border-opacity-50 hover:bg-blue hover:text-white hover:border-blue my-3 font-bold">Read Use Case</button></a>
    </div>
  );
};

export default UseCaseCard;