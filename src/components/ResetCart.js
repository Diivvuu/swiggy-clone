import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../Utils/cartSlice";
import MyContext from "../Utils/MyContext";

const ResetCart = () => {
  const dispatch = useDispatch();
  const context = useContext(MyContext);
  const cartDetails = useSelector((store) => store.cart.cartItems);
  const handleYes = () => {
    dispatch(clearCart());
    context.hideResCartAlert();
  };
  return (
    <div className="fixed bottom-10 bg-white border-[1px] z-20 w-[35%] p-8 shadow-2xl">
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-semibold ">Items already in cart</h1>
        <h2 className="text-sm text-[#666876]">
          Your cart contains items from other restaurant. Would you like to
          reset your cart for adding items from this restaurant?
        </h2>
      </div>
      <div className="flex mt-8 justify-center items-center gap-12">
        <div
          className="flex flex-1 justify-center items-center border-solid font-bold border-[2px] border-[#60b246] text-xl h-12 focus-within:shadow-xl select-none"
          onClick={() => {
            context.hideResCartAlert();
          }}
        >
          NO
        </div>
        <div
          className="flex flex-1 items-center justify-center bg-[#60b246] font-bold py-auto h-12 select-none"
          onClick={handleYes}
        >
          YES, START AFRESH
        </div>
      </div>
    </div>
  );
};

export default ResetCart;
