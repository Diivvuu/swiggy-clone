import React from "react";
import Unserviceable_img from "../assets/location_unserviceable.webp";
const Unserviceable = () => {
  return (
    <div className="flex flex-col justify-center items-center pt-52 pb-24 w-80 mx-auto">
      <img className="w-72" alt="unserviceable" src={Unserviceable_img} />
      <h1 className="text-2xl font-bold py-4 ">Location Unserviceable</h1>
      <h2 className="text-[#727577] text-center">
        We don't have any services here till now, Try Changing location.
      </h2>
    </div>
  );
};

export default Unserviceable;
