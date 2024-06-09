import React from "react";
import { MENU_ITEM_CDN_URL } from "../helpers/Constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faPlay, faStar } from "@fortawesome/free-solid-svg-icons";
import { PiShootingStarFill } from "react-icons/pi";
import { MdLocalOffer } from "react-icons/md";

const Item = ({
  name,
  description,
  price,
  finalPrice,
  defaultPrice,
  id,
  imageId,
  itemAttribute,
  offerTags,
  ratings,
  ribbon,
}) => {
  console.log(ratings);

  return (
    <div className="px-4 border-b-solid border-b-[1px] py-8">
      <div className="flex justify-between items-center">
        <div className="flex flex-col w-[60%]">
          {itemAttribute && (
            <span className="flex items-center gap-x-3">
              {itemAttribute.vegClassifier === "NONVEG" ? (
                <FontAwesomeIcon
                  className="border border-solid border-[#e43b4f] text-[#e43b4f] max-h-4 max-w-4 p-0.5 text-xs -rotate-90"
                  icon={faPlay}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faCircle}
                  className="border border-solid border-[#0f8a65] text-[#0f8a65] max-h-4 max-w-4 p-0.5 text-xs"
                />
              )}
              <div className="flex items-center">
                {ribbon?.text && (
                  <>
                    <PiShootingStarFill className="text-[#ff6e5a]" />
                    <p className="text-[#ff6e5a]">{ribbon.text}</p>
                  </>
                )}
              </div>
            </span>
          )}
          <h1 className="text-xl font-bold">{name}</h1>

          <h2 className="text-lg font-bold">
            ₹{(price || finalPrice || defaultPrice) / 100}
            &nbsp; &nbsp; &nbsp;
            {offerTags && (
              <>
                <MdLocalOffer />
                {offerTags.map((tag) => (
                  <span key={tag.title}>{tag.title}</span>
                ))}
              </>
            )}
          </h2>
          {ratings.aggregatedRating.ratingCountV2 && (
            <>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-[#116649] text-sm"
                />
                <h3 className="font-semibold text-md text-[#116649]">
                  {ratings && ratings.aggregatedRating.rating}
                </h3>
                <h3 className="text-sm text-[#676a6d] font-bold">
                  ({ratings.aggregatedRating.ratingCountV2})
                </h3>
              </div>
            </>
          )}
          <h3>{description}</h3>
        </div>
        {imageId ? (
          <div>
            <img
              src={MENU_ITEM_CDN_URL + imageId}
              alt={name}
              className="w-40 h-36 rounded-2xl object-cover"
            />
          </div>
        ) : (
          <div className="flex justify-between align-center items-center">
            <button className="text-[#1ba672] text-xl font-bold rounded-lg border-[1px] py-2 px-6 shadow-xl mr-6">
              ADD
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Item;
