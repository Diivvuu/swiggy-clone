import { configureStore } from "@reduxjs/toolkit";
import locationSlice from "./locationSlice";
import cartSlice from "./cartSlice";
import restaurantListSlice from "./restaurantListSlice";
import locationSearchVisibility from "./locationSearchVisibilitySlice";

const store = configureStore({
  reducer: {
    location: locationSlice,
    cart: cartSlice,
    restaurantList: restaurantListSlice,
    locSearch: locationSearchVisibility,
  },
});

export default store;
