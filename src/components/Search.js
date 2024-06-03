import React, { useState, useEffect } from "react";
import useRestaurantData from "../Hooks/useRestaurantData";
import usePopularCuisinesData from "../Hooks/usePopularCuisinesData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import { IMG_CDN_URL, shimmer_display_count } from "../helpers/Constant";

const Search = () => {
  const [
    topicalBanner,
    wOYM,
    topResList,
    sort,
    resList,
    filteredResList,
    setFilteredResList,
    appInstallLinks,
    footerCities,
    bestPlaces,
    bestCuiNearMe,
    expResNearMe,
    notServicable,
  ] = useRestaurantData();
  const [popularCuisines] = usePopularCuisinesData();
  const [searchText, setSearchText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [filteredSearchResList, setFilteredSearchResList] = useState([]);
  console.log(resList); // Confirm that resList has the expected data structure

  useEffect(() => {
    if (searchText === "") {
      setFilteredSearchResList([]);
      setErrorMessage("");
      return;
    }

    if (resList && resList.length > 0) {
      const filteredData = resList.filter((res) =>
        res?.info?.name?.toLowerCase()?.includes(searchText.toLowerCase())
      );

      setFilteredSearchResList(filteredData);
      setErrorMessage("");
      if (filteredData.length === 0) {
        setErrorMessage(
          `Sorry, we couldn't find any restaurants for "${searchText}"`
        );
      }
    }
  }, [searchText, resList]);

  const handleCuisineClick = (text) => {
    setSearchText(text);
  };

  const handleXClick = () => {
    if (searchText !== "") {
      setSearchText("");
    }
  };

  const shimArr = Array(shimmer_display_count).fill("");

  return (
    <div className="pt-40">
      <div>
        <input
          placeholder="Search for Restaurants"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <FontAwesomeIcon
          icon={searchText === "" ? faSearch : faXmark}
          onClick={handleXClick}
        />
      </div>
      <div>
        {searchText === "" ? (
          <>
            <h2>Popular Cuisines</h2>
            {popularCuisines.length === 0 ? (
              <div>
                {shimArr.map((_, index) => (
                  <p key={index}>SearchCuisinesShimmer</p>
                ))}
              </div>
            ) : (
              <div>
                {popularCuisines.map((img) => (
                  <div
                    key={img.imageId}
                    onClick={() => handleCuisineClick(img.action.link)}
                  >
                    <img
                      src={IMG_CDN_URL + img.imageId}
                      alt={img.action.link}
                    />
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div>
            <div>
              Search Results for <strong>"{searchText}"</strong>
            </div>
            <div>
              {filteredSearchResList.length > 0
                ? filteredSearchResList.map((res) => (
                    <div key={res.info.id}>
                      {" "}
                      {/* Ensure key is unique */}
                      <p>Res Card</p>{" "}
                      {/* Replace with actual Restaurant Card component */}
                    </div>
                  ))
                : errorMessage && <div>{errorMessage}</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
