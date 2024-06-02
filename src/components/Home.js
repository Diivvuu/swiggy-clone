import React, { useState, useEffect } from "react";
import useRestaurantData from "../Hooks/useRestaurantData";
import { useSelector } from "react-redux";
import { WOYM_CARD_IMG_CDN_URL } from "../helpers/Constant";
import Slider from "./Slider";
import RestaurantCard from "./RestaurantCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faXmark } from "@fortawesome/free-solid-svg-icons";
import orderBy from "lodash/orderBy";

const Home = () => {
  const [
    topicalBanner,
    WOYM,
    topResList,
    sort,
    resList,
    filteredResList,
    setfilteredResList,
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
  console.log(bestCuiNearMe);
  const [city, setCity] = useState(locDetails[0]?.district);
  const [sortActive, setSortActive] = useState(undefined);
  const [bestPlacesOpen, setBestPlacesOpen] = useState(false);
  const [bestCuiOpen, setBestCuiOpen] = useState(false);

  // useEffect to update city and sorting buttons when locDetails change
  useEffect(() => {
    if (locDetails && locDetails[0]) {
      setCity(locDetails[0].district);
      setSortActive(undefined);
    }
  }, [locDetails]);

  const handleSortClick = (text) => {
    if (text === sortActive && sortActive !== undefined) {
      setSortActive(undefined);
      setfilteredResList(resList);
    } else {
      setSortActive(text);
      if (text === "Relevance (Default)") {
        setfilteredResList(filteredResList);
      } else if (text === "DeliveryTime") {
        const sortedList = orderBy(
          filteredResList,
          ["info.sla.deliveryTime"],
          ["asc"]
        );
        setfilteredResList(sortedList);
      } else if (text === "Rating") {
        const sortedList = orderBy(
          filteredResList,
          ["info.avgRating"],
          ["desc"]
        );
        setfilteredResList(sortedList);
      } else if (text === "Cost:LowtoHigh") {
        const sortedList = orderBy(
          filteredResList,
          [(res) => parseInt(res.info.costForTwo.split(" ")[0].slice(1))],
          ["asc"]
        );
        setfilteredResList(sortedList);
      } else if (text === "Cost:HightoLow") {
        const sortedList = orderBy(
          filteredResList,
          [(res) => parseInt(res.info.costForTwo.split(" ")[0].slice(1))],
          ["desc"]
        );
        setfilteredResList(sortedList);
      }
    }
  };

  const handleMorePlaces = () => {
    setBestPlacesOpen(true);
  };

  const handleLessPlaces = () => {
    setBestPlacesOpen(false);
  };

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
                    alt="what's on your mind restaurant"
                  />
                  {/* </a> */}
                </div>
              );
            })}
          </div>
        </>
      )}

      {topResList && (
        <>
          <hr className="my-8"></hr>
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
      <hr className="my-8"></hr>
      {filteredResList && (
        <>
          <div className="mx-8">
            <div className="my-8 mb-4 pl-2 ">
              <h1 className="font-bold text-[1.7rem] my-12 leading-3 tracking-tight">
                Restaurants with online food delivery in {city}
              </h1>
            </div>
            <div className="container-snap flex items-center mx-16 mb-4 w-full overflow-auto">
              <div
                className={`px-3 py-2 mr-3 min-w-fit rounded-full transition-all duration-100 ease-in delay-0 ${
                  sortActive !== undefined
                    ? "bg-[#02060c26] border-[orange] border-[1px]"
                    : "border-[1px] border-solid border-[#02060c1f]"
                }`}
              >
                <h1
                  className={`text-center flex-1 text-base tracking-tight font-medium whitespace-nowrap ${
                    sortActive !== undefined
                      ? "text-orange-500"
                      : "text-[#050e1bbf]"
                  }`}
                >
                  Filter &nbsp; <FontAwesomeIcon icon={faFilter} />
                </h1>
              </div>
              {sort.map((x, index) => {
                const formatTitle = (title) => {
                  // Insert a space before each uppercase letter that follows a lowercase letter or a digit
                  let formattedTitle = title.replace(
                    /([a-z0-9])([A-Z])/g,
                    "$1 $2"
                  );

                  // Ensure space around the colon
                  formattedTitle = formattedTitle.replace(/:\s*/g, " : ");

                  // Handle specific known cases if necessary
                  if (formattedTitle.includes("Lowto High")) {
                    formattedTitle = formattedTitle.replace(
                      "Lowto High",
                      "Low to High"
                    );
                  }
                  if (formattedTitle.includes("Highto Low")) {
                    formattedTitle = formattedTitle.replace(
                      "Highto Low",
                      "High to Low"
                    );
                  }

                  return formattedTitle;
                };

                return (
                  <div
                    key={x.title}
                    onClick={() => handleSortClick(x.title)}
                    className={`container-snap flex justify-between items-center min-w-fit truncate px-3 cursor-pointer rounded-full mr-2 mb-2 ${
                      sortActive === x.title
                        ? "bg-orange-200 border-[orange] border-[1px]"
                        : "border-[1px] border-solid border-[#02060c1f]"
                    } `}
                  >
                    <h1 className="text-center text-base text-[#050e1bbf] tracking-tight font-medium">
                      {formatTitle(x.title)}
                    </h1>
                    {sortActive === x.title ? (
                      <div>
                        <FontAwesomeIcon
                          icon={faXmark}
                          className="text-[#050e1bbf] text-center text-sm"
                        />
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
            <div className="grid place-items-center gap-8 mx-auto px-8 my-8 xl:grid-cols-4 lg:grid-cols-3">
              {filteredResList.map((res) => {
                return (
                  <RestaurantCard
                    {...res.info}
                    locationSearchVisibility={locationSearchVisibility}
                    key={res.info.id}
                  />
                );
              })}
            </div>
          </div>
        </>
      )}
      {bestPlaces && (
        <>
          {bestPlaces && (
            <>
              <hr className="my-8"></hr>
              <div className="flex justify-between mx-12 px-4">
                <h1 className="font-bold text-[1.7rem] leading-3 tracking-tight">
                  Best Places to Eat Across Cities
                </h1>
              </div>
              <div className="flex flex-wrap gap-x-2 justify-between my-8">
                {bestPlaces.slice(0, 11).map((x) => (
                  <div
                    className="w-[20%] flex-grow p-4 mx-2 mb-4 cursor-pointer border-[1px] border-solid border-[#02060c1f] rounded-xl transition-all ease-in delay-100 hover:bg-orange-100"
                    key={x.text}
                  >
                    <h2 className="truncate text-center text-base text-[#050e1bbf] tracking-tight font-medium">
                      {x.text}
                    </h2>
                  </div>
                ))}
                {!bestPlacesOpen && (
                  <div
                    onClick={handleMorePlaces}
                    className="w-[20%] flex-grow p-4 mx-2 mb-4 cursor-pointer border-[1px] border-solid border-[#02060c1f] rounded-xl hover:bg-orange-500"
                  >
                    <h2 className="truncate text-center text-base text-[#050e1bbf] tracking-tight font-medium">
                      Show more
                    </h2>
                  </div>
                )}
                {bestPlacesOpen && (
                  <>
                    {bestPlaces.slice(11).map((x) => (
                      <div
                        className="w-[20%] flex-grow p-4 mx-2 mb-4 cursor-pointer border-[1px] border-solid border-[#02060c1f] rounded-xl"
                        key={x.text}
                      >
                        <h2 className="truncate text-center text-base text-[#050e1bbf] tracking-tight font-medium">
                          {x.text}
                        </h2>
                      </div>
                    ))}
                    <div
                      onClick={handleLessPlaces}
                      className="w-[20%] p-4 mx-auto mb-4 cursor-pointer border-[1px] border-solid border-[#02060c1f] rounded-xl hover:bg-orange-200"
                    >
                      <h2 className="truncate text-center text-base text-[#050e1bbf] tracking-tight font-medium">
                        Show less
                      </h2>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
