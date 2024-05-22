import React, { useState } from "react";
import logo from "../assets/logo.jpeg";
import LocationSearch from "./LocationSearch";
import { useDispatch } from "react-redux";
import { locSearch } from "../Utils/locationSearchVisibilitySlice";
const Header = () => {
  const dispatch = useDispatch();
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

  return (
    <div>
      <div className="absolute w-screen h-24 bg-[#edf7f9]">
        <div>
          <img className="w-24 h-24 pl-4" src={logo} />
        </div>
        <div onClick={() => handleLocationClick()}>
          <h2 title={area + ", " + city + ", " + state}>
            <span>Other</span>
            {area + ", " + city + ", " + state}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Header;
