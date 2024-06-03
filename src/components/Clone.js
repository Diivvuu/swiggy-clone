import React from "react";
import usePopularCuisinesData from "../Hooks/usePopularCuisinesData";
const Clone = () => {
  const [popularCuisines, latitude, longitude] = usePopularCuisinesData();
  console.log(latitude);
  console.log(longitude);

  return (
    <div className="pt-40">
      <h1 className="">Test</h1>
    </div>
  );
};

export default Clone;
