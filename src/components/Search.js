import React from "react";
import { shimmer_display_count } from "../helpers/Constant";
import SearchCuisineShimmer from "./SearchCuisineShimmer";
import { useState, useEffect } from "react";
import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useRestaurantsData from "../Hooks/useRestaurantData";
import RestaurantSearchCard from "./RestaurantSearchCard";
import usePopularCuisinesData from "../Hooks/usePopularCuisinesData";
import { IMG_CDN_URL } from "../helpers/Constant";
// import RestaurantSearchCard from "./RestaurantSearchCard";
import RestaurantCard from "./RestaurantCard";

const Search = () => {
  const [
    topicalBanner,
    wOYM,
    topResList = [],
    sort,
    resList = [],
    filteredResList,
    setFilteredResList,
    appInstallLinks,
    footerCities,
    bestPlaces,
    bestCuiNearMe,
    expResNearMe,
    notServicable,
  ] = useRestaurantsData();
  // const [popularCuisines] = usePopularCuisinesData();
  const [searchText, setSearchText] = useState("");
  const [ErrorMessage, setErrorMessage] = useState("");
  const [filteredSearchResList, setFilteredSearchResList] = useState([]);
  // const popCuisines = popularCuisines.map(
  //   (x) =>
  //     (x.action.link = x.action.link
  //       .replace("swiggy://explore?query=", "")
  //       .replace("%20", " "))
  // );
  // window.scrollTo(0, 0);
  // const handleCuisineClick = (text) => {
  //   setSearchText(text);
  // };
  console.log(topResList);
  const handleXClick = () => {
    if (searchText !== "") {
      setSearchText("");
    }
  };
  const handleSearch = () => {
    const searchLower = searchText.toLowerCase();

    const filteredDataResList = resList.filter(
      (res) =>
        res?.info?.name?.toLowerCase()?.includes(searchLower) ||
        res?.info?.cuisines?.some((cuisine) =>
          cuisine.toLowerCase().includes(searchLower)
        )
    );

    const filteredDataTopResList = topResList.filter(
      (res) =>
        res?.info?.name?.toLowerCase()?.includes(searchLower) ||
        res?.info?.cuisines?.some((cuisine) =>
          cuisine.toLowerCase().includes(searchLower)
        )
    );

    const combinedFilteredData = [
      ...filteredDataResList,
      ...filteredDataTopResList,
    ];

    // Remove duplicates based on unique restaurant IDs
    const uniqueFilteredData = combinedFilteredData.filter(
      (res, index, self) =>
        index === self.findIndex((r) => r.info.id === res.info.id)
    );

    setFilteredSearchResList(uniqueFilteredData);
    setErrorMessage("");
    if (uniqueFilteredData?.length === 0) {
      setErrorMessage(
        `Sorry, we couldn't find any results for "${searchText}"`
      );
    }
  };

  const shimArr = Array(shimmer_display_count).fill("");
  useEffect(() => {
    handleSearch();
  }, [searchText]);

  return (
    <div className="pt-40 min-h-screen mx-auto w-[60%]">
      <div className="px-2 flex items-center justify-start mx-auto w-full border-2 border-[text-[#686b78]] text-[#686b78]">
        <input
          type="text"
          className="flex-1 px-3 py-3 focus:outline-none"
          placeholder="Search for restaurants or cuisines"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyUp={handleSearch}
        ></input>
        <FontAwesomeIcon
          icon={searchText === "" ? faSearch : faXmark}
          className="text-[#7e818d] py-2 pr-4 cursor-pointer"
          onClick={() => {
            handleXClick();
          }}
        />
      </div>
      <div className="mx-auto mt-10 w-full">
        {searchText === "" ? (
          <>
            {/*<h2 className="text-left font-black text-[#3d4152] mb-2 pl-2 pb-15 pt-5 text-2xl tracking-tighter leading-tight">
              Popular Cuisines
            </h2>
             {popularCuisines.length === 0 ? (
              <div className="flex overflow-hidden flex-start">
                {shimArr?.map((e, index) => {
                  return <SearchCuisineShimmer key={index} />;
                })}
              </div>
            ) : (
              <div className="container-snap flex overflow-x-auto h-36 flex-start">
                {popularCuisines?.map((img) => {
                  return (
                    <div
                      className="ml-1 cursor-pointer flex-shrink-0"
                      key={img.imageId}
                      onClick={() => {
                        handleCuisineClick(img.action.link);
                      }}
                    >
                      <img
                        src={IMG_CDN_URL + img.imageId}
                        className="h-full w-auto"
                      />
                    </div>
                  );
                })}
              </div>
            )} */}
          </>
        ) : (
          <div>
            <div className="my-2 text-lg font-medium">
              Search Results for <strong>"{searchText}"</strong>
            </div>
            <div>
              {filteredSearchResList &&
                filteredSearchResList?.map((res) => {
                  return (
                    <RestaurantSearchCard {...res.info} key={res.info.id} />
                  );
                })}
            </div>
            {ErrorMessage && (
              <div className="text-center mb-3 mt-5 text-xl bg-[#f2f6fc] py-6">
                {ErrorMessage}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default Search;
