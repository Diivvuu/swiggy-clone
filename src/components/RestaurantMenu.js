import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import useRestaurantMenu from "../Hooks/useRestaurantMenu";
import { useParams, Link } from "react-router-dom";
import {
  DELIVERY_DISTANCE_IMG,
  MENU_OFFERS_CDN_URL,
} from "../helpers/Constant";
import OfferSlider from "./OfferSlider";
import OfferCard from "./OfferCard";
import MenuCategory from "./MenuCategory";
import MenuSearch from "./MenuSearch";

const RestaurantMenu = () => {
  const { id } = useParams();
  const [resDetails, resOffers, resMenu] = useRestaurantMenu(id);
  const [activeLink, setActiveLink] = useState(null);
  const resDetailsData = {
    id: resDetails?.id,
    name: resDetails?.name,
    areaName: resDetails?.areaName,
    cloudinaryImageId: resDetails?.cloudinaryImageId,
    slaString: resDetails?.sla?.slaString,
    lastMileTravelString: resDetails?.sla?.lastMileTravelString,
    deliveryFee: resDetails?.feeDetails?.totalFee,
  };
  // const handleNavClick = (path) => {
  //   setActiveLink(path);
  //   window.scrollTo({
  //     top: 0,
  //     left: 0,
  //     behavior: "smooth",
  //   });
  // };
  // const isActive = (path) => {
  //   return path === activeLink;
  // };
  // console.log(resMenu);
  return (
    <div className="flex justify-center pt-28 w-screen">
      <div className="container w-[50%]">
        <h4 className="text-xs text-left text-[#93959f]">
          Home/{resDetails?.city}/{resDetails?.name}
        </h4>
        <div className="mx-3">
          <h1 className="font-[700] pt-8 text-2xl">{resDetails?.name}</h1>
          <div className="mt-6 bg-gradient-to-b from-white to-[#dcdce3] p-4 rounded-3xl">
            <div className="flex flex-col mx-auto p-4 rounded-3xl bg-white">
              <div className="flex items-center font-semibold">
                <FontAwesomeIcon
                  icon={faStar}
                  className="bg-green-700 text-xs text-white p-1 rounded-full"
                />
                <h2 className="ml-2 text-lg">
                  {resDetails?.avgRatingString} (
                  {resDetails?.totalRatingsString}) • ₹
                  {resDetails?.costForTwo / 100} for two
                </h2>
              </div>
              <div className="mt-2 text-[#f26618] font-[600]">
                {resDetails?.cuisines.join(", ")}
              </div>
              <div className="flex gap-3 items-center mt-2">
                <div className="flex flex-col justify-center items-center">
                  <div className="h-2 w-2 bg-[#c4c4c4] rounded-full"></div>
                  <div className="h-[1.5rem]  bg-[#c4c4c4] w-[0.1rem]"></div>
                  <div className="h-2 w-2 bg-[#c4c4c4] rounded-full"></div>
                </div>
                <div>
                  <div className="flex gap-2">
                    <p className="font-semibold"> Outlet</p>
                    <p className="text-[#777a7d]">{resDetails?.areaName}</p>
                  </div>
                  <div>
                    <p className="font-semibold">
                      {resDetails?.sla?.minDeliveryTime}-
                      {resDetails?.sla?.maxDeliveryTime} mins
                    </p>
                  </div>
                </div>
              </div>
              <hr className="border-t-1 border-gray-400 my-3" />
              <div className="flex items-center gap-1.5">
                <img
                  src={DELIVERY_DISTANCE_IMG}
                  alt="DISTANCE"
                  className="w-5"
                />
                <p
                  className="font-[500] text-[#848484]"
                  dangerouslySetInnerHTML={{
                    __html: String(resDetails?.feeDetails?.message),
                  }}
                ></p>
              </div>
            </div>
          </div>
        </div>
        {resOffers && (
          <>
            <hr className="my-8"></hr>
            <div className="flex justify-between items-center px-4">
              <h2 className="font-bold text-2xl leading-3 tracking-tight">
                Deals For You
              </h2>
              <OfferSlider
                className="offerSlider"
                key="offerSlider"
                amount={450}
              />
            </div>
            <div className="offerSlider container-snap p-4 gap-x-8 flex mt-4 mb-2 overflow-x-auto">
              {resOffers.map((offer, index) => {
                return (
                  <OfferCard
                    key={index} // It's better to use a unique key for each item in the array
                    offerLogo={offer.offerLogo}
                    header={offer.header}
                    couponCode={offer.couponCode}
                  />
                );
              })}
            </div>
          </>
        )}
        <p className="py-4 text-center leading-loose">M E N U</p>
        <div>
          <Link to={"/menusearch/" + id}>Search</Link>
        </div>
        <div>
          {resMenu && (
            <>
              <div>
                {resMenu?.map((category) => {
                  return (
                    <MenuCategory
                      {...category}
                      key={{ ...category }.title}
                      resDetailsData={resDetailsData}
                    />
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
