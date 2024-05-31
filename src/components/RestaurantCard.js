import React from "react";
import { RES_CARD_IMG_CDN_URL } from "../helpers/Constant";

const RestaurantCard = ({
  areaName,
  avgRating,
  name,
  cloudinaryImageId,
  aggregatedDiscountInfoV3,
  sla,
}) => {
  return (
    <div className="">
      <div className="card-inside realtive w-80 h-52 ">
        {cloudinaryImageId && (
          <img
            className="w-full h-full object-cover rounded-2xl"
            src={RES_CARD_IMG_CDN_URL + cloudinaryImageId}
          />
        )}
        <div className="">
          {aggregatedDiscountInfoV3 && (
            <h2 className="absolute bottom-0 inset-x-0 text-white font-extrabold text-2xl">
              {aggregatedDiscountInfoV3.header +
                aggregatedDiscountInfoV3.subHeader}
            </h2>
          )}
        </div>
      </div>
      <div>
        <h1>{name}</h1>
      </div>
      <div className="flex">
        <h1>{avgRating}</h1>
        <h1>{sla.slaString}</h1>
      </div>
      <div></div>
      {/* <h1>{areaName}</h1> */}
      {/* <h1>{avgRating}</h1> */}
      {/* <h1>{name}</h1> */}
    </div>
  );
};

export default RestaurantCard;
