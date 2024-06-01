import React, { useState, useEffect } from "react";
import useRestaurantData from "../Hooks/useRestaurantData";
import { useSelector } from "react-redux";
import { WOYM_CARD_IMG_CDN_URL } from "../helpers/Constant";
import Slider from "./Slider";
import RestaurantCard from "./RestaurantCard";

const Home = () => {
  const [
    topicalBanner,
    WOYM,
    topResList,
    sort,
    resList,
    filteredResList,
    appInstallLinks,
    footerCities,
    bestPlaces,
    bestCuiNearMe,
    expResNearMe,
    notServicable,
  ] = useRestaurantData();

  const locDetails = useSelector((store) => store.location.locationDetails);
  const locationSearchVisibility = useSelector(
    (store) => store.locSearch.visible
  );
  console.log(topResList);
  const [city, setCity] = useState(locDetails[0]?.district);

  // useEffect to update city when locDetails change
  useEffect(() => {
    if (locDetails && locDetails[0]) {
      setCity(locDetails[0].district);
    }
  }, [locDetails]);

  return resList?.length === 0 ? (
    <h1>Shimmering</h1>
  ) : (
    <div className="body xl:max-w-[80%] mx-auto min-h-screen pt-8 ">
      {WOYM && (
        <>
          <div className="flex justify-between mx-12 px-4">
            <h1 className="font-bold text-[1.7rem] leading-3 tracking-tight">
              What's on your mind?
            </h1>
            <Slider className="foodCategory" amount={350} />
          </div>
          <div className="foodCategory container-snap mx-12 flex p-4 overflow-x-auto">
            {WOYM.map((img) => {
              return (
                <div
                  className="cursor-pointer flex-shrink-0 pr-6 first:pl-4"
                  key={img.id}
                >
                  {/* this will take you to the swiggy website's food app */}
                  {/* <a href={img.action.link}> */}
                  <img
                    className="h-[180px] w-[144px]"
                    src={WOYM_CARD_IMG_CDN_URL + img.imageId}
                  />
                  {/* </a> */}
                </div>
              );
            })}
          </div>
        </>
      )}
      <hr className="my-8"></hr>
      {topResList && (
        <>
          <div className="flex justify-between items-center mx-12 px-4">
            <h1 className="font-bold text-[1.7rem] leading-3 tracking-tight">
              Top restaurant chains in {city}
            </h1>
            <Slider className="topResList" key="topResList" amount={450} />
          </div>
          <div className="topResList container-snap mx-4 p-4 flex mt-4 mb-2 overflow-x-auto">
            {topResList.map((res) => {
              return (
                <RestaurantCard
                  {...res.info}
                  locationSearchVisibility={locationSearchVisibility}
                  key={res.info.id}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
