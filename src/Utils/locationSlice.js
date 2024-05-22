import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "location",
  initialState: {
    locationDetails: [
      {
        pincode: 530028,
        area: "Simhachalam",
        lat: 17.771678,
        lng: 83.245248,
        district: "Visakhapatnam",
        state: "Andhra Pradesh",
      },
    ],
  },
  reducers: {
    updateLocation: (state, action) => {
      state.locationDetails = action.payload;
    },
  },
});

export const { updateLocation } = locationSlice.actions;
export default locationSlice.reducer;
