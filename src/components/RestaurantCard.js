import React from "react";
import { RES_CARD_IMG_CDN_URL } from "../helpers/Constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const RestaurantCard = ({
  id,
  areaName,
  avgRating,
  name,
  cloudinaryImageId,
  aggregatedDiscountInfoV3,
  sla,
  isOpen,
  cuisines,
  locationSearchVisibility,
}) => {
  return (
    <div key={id} className={`${locationSearchVisibility ? "-z-10" : ""}`}>
      <Link
        to={isOpen ? "/restaurant/" + id : ""}
        key={id}
        className={`grid grid-flow-row justify-stretch h-auto transition-all ease-in delay-100 hover:scale-95 hover:origin-center ${
          isOpen ? "cursor-pointer" : "cursor-not-allowed"
        } sm:w-72 lg:w-64`}
      >
        <div className="relative w-full h-48 sm:w-72 lg:h-40 lg:w-64">
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
          <h1 className="w-64 truncate text-2xl font-extrabold" title={name}>
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
      </Link>
    </div>
  );
};

export default RestaurantCard;
