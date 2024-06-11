import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import emptyCart from "../assets/emptyCart.webp";
import { Link } from "react-router-dom";
import { addItems, removeItems, clearCart } from "../Utils/cartSlice";
import { current } from "@reduxjs/toolkit";
import Success from "./Success";

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
    <div className="flex flex-col mt-20 bg-[#e9ecee] min-h-screen">
      <div className="flex mx-auto mt-4 xl:w-[85%]">
        <div className="p-8 mb-5 bg-white w-full flex">
          <div className="flex-col flex-1 my-4 ml-8">
            <div className="relative right-16 bg-[#282c3f] h-fit text-white p-2 shadow-[0px_3px_5px_0px_#282c3f66]">
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
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex">
                        <h2>Delivery Address</h2>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h2 className="text-base text-[#282c3f] font-semibold tracking-tight">
                      Choose a delivery address
                    </h2>
                    <h2 className="text-sm text-[#7f828f]">
                      &nbsp; To place the order now, add your address details
                    </h2>
                  </div>
                  <div className="border border-dashed mt-6">
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
                      <div className="relative flex -top-[25px] -right-[10px] rounded-full items-center justify-center w-3 h-3 bg-[#60b246] text-white text-xs">
                        +
                      </div>
                    </div>
                    <div>
                      <h3>Add new Address</h3>
                      <h3>
                        {area}, {cityName}, {state}
                      </h3>
                      <div className="bg-[#60b246] w-fit mt-4 mb-4 py-2 px-4 border-[#60b246] border-solid ">
                        <h2
                          className="text-sm font-extrabold leading-4 text-[#fff]"
                          onClick={() => {
                            handleConfirmAddress();
                          }}
                        >
                          DELIVER HERE
                        </h2>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
