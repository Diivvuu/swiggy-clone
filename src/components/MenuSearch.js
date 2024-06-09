import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import useRestaurantMenu from "../Hooks/useRestaurantMenu";
import { useParams } from "react-router-dom";

const MenuSearch = () => {
  const { id } = useParams();
  const [resDetails, resOffers, resMenu] = useRestaurantMenu(id);
  const [searchText, setSearchText] = useState("");
  console.log(resMenu);
  return (
    <div className="flex flex-col items-center justify-start w-[70%] pt-40">
      <div className="flex justify-center items-center w-full relative">
        <input
          type="text"
          className="placeholder:text-black bg-[#f0f0f5] py-3 pl-10 w-full placeholder:text-center rounded-xl focus:outline-none"
          placeholder="Search for dishes here"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center bg-[#f0f0f5]">
          <FontAwesomeIcon
            icon={searchText === "" ? faSearch : faXmark}
            className="text-gray-400"
          />
        </div>
      </div>
      <div className="align-left ml-8 my-8 ">
        {searchText === "" ? (
          <></>
        ) : (
          <>
            <p>
              Search Results for <strong>"{searchText}"</strong>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default MenuSearch;
