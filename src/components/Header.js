import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.jpeg";
import LocationSearch from "./LocationSearch";
import { useDispatch, useSelector } from "react-redux";
import { locSearch } from "../Utils/locationSearchVisibilitySlice";
const Header = () => {
  const dispatch = useDispatch();
  const locDetails = useSelector((store) => store.location.locationDetails);
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [locationsearchIsVisible, setLocationSearchIsVisible] = useState(false);

  const handleLocationClick = () => {
    if (!locationsearchIsVisible) {
      setLocationSearchIsVisible(true);
      dispatch(locSearch(true));
      if (typeof window != "undefined" && window.document) {
        document.body.style.overflow = "hidden";
      }
    }
  };
  useEffect(() => {
    if (locDetails[0]) {
      setArea(locDetails[0].area);
      setCity(locDetails[0].district);
      setState(locDetails[0].state);
    }
  }, [locDetails]);

  return (
    <>
      <div>
        {locationsearchIsVisible && (
          <LocationSearch
            childState={locationsearchIsVisible}
            setChildState={setLocationSearchIsVisible}
          />
        )}
      </div>
      <div
        className={`header flex items-center justify-around z-10 w-screen bg-[#edf7f9] ${
          locationsearchIsVisible ? "opacity-50 bg-transparent" : ""
        }`}
        onClick={() => {
          if (locationsearchIsVisible) {
            setLocationSearchIsVisible(false);
            document.body.style.overflow = "unset";
            dispatch(locSearch(false));
          }
        }}
      >
        <div className="max-w-[25%] flex items-center gap-2">
          <img className="w-24 h-24 pl-4" src={logo} alt="logo" />
          <div
            className="cursor-pointer flex truncate self-center"
            onClick={() => handleLocationClick()}
          >
            <h2
              className="text-sm truncate"
              title={area + ", " + city + ", " + state}
            >
              <span className="text-md mr-1 leading tracking-tight font-bold border-b border-black hover:text-orange-500">
                Other
              </span>

              {area + ", " + city + ", " + state}
            </h2>
            <FontAwesomeIcon icon={faChevronDown} className="text-orange-500" />
          </div>
        </div>
        <>
          <ul className="list-none flex">
            <li>
              <h2>Search</h2>
            </li>
            <li>
              <h2>Help</h2>
            </li>
            <li>
              <h2>Sign In</h2>
            </li>
          </ul>
        </>
      </div>
    </>
  );
};

export default Header;
