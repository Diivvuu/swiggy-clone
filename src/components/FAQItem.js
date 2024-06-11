import React from "react";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const FAQItem = ({ title, description }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleFAQ = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="border-b border-[#cfd1dd]">
      <div
        className="flex justify-between cursor-pointer pt-6 pb-7 text-[#111113]"
        onClick={toggleFAQ}
      >
        <h3
          className={`font-light text-base text-left hover:text-orange ${
            description !== null && isOpen ? "text-orange" : ""
          }`}
        >
          {title}
        </h3>
        {description ? (
          <div className={`${isOpen ? "text-orange rotate-180" : ""}`}>
            {<FontAwesomeIcon icon={faChevronDown} />}
          </div>
        ) : (
          <div />
        )}
      </div>
      {isOpen && description ? (
        <div className="w-full pb-7 pr-12">
          <h3 className="font-normal text-[13px] text-[#5a5c66] whitespace-pre-wrap tracking-tight">
            {description}
          </h3>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

export default FAQItem;
