import React, { useContext, useEffect, useState } from "react";
import { MENU_ITEM_CDN_URL } from "../helpers/Constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faPlay, faStar } from "@fortawesome/free-solid-svg-icons";
import { PiShootingStarFill } from "react-icons/pi";
import { MdLocalOffer } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import MyContext from "../Utils/MyContext";
import { addItems, removeItems } from "../Utils/cartSlice";

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
  resDetailsData,
  isVeg,
}) => {
  const dispatch = useDispatch();
  const cartDetails = useSelector((store) => store.cart.cartItems);
  const context = useContext(MyContext);
  const [isPresent, setIsPresent] = useState(-1);
  const [quantity, setQuantity] = useState(0);
  const handleAddItem = () => {
    dispatch(
      addItems({ id, name, isVeg, price, defaultPrice, resDetailsData })
    );
  };
  const handleRemoveItem = () => {
    dispatch(
      removeItems({ id, name, isVeg, price, defaultPrice, resDetailsData })
    );
  };
  const handleResCartChange = () => {
    context.showResCartAlert();
  };
  const handleExistingItem = () => {
    const existingItemIndex = cartDetails.findIndex((item) => {
      return item.id === id;
    });
    setIsPresent(existingItemIndex >= 0);
    setQuantity(cartDetails[existingItemIndex]?.quantity);
  };
  useEffect(() => {
    handleExistingItem();
  }, [cartDetails]);
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
        <div className="flex flex-col items-center justify-center">
          {!imageId ? (
            <></>
          ) : (
            <>
              <div className="relative flex flex-col items-center">
                <img
                  src={MENU_ITEM_CDN_URL + imageId}
                  alt={name}
                  className="w-40 h-36 rounded-2xl object-cover z-0"
                />
              </div>
            </>
          )}
          {!isPresent || quantity <= 0 ? (
            <div className="relative text-[#1ba672] bg-white font-bold w-[7.5rem] h-[2.5rem] z-10 bottom-8 text-lg shadow-xl rounded-xl flex items-center justify-center hover:bg-slate-200">
              <div
                className="text-[#60b246] flex justify-center items-center h-full text-center"
                onClick={() => {
                  if (cartDetails.length === 0) {
                    handleAddItem();
                  } else if (
                    cartDetails[0]?.resDetailsData?.id !== resDetailsData?.id
                  ) {
                    handleResCartChange();
                  } else {
                    handleAddItem();
                  }
                }}
              >
                ADD
              </div>
            </div>
          ) : (
            <div className="relative text-[#1ba672] font-bold flex justify-center items-center bottom-8 z-10 bg-white text-lg rounded-xl select-none">
              <div
                className="flex items-center justify-center w-[2.5rem] h-[2.5rem] text-center shadow-xl hover:bg-slate-200 rounded-l-xl"
                onClick={() => {
                  handleRemoveItem();
                }}
              >
                -
              </div>
              <div className="flex items-center justify-center w-[2.5rem] h-[2.5rem] text-center shadow-xl">
                {quantity}
              </div>
              <div
                className="flex items-center justify-center w-[2.5rem] h-[2.5rem] text-center shadow-xl hover:bg-slate-200 rounded-r-xl"
                onClick={() => {
                  handleAddItem();
                }}
              >
                +
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Item;
