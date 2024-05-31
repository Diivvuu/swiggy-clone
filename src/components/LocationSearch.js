import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { GET_LOCATION_API_URL, apiKey } from "../helpers/Constant";
import { locSearch } from "../Utils/locationSearchVisibilitySlice";
import { updateLocation } from "../Utils/locationSlice";
import locationUnservicable from "../assets/location_unserviceable.webp";

const LocationSearch = ({ childState, setChildState }) => {
  const [searchText, setSearchText] = useState("");
  const [locData, setLocData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  async function getLocation() {
    setIsLoading(true);
    setError(null); // Reset error state
    try {
      const response = await fetch(GET_LOCATION_API_URL + searchText, {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host":
            "india-pincode-with-latitude-and-longitude.p.rapidapi.com",
        },
      });

      if (!response.ok) {
        // Handle non-200 HTTP responses
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      if (Array.isArray(json) && json.length === 0) {
        setLocData(["noresults"]);
      } else {
        setLocData(json);
      }
    } catch (error) {
      console.error("Error fetching location data:", error);
      setError("Invalid pincode. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleChildState = () => {
    setChildState(false);
    dispatch(locSearch(false));
    setSearchText("");
    document.body.style.overflow = "unset";
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

  const handleKeyPress = (event) => {
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
      <div className="xl:min-w-[33%] lg:min-w-[33%] md:min-w-[37%] min-w-[100%] left-0 h-full bg-white z-50 fixed shadow-xl">
        <div className="flex-col items-center xl:ml-auto xl:mr-8 xl:max-w-[67%] lg:ml-auto lg:mr-8 lg:max-w-[72%] md:mx-auto md:max-w-[95%] max-w-[80%] mx-auto">
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
              type="text"
              className="focus:outline-none py-2 px-3 flex-1"
              placeholder="Enter Pincode"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => handleKeyPress(e)}
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
          <div className="container-snap max-h-[calc(100vh-100px)] overflow-y-auto">
            {isLoading ? (
              <div className="flex flex-col p-6 items-center justify-center">
                <div className="loading-spinner" />
                <h2>Loading</h2>
              </div>
            ) : error ? (
              <div className="text-center">
                <img
                  src={locationUnservicable}
                  alt="locationUnservicable"
                  className="h-48 mx-auto my-10"
                />
                <h2 className="text-xl font-bold tracking-tight text-[#282c3f]">
                  {error}
                </h2>
              </div>
            ) : locData && locData[0] !== "noresults" ? (
              locData?.map((x, index) => (
                <div
                  className="flex p-6 mx-auto cursor-pointer border-b border-dashed"
                  key={index}
                  onClick={() => handleSubmit(index)}
                >
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
                  <div className="flex-1 pl-2 flex-col w-full">
                    <h1 className="text-[#282c3f] font-medium leading-3 text-base truncate py-2">
                      {x.area}
                    </h1>
                    <h2 className="text-[#93959f] font-thin text-sm truncate">
                      {x.district}, {x.state}
                    </h2>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center">
                <img
                  src={locationUnservicable}
                  alt="locationUnservicable"
                  className="h-48 mx-auto my-10"
                />
                <h2 className="text-xl font-bold tracking-tight text-[#282c3f]">
                  No results
                </h2>
                <h3 className="text-[#93959f] text-sm font-light tracking-tight leading-3 pt-3">
                  Are you sure you entered the right pincode?
                </h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationSearch;
