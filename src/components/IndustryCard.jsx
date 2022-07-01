const IndustryCard = (props) => {
  return (
    <div className="border-2 border-black border-opacity-25 rounded-md p-3 mx-3 text-center bg-white bg-opacity-75 drop-shadow-md">
      <lord-icon trigger="hover" src={props.icon} />
      <p>{props.title}</p>
    </div>
  );
};

export default IndustryCard;