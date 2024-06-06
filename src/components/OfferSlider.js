import React, { useEffect, useRef } from "react";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const OfferSlider = (props) => {
  const scrollItemRef = useRef(null);

  useEffect(() => {
    scrollItemRef.current = document.querySelector(`.${props.className}`);
  }, [props.className]);

  const handleScroll = (direction) => {
    if (scrollItemRef.current) {
      const container = scrollItemRef.current;
      const scrollAmount = props.amount;
      if (direction === "left") {
        smoothScroll(container, -scrollAmount);
      } else if (direction === "right") {
        smoothScroll(container, scrollAmount);
      }
    }
  };

  const smoothScroll = (element, amount) => {
    element.scrollTo({
      left: element.scrollLeft + amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex right-4 items-center">
      <div
        onClick={() => handleScroll("left")}
        className="flex items-center bg-[#e2e2e7] mr-3 rounded-full p-2 cursor-pointer"
      >
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="text-[#02060ceb] text-base"
        />
      </div>
      <div
        onClick={() => handleScroll("right")}
        className="flex items-center bg-[#e2e2e7] rounded-full p-2 cursor-pointer"
      >
        <FontAwesomeIcon
          icon={faArrowRight}
          className="text-[#02060ceb] text-base"
        />
      </div>
    </div>
  );
};

export default OfferSlider;
