import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { REST_API_MENU_URL } from "../helpers/Constant";

const useRestaurantMenu = (id) => {
  const locDetails = useSelector((store) => store.location.locationDetails);
  const [latitude, setLatitude] = useState(locDetails[0].lat);
};

export default useRestaurantMenu;
