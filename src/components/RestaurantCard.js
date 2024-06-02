import React from "react";
import { RES_CARD_IMG_CDN_URL } from "../helpers/Constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const RestaurantCard = ({
  areaName,
  avgRating,
  name,
  cloudinaryImageId,
  aggregatedDiscountInfoV3,
  sla,
  cuisines,
}) => {
  return (
    <div className="cursor-pointer transition-all ease-in delay-100 hover:scale-90 hover:origin-center">
      <div className="relative w-72 h-48">
        {cloudinaryImageId && (
          <img
            className="w-full h-full object-cover rounded-2xl"
            src={RES_CARD_IMG_CDN_URL + cloudinaryImageId}
            alt={name}
          />
        )}

        {aggregatedDiscountInfoV3 && (
          <span className="flex absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent shadow-md text-white p-3 rounded-b-2xl">
            <h1 className="text-2xl font-extrabold">
              {aggregatedDiscountInfoV3?.header}
              {aggregatedDiscountInfoV3?.subHeader && (
                <span>&nbsp;{aggregatedDiscountInfoV3.subHeader}</span>
              )}
            </h1>
          </span>
        )}
      </div>

      <div className="px-4 pt-2">
        <h1 className="w-64 truncate text-[1.4rem] font-[700]" title={name}>
          {name}
        </h1>

        <div className="flex items-center font-semibold text-lg gap-2">
          <FontAwesomeIcon
            icon={faStar}
            className="bg-green-700 text-xs text-white p-1 rounded-full"
          />{" "}
          {avgRating}
          {" • "}
          {sla.slaString}
        </div>
        <div className="truncate w-64">
          <p>{cuisines.join(", ")}</p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
