import React from "react";
import { useState, useEffect } from "react";
import { swiggySearchAPI } from "../helpers/Constant";
import { useSelector } from "react-redux";

const usePopularCuisinesData = () => {
    const locDetails = useSelector((store) => store.location.locationDetails);
    const [latitude, setLatitude] = useState(locDetails[0].lat);
    const [longitude, setLongitude] = useState(locDetails[0].lng);
    const [popularCuisines, setPopularCuisines] = useState([]);
    async function getPopularCuisines() {
      const data = await fetch(swiggySearchAPI(latitude, longitude));
      const json = await data.json();
      const popularCuisinesData = json?.data?.cards
          ?.map((x) => {
            return x?.card?.card;
          })
          ?.filter((x) => {
            return x["id"] === "PopularCuisinessearchpage";
          })
          ?.map((x) => {
            return x?.gridElements?.infoWithStyle?.info;
          });
      setPopularCuisines(...popularCuisinesData);
    }
    useEffect(() => {
      if (locDetails && locDetails[0]) {
        const newLatitude = locDetails[0].lat;
        const newLongitude = locDetails[0].lng;
        setLatitude(newLatitude);
        setLongitude(newLongitude);
        getPopularCuisines(newLatitude, newLongitude);
      }
    }, [locDetails]);
    return [popularCuisines];
}

export default usePopularCuisinesData;