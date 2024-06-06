import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { REST_API_MENU_URL } from "../helpers/Constant";
import { retry } from "@reduxjs/toolkit/query";

const useRestaurantMenu = (id) => {
  const locDetails = useSelector((store) => store.location.locationDetails);
  const [latitude, setLatitude] = useState(locDetails[0].lat);
  const [longitude, setLongitude] = useState(locDetails[0].lng);
  const [resDetails, setResDetailse] = useState();
  const [resOffers, setResOffers] = useState([]);
  const [resMenu, setResMenu] = useState([]);
  async function getRestaurantMenu() {
    const data = await fetch(REST_API_MENU_URL(latitude, longitude) + id);
    const json = await data.json();
    const restaurantData =
      json?.data?.cards
        ?.map((x) => x.card)
        ?.find(
          (x) =>
            x &&
            x.card["@type"] ===
              "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
        )?.card?.info || null;
    const restaurantOffers =
      json?.data?.cards
        ?.map((x) => x.card)
        ?.find(
          (x) =>
            x &&
            x.card["@type"] ===
              "type.googleapis.com/swiggy.gandalf.widgets.v2.GridWidget"
        )
        ?.card?.gridElements?.infoWithStyle?.offers?.map((x) => x?.info) || [];
    const restaurantMenu =
      json?.data?.cards
        ?.find((x) => x.groupedCard)
        ?.groupedCard?.cardGroupMap?.REGULAR?.cards?.map((x) => x?.card?.card)
        .filter(
          (x) =>
            x["@type"] ===
            "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
        ) || [];
    setResDetailse(restaurantData);
    setResOffers(restaurantOffers);
    setResMenu(restaurantMenu);
  }
  useEffect(() => {
    getRestaurantMenu();
  }, []);
  return [resDetails, resOffers, resMenu];
};

export default useRestaurantMenu;
