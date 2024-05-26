import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { GET_LOCATION_API_URL, apiKey } from "../helpers/Constant";
import { locSearch } from "../Utils/locationSearchVisibilitySlice";
import { updateLocation } from "../Utils/locationSlice";

const LocationSearch = ({ childState, setChildState }) => {
  const [searchText, setSearchText] = useState("");
  const [locData, setLocData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  async function getLocation() {
    setIsLoading(true);
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
    setIsLoading(false);
    if (json.length === 0) {
      setLocData(["noresults"]);
    } else {
      setLocData(json);
    }
  }

  const handleChildState = () => {
    setChildState(false);
    dispatch(locSearch(false));
    setSearchText("");
    document.body.style.overflow = "unset";
  };
  const handleKeyPress = (event) => {
    if (
      (typeof Number(searchText) === "number" && searchText.length === 6) ||
      event.key === "Enter"
    ) {
      getLocation();
    }
  };
  const handleSubmit = (index) => {
    dispatch(updateLocation([locData[index]]));
    setChildState(false);
    dispatch(locSearch(false));
    document.body.style.overflow = "unset";
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
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
          <div className="flex my-auto border-2 w-full">
            <input
              type="text"
              value={searchText}
              placeholder="Enter your Pincode"
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => handleKeyPress(e)}
            />
            {searchText === "" ? (
              <></>
            ) : (
              <div
                onClick={() => {
                  setSearchText("");
                }}
              >
                Cancel
              </div>
            )}
          </div>
          <div>
            {isLoading ? (
              <div className="flex flex-col p-6 items-center justify-center">
                <div className="loading-spinner" />
                <h2>Loading</h2>
              </div>
            ) : locData && locData[0] !== "noresults" ? (
              locData?.map((x, index) => {
                return (
                  <div
                    className="flex"
                    key={index}
                    onClick={() => handleSubmit(index)}
                  >
                    {" "}
                    <svg
                      viewBox="0 0 24 24"
                      fill="#535665"
                      className="w-5 h-5 mt-1"
                    >
                      <path d="M12 13.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                      <path
                        fillRule="evenodd"
                        d="M19.071 3.429C15.166-.476 8.834-.476 4.93 3.429c-3.905 3.905-3.905 10.237 0 14.142l.028.028 5.375 5.375a2.359 2.359 0 003.336 0l5.403-5.403c3.905-3.905 3.905-10.237 0-14.142zM5.99 4.489A8.5 8.5 0 0118.01 16.51l-5.403 5.404a.859.859 0 01-1.214 0l-5.378-5.378-.002-.002-.023-.024a8.5 8.5 0 010-12.02z"
                      />
                    </svg>
                    <div>{x.area + x.district}</div>
                  </div>
                );
              })
            ) : (
              <div>
                <h2>No results</h2>
                <h3>Are you sure you entered the right pincode?</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationSearch;
