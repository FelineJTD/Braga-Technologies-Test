const IndustryCard = (props) => {
  const pathToIcons = "/src/assets/images/icons/"
  return (
    <div className="border-2 border-black border-opacity-25 rounded-md p-3 mx-3 text-center">
      <lord-icon trigger="hover" src={pathToIcons + props.icon} />
      <p>{props.title}</p>
    </div>
  );
};

export default IndustryCard;