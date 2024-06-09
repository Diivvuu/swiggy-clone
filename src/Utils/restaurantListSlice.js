import { createSlice } from "@reduxjs/toolkit";

const restaurantListSlice = createSlice({
  name: "restaurantList",
  initialState: {
    resList: [],
  },
  reducers: {
    addRes: (state, action) => {
      state.resList.push(action.payload);
    },
    clearRes: (state, action) => {
      state.resList = [];
    },
  },
});
export const { addRes, clearRes } = restaurantListSlice.actions;
export default restaurantListSlice.reducer;
