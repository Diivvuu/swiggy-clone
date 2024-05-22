import React, { useState } from "react";
import { GET_LOCATION_API_URL, apiKey } from "../helpers/Constant";

const LocationSearch = () => {
  const [searchText, setSearchText] = useState("");
  const [locData, setLocData] = useState([]);
  async function getLocation() {
    const data = await fetch(GET_LOCATION_API_URL + searchText, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": `${apiKey}`,
        "X-RapidAPI-Host":
          "india-pincode-with-latitude-and-longitude.p.rapidapi.com",
      },
    });
    const json = await data.json();
    console.log(json);
  }
  const handleChildState = () => {};
  const handelKeyPress = (event) => {
    if (
      (typeof Number(searchText) === "number" && searchText.length === 6) ||
      event.key === "Enter"
    ) {
      getLocation();
    }
  };
  return (
    <div className="slide-in z-50 min-h-[100vh-80px] flex">
      <div
        className="w-full left-0 h-full bg-gray-400 fixed opacity-50"
        onClick={() => {
          handleChildState();
        }}
      ></div>
      <div className="min-w-[100%] left-0 h-full bg-white z-50 fixed shadow-xl">
        <div className="flex-col items-center max-w-[80%] mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 my-7 cursor-pointer"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#3d4152"
            onClick={() => {
              handleChildState();
            }}
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
          <div className="flex my-auto border-2 w-full shadow-[0px_1px_12px_1px_#d4d5d9]">
            <input
              className="focus: outline-none py-2 px-3 flex-1"
              type="text"
              placeholder="Enter Pincode"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => handelKeyPress(e)}
            />
            {searchText === "" ? (
              <></>
            ) : (
              <div
                className="text-orange font-medium text-sm pr-2 tracking-tight cursor-pointer self-center"
                onClick={() => {
                  setSearchText("");
                }}
              >
                Cancel
              </div>
            )}
                  </div>
                  <div>{isload}</div>
        </div>
      </div>
    </div>
  );
};

export default LocationSearch;
