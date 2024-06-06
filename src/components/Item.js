import React from "react";
import { MENU_ITEM_CDN_URL } from "../helpers/Constant";

const Item = ({
  name,
  description,
  price,
  finalPrice,
  defaultPrice,
  id,
  isVeg,
  imageId,
}) => {
  return (
    <div className="px-12 border-[5px] rounded-2xl">
      <div className="flex justify-between items-center">
        <div className="flex flex-col w-[60%]">
          <h1>{name}</h1>
          <h2>₹{(price || finalPrice || defaultPrice) / 100}</h2>
          <h3>{description}</h3>
        </div>
        <div>
          <img
            src={MENU_ITEM_CDN_URL + imageId}
            alt={name}
            className="w-40 h-36 rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Item;
