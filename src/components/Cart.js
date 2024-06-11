import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import emptyCart from "../assets/emptyCart.webp";
import { Link } from "react-router-dom";
import { addItems, removeItems, clearCart } from "../Utils/cartSlice";
import { current } from "@reduxjs/toolkit";
import Success from "./Success";
import { RES_CARD_IMG_CDN_URL } from "../helpers/Constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faPlay } from "@fortawesome/free-solid-svg-icons";

const Cart = () => {
  const dispatch = useDispatch();
  const cartDetails = useSelector((store) => store.cart.cartItems);
  const locDetails = useSelector((store) => store.location.locationDetails);
  const time = cartDetails[0]?.resDetailsData?.slaString;
  const deliveryFee = (
    cartDetails[0]?.resDetailsData?.deliveryFee / 100
  ).toFixed(0);
  const distance = cartDetails[0]?.resDetailsData?.lastMileTravelString;
  const [area, setArea] = useState("");
  const [cityName, setCityName] = useState("");
  const [state, setState] = useState("");
  const [suggestionText, setSuggestionText] = useState("");
  const [isChecked, setIsChecked] = useState("");
  const [confirmAddress, setConfirmAddress] = useState(false);
  const [confirmPayment, setConfirmPayment] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const handleConfirmAddress = () => {
    setConfirmAddress(!confirmAddress);
    setConfirmPayment(!confirmPayment);
  };
  const handleClearCart = () => {
    setOrderSuccess(false);
    dispatch(clearCart());
  };
  const handleIncreaseQuantity = (x) => {
    dispatch(addItems(x));
  };
  const handleDecreaseQuantity = (x) => {
    dispatch(removeItems(x));
  };
  useEffect(() => {
    if (locDetails[0]) {
      setArea(locDetails[0].area);
      setCityName(locDetails[0].district);
      setState(locDetails[0].state);
    }
  }, [locDetails]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  useEffect(() => {
    if (orderSuccess) {
      const timeoutId = setTimeout(() => {
        handleClearCart();
      }, 2500);
      return () => clearTimeout(timeoutId);
    }
  }, [orderSuccess]);
  const itemTotal = cartDetails.reduce((accumulator, currentItem) => {
    const itemPrice =
      ((currentItem.price || currentItem.defaultPrice) / 100) *
      currentItem.quantity;
    return accumulator + itemPrice;
  }, 0);
  // console.log(distance);
  return cartDetails.length === 0 ? (
    <div className="pt-40 flex flex-col items-center justify-center">
      <img src={emptyCart} className="w-[24rem]" />
      <h1 className="text-2xl text-[#535665] font-bold pt-5 tracking-tighter">
        Your cart is empty
      </h1>
      <p className="text-[#7e808c] py-4">
        You can go to home page to view more restaurants
      </p>
      <Link
        to="/"
        className="bg-[#fc8019] text-white text-lg font-semibold px-4 py-3"
      >
        SEE RESTAURANTS NEAR YOU
      </Link>
    </div>
  ) : orderSuccess ? (
    <div className="pt-40">
      <Success />
    </div>
  ) : (
    <div className="flex flex-col mt-28 bg-[#e9ecee] min-h-screen">
      <div className="flex mx-auto mt-4 xl:w-[80%]">
        <div className="flex-col flex-1 my-4 ml-8 mr-4">
          <div className="p-8 mb-5 bg-white w-full flex">
            <div className="relative bg-[#282c3f] h-fit right-12 p-2 shadow-[0px_3px_5px_0px_#282c3f66]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div className="-ml-4 flex-1">
              {confirmAddress ? (
                <>
                  <div className="flex-col">
                    <div className="flex justify-between items-center mb-8">
                      <div className="flex">
                        <h2 className="text-base self-center text-[#282c3f] font-semibold  pr-3">
                          Delivery Address
                        </h2>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          viewBox="0 0 24 24"
                          fill="#60b246"
                          stroke="#fff"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="m9 12 2 2 4-5" />
                        </svg>
                      </div>
                      <h2
                        className="text-[#f3730a] font-semibold text-sm cursor-pointer"
                        onClick={() => handleConfirmAddress()}
                      >
                        CHANGE
                      </h2>
                    </div>
                    <h2 className="text-base text-[#282c3f] font-semibold mb-1">
                      Home
                    </h2>
                    <h2 className="text-sm text-[#7f828f] font-medium tracking-tight leading-3 mb-6">
                      {area}, {cityName} {state}
                    </h2>
                    <h3 className="text-sm text-[#282c3f] font-semibold tracking-tight leading-3 mt-6">
                      {time}
                    </h3>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h2 className="text-lg text-[#282c3f] font-bold">
                      Select a delivery address
                    </h2>
                    <h3 className="text-[#7e808c]">
                      &nbsp; You have a saved address here
                    </h3>
                  </div>
                  <div className="border  border-dashed mt-6 w-80 h-fit px-4 pt-4 pb-2 cursor-pointer hover:shadow-[0px_2px_8px_#d4d5d9]">
                    <div className="mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#282c3f"
                      >
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <div className="relative flex -top-[1.6rem] -right-2 items-center justify-center rounded-full bg-[#60b246] w-3 h-3 text-white text-xs">
                        +
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-base tracking-tight">
                        Add new Address
                      </h3>
                      <h3 className="overflow-clip text-[#7f828f] text-sm">
                        {area}, {cityName}, {state}
                      </h3>
                      <div
                        className="my-4 border border-[#60b246] border-solid bg-[#60b246] text-center pt-3 pb-1 px-4 w-fit"
                        onClick={() => {
                          handleConfirmAddress();
                        }}
                      >
                        <h2 className="text-sm font-bold text-white">
                          DELIVER HERE
                        </h2>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="px-8 py-6 bg-white w-full flex h-fit">
            <div
              className={`relative right-16 h-fit text-white p-2 shadow-[0px_3px_5px_0px_#282c3f] ${
                confirmPayment
                  ? "bg-[#282c3f] stroke-white"
                  : "bg-white stroke-[#282c3f]"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColour"
              >
                <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
              </svg>
            </div>
            <div>
              {!confirmPayment ? (
                <>
                  <div className="text-base text-[#82848b]">Payment</div>
                </>
              ) : (
                <>
                  <h2 className="text-base text-[#282c3f] font-bold tracking-tight">
                    Choose Payment method
                  </h2>
                  <h3 className="text-sm text-[#7f828f]">
                    Credit & Debit cards, UPI or Cash on Delivery
                  </h3>
                  <div
                    className="my-4 bg-[#60b246] py-3 text-white font-bold text-center tracking-tight cursor-pointer hover:shadow-[0px_2PX_8PX_#d4d5d9]"
                    onClick={() => {
                      setOrderSuccess(true);
                    }}
                  >
                    PLACE ORDER
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        {/* right side */}
        <div className="flex-col ml-5 my-4 max-w-[35%]">
          <div className="flex-col pb-5 bg-white w-full h-fit">
            <Link
              to={`/restaurant/${cartDetails[0]?.resDetailsData?.id}`}
              className="flex mx-6 pt-6 pb-2"
            >
              <img
                className="w-14 h-14 mr-3 object-cover"
                src={
                  RES_CARD_IMG_CDN_URL +
                  cartDetails[0].resDetailsData?.cloudinaryImageId
                }
              />
              <div className="flex flex-col text-start justify-between w-full truncate">
                <div>
                  <h2 className="text-sm font-semibold text-[#282c3f]">
                    {cartDetails[0]?.resDetailsData?.name}
                  </h2>
                  <h3 className="text-xs min-h-fit truncate text-[#686b78]">
                    {cartDetails[0]?.resDetailsData?.areaName}
                  </h3>
                </div>
                <div className="h-[2px] w-10 bg-black"></div>
              </div>
            </Link>
            <div className="max-h-[67vh] overflow-y-auto">
              <div className="flex flex-col mx-6 pt-6">
                {cartDetails?.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className="flex w-full justify-between px-2 mb-3 last:mb-0 items-center"
                    >
                      <div className="flex items-center w-[50%]">
                        {item?.isVeg ? (
                          <h5>
                            <FontAwesomeIcon
                              className="border border-solid border-[#e43b4f] text-[#e43b4f] max-h-4 max-w-4 p-[2px] text-[8px] -rotate-90"
                              icon={faPlay}
                            />
                          </h5>
                        ) : (
                          <h5>
                            <FontAwesomeIcon
                              className="border border-solid border-[#0f8a65] text-[#0f8a65] max-h-4 max-w-4 p-[2px] text-[8px]"
                              icon={faCircle}
                            />
                          </h5>
                        )}
                        <h1 className="ml-2 flex-1 text-left text-sm leading-4 overflow-clip">
                          {item.name}
                        </h1>
                      </div>
                      <div className="flex border-[1.11px] border-solid border-gray-300 p-1 text-sm items-center">
                        <div
                          className="px-2 font-bold flex-1 text-[#3e4152] cursor-pointer"
                          onClick={() => {
                            handleDecreaseQuantity(item);
                          }}
                        >
                          -
                        </div>
                        <div className="px-2 font-bold flex-1 text-[#60b246] text-xs">
                          {item.quantity}
                        </div>
                        <div
                          className="px-2 font-bold flex-1 text-[#60b246] cursor-pointer"
                          onClick={() => {
                            handleIncreaseQuantity(item);
                          }}
                        >
                          +
                        </div>
                      </div>
                      <div className="text-[#686b78] text-xs">
                        ₹
                        {(item.quantity * (item.price || item.defaultPrice)) /
                          100}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex bg-[#f9f9f9] items-center mx-6 rounded mt-6">
                <div className="px-4">
                  <svg
                    className="text-[#282c3f] h-[10px] w-[15px] items-center mx-2"
                    viewBox="0 0 32 32"
                  >
                    <path d="M7.031 14c3.866 0 7 3.134 7 7s-3.134 7-7 7-7-3.134-7-7l-0.031-1c0-7.732 6.268-14 14-14v4c-2.671 0-5.182 1.040-7.071 2.929-0.364 0.364-0.695 0.751-0.995 1.157 0.357-0.056 0.724-0.086 1.097-0.086zM25.031 14c3.866 0 7 3.134 7 7s-3.134 7-7 7-7-3.134-7-7l-0.031-1c0-7.732 6.268-14 14-14v4c-2.671 0-5.182 1.040-7.071 2.929-0.364 0.364-0.695 0.751-0.995 1.157 0.358-0.056 0.724-0.086 1.097-0.086z"></path>
                  </svg>
                </div>
                <input
                  className="focus:outline-none w-full py-5 bg-[#f9f9f9] tracking-tighter text-sm"
                  type="text"
                  placeholder="Any suggestions? We will pass it on..."
                  value={suggestionText}
                  onChange={(e) => {
                    setSuggestionText(e.target.value);
                  }}
                />
              </div>
              <div className="mx-4 px-2 py-4">
                <div className="text-[#282c3f] text-sm font-bold pt-4 ">
                  Bill Details
                </div>
                <div className="flex justify-between text-xs font-semibold pt-4 text-[#686b78]">
                  <h3>Item Total</h3>
                  <h3 className="text-nowrap">₹{Number(itemTotal)}</h3>
                </div>
                <div className="flex justify-between border-t border-solid text-[#686b78] text-xs font-semibold pb-4 pt-4 mt-4">
                  <div className="flex items-end">
                    Delivery Fee | {distance}
                    <div className="ml-2 rounded-full border-[#686b78] border px-[4px] text-[10px] leading-3 text-[#686b78] font-bold flex self-baseline">
                      i
                    </div>
                  </div>
                  <h3 className="text-nowrap">
                    ₹
                    {Number(deliveryFee) ||
                      (Number(distance.split(" ")[0]) * 6.8).toFixed(2)}
                  </h3>
                </div>
                <div className="flex justify-between text-[#686b78] text-xs font-semibold pb-4">
                  <div className="flex items-end">
                    GST and Restaurant Charges
                    <div className="ml-2 rounded-full border-[#686b78] border px-[4px] text-[10px] leading-3 text-[#686b78] font-bold flex self-baseline">
                      i
                    </div>
                  </div>
                  <h3 className="text-nowrap">
                    ₹{(Number(itemTotal) * 0.18).toFixed(2)}
                  </h3>
                </div>
              </div>
            </div>
            <div className="flex justify-between text-[#282c3f] border-t-2 border-solid border-black text-md font-bold mx-6 px-2 pt-4 my-2">
              <h3>TO PAY</h3>
              <h3 className="text-nowrap">
                ₹
                {(
                  Number(itemTotal) +
                  Number(
                    Number(deliveryFee) ||
                      (Number(distance.split(" ")[0]) * 6.8).toFixed(2)
                  ) +
                  3 +
                  Number(0.18 * itemTotal)
                ).toFixed(2)}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
