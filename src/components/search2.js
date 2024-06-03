import React, { useState } from "react";
import useRestaurantsData from "../Hooks/useRestaurantData";
import usePopularCuisinesData from "../Hooks/usePopularCuisinesData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import { IMG_CDN_URL, shimmer_display_count } from "../helpers/Constant";
const Search = () => {
  const [resList, filteredResList] = useRestaurantsData();
  const [popularCuisines] = usePopularCuisinesData();
  const [searchText, setSearchText] = useState("");
  const [ErrorMessage, setErrorMessage] = useState("");
  const [filteredSearchResList, setFilteredSearchResList] = useState([]);

  console.log(resList);
  const popCuisines = popularCuisines.map(
    (x) =>
      (x.action.link = x.action.link
        .replace("swiggy://explore?query=", "")
        .replace("%20", " "))
  );
  window.scrollTo(0, 0);
  const handleCuisineClick = (text) => {
    setSearchText(text);
  };
  const handleXClick = () => {
    if (searchText !== "") {
      setSearchText("");
    }
  };
  const handleSearch = () => {
    const filteredData = resList.filter((res) => {
      res?.info?.name?.toLowerCase()?.include(searchText?.toLowerCase());
      setFilteredSearchResList(filteredData);
      setErrorMessage("");
      if (filteredData?.length === 0) {
        setErrorMessage(
          `Sorry, we couldn't find any restaurants for "${searchText}"`
        );
      }
    });
  };
  const shimArr = Array(shimmer_display_count).fill("");
  return (
    <div className="pt-40">
      <div>
        <input
          placeholder="Search for Restaurants"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyUp={handleSearch}
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
                {shimArr?.map((e, index) => {
                  return <p>SearchCuisinesShimmer</p>;
                })}
              </div>
            ) : (
              <div>
                {popularCuisines?.map((img) => {
                  return (
                    <div onClick={handleCuisineClick(img.action.link)}>
                      <img src={IMG_CDN_URL + img.imageId} />
                    </div>
                  );
                })}
              </div>
            )}
          </>
        ) : (
          <div>
            <div>
              Search Results for <strong>"{searchText}"</strong>
            </div>
            <div>
              {filteredSearchResList &&
                filteredSearchResList?.map((res) => {
                  return <p>Res Card</p>;
                })}
            </div>
            {ErrorMessage && <div>{ErrorMessage}</div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
