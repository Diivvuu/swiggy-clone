import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "location",
  initialState: {
    locationDetails: [
      {
        pincode: 400001,
        area: "Bazargate",
        lat: 18.9486,
        lng: 72.83662,
        district: "Mumbai",
        state: "Maharashtra",
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
