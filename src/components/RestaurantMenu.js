import React from "react";
import { REST_API_MENU_URL } from "../helpers/Constant";
import useRestaurantMenu from "../Hooks/useRestaurantMenu";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const RestaurantMenu = () => {
  const { id } = useParams();
  const [resDetails] = useRestaurantMenu(id);
  return <div></div>;
};

export default RestaurantMenu;
