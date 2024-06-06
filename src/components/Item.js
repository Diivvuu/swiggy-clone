import React from "react";

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
    <div className="px-12">
      <div className="flex">
        <div className="flex flex-col">
          <h1>{name}</h1>
          <h2>₹{(price || finalPrice || defaultPrice) / 100}</h2>
          <h3>{description}</h3>
        </div>
      </div>
    </div>
  );
};

export default Item;
