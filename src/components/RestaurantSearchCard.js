import react from "react";
import { Link } from "react-router-dom";
import {
  RES_CARD_IMG_CDN_URL,
  RES_CARD_IMG_CDN_URL_GREY,
} from "../helpers/Constant";
const RestaurantSearchCard = ({ cloudinaryImageId, id, isOpen, name }) => {
  return (
    <div>
      <Link
        to={isOpen ? "/restaurant/" + id : ""}
        key={id}
        className={`flex items-center h-24 w-auto hover:bg-[#f2f6fc] rounded-md ${
          isOpen ? "cursor-pointer" : "cursor-not-allowed"
        }`}
      >
        {cloudinaryImageId ? (
          <img
            className="p-3 w-24 h-full aspect-auto object-cover"
            src={
              isOpen === true
                ? RES_CARD_IMG_CDN_URL + cloudinaryImageId
                : RES_CARD_IMG_CDN_URL_GREY + cloudinaryImageId
            }
          />
        ) : (
          <></>
        )}
        <div className="flex-col mx-2 py-2">
          <h2 className="text-base">
            <strong>{name}</strong>
          </h2>
          <h3 className="text-sm text-[#73808c]">Restaurant</h3>
        </div>
      </Link>
    </div>
  );
};
export default RestaurantSearchCard;
