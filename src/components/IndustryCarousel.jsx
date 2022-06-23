import IndustryCard from "./IndustryCard";

const UseCaseCard = (props) => {
  return (
    <div className="overflow-hidden relative">
      <div className={`${props.toRight?"animate-scrollLeft":"animate-scrollRight"} w-[200%] flex overflow-hidden my-6 hover:[animation-play-state:paused]`}>
        <div className="flex w-1/2 justify-around">
          {props.content.map((item, index) => (
            <IndustryCard key={index} title={item} />
          ))}
        </div>
        <div className="flex w-1/2 justify-around">
          {props.content.map((item, index) => (
            <IndustryCard key={index} title={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UseCaseCard;