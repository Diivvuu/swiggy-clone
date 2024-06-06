import React, { useState } from "react";
import Item from "./Item";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const MenuCategory = ({ title, itemCards, resDetailsData }) => {
  const menuData = itemCards.map((x) => {
    return x.card.info;
  });
  console.log(menuData);
  const [isOpen, setIsOpen] = useState(true);
  const toggleCategory = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="py-3 cursor-pointer">
      <div
        className="flex justify-between items-center"
        onClick={toggleCategory}
      >
        <h3 className="font-bold text-xl">
          {title} ({itemCards.length})
        </h3>
        <div>
          {
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`${isOpen ? "rotate-180" : ""}`}
            />
          }
        </div>
      </div>
      <div>
        {isOpen &&
          menuData.map((item) => {
            return (
              <Item
                {...item}
                key={{ ...item }.id}
                resDetailsData={resDetailsData}
              />
            );
          })}
      </div>
      <div className="bg-[#eeeeee] py-2 mt-3"></div>
    </div>
  );
};

export default MenuCategory;
