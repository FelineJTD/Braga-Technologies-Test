import IndustryCard from "./IndustryCard";

const IndustryCarousel = (props) => {
  return (
    <div className="overflow-hidden relative">
      <div className={`${props.toRight?"animate-scrollLeft":"animate-scrollRight"} w-[150rem] md:w-[300vw] lg:w-[200%] flex overflow-hidden my-6 hover:[animation-play-state:paused]`}>
        <div className="flex w-1/2 justify-around">
          {props.content.map((item, index) => (
            <IndustryCard key={index} title={item} icon={props.icons[index]} />
          ))}
        </div>
        <div className="flex w-1/2 justify-around">
          {props.content.map((item, index) => (
            <IndustryCard key={index} title={item} icon={props.icons[index]} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default IndustryCarousel;