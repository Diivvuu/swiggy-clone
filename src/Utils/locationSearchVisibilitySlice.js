import { createSlice } from "@reduxjs/toolkit";

const locationSearchVisiblilitySlice = createSlice({
  name: "locSearch",
  initialState: {
    visible: false,
  },
  reducers: {
    locSearch: (state, action) => {
      state.visible = action.payload;
    },
  },
});

export const { locSearch } = locationSearchVisiblilitySlice.actions;
export default locationSearchVisiblilitySlice.reducer;
