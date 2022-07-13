// Fade when scrolled: https://dev.to/selbekk/how-to-fade-in-content-as-it-scrolls-into-view-10j4
// with modifications

// import React from "react";
import { useEffect, useRef, useState } from "react";
import "./FadeInSection.css";

const FadeInSection = (props) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setVisible(entry.isIntersecting));
    });
    observer.observe(domRef.current);

    // on unmount
    return () => observer.unobserve(domRef.current);
  });

  return (
    <div
      className={`fade-in-section ${isVisible ? "is-visible" : ""} ${props.className? props.className : ""}`}
      ref={domRef}
    >
      {props.children}
    </div>
  );
};

export default FadeInSection;