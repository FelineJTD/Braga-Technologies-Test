const UseCaseCard = (props) => {
  return (
    <div className="border-2 border-black border-opacity-25 rounded-md p-3 min-w-[50rem] my-6 mr-12">
      <p>Use Case {props.no}</p>
      <h2 className="opacity-75 mt-3">{props.title}</h2>
      <p>{props.desc}</p>
      <a href={props.link}><button className="border-black border-2 border-opacity-25 hover:bg-blue hover:text-white hover:border-blue my-3">Read Use Case</button></a>
    </div>
  );
};

export default UseCaseCard;