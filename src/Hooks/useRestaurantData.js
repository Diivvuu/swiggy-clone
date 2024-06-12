import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { swiggyAPI } from "../helpers/Constant";

const useRestaurantData = () => {
  const locDetails = useSelector((store) => store.location.locationDetails);
  const [latitude, setLatitude] = useState(locDetails[0].lat);
  const [longitude, setLongitude] = useState(locDetails[0].lng);
  const [city, setCity] = useState(locDetails[0].district);
  const [notServicable, setNotServicable] = useState([]);
  const [topicalBanner, setTopicalBanner] = useState([]);
  const [WOYM, setWOYM] = useState([]);
  const [sort, setSort] = useState([]);
  const [resList, setResList] = useState([]);
  const [topResList, setTopResList] = useState([]);
  const [filteredResList, setFilteredResList] = useState([]);
  const [appInstallLinks, setAppInstallLinks] = useState([]);
  const [footerCities, setFooterCities] = useState([]);
  const [bestPlaces, setBestPlaces] = useState([]);
  const [bestCuiNearMe, setBestCuiNearMe] = useState([]);
  const [expResNearMe, setExpResNearMe] = useState([]);
  async function getRestaurants(latitude, longitude) {
    try {
      setResList([]);
      const data = await fetch(swiggyAPI(latitude, longitude));
      const json = await data.json();
      const notDeliverable = json?.data?.cards
        ?.map((x) => {
          return x?.card?.card;
        })
        ?.filter((x) => {
          return x["id"] === "swiggy_not_present";
        });
      const topicalBannerData = json?.data?.cards
        ?.map((x) => {
          return x?.card?.card;
        })
        ?.filter((x) => {
          return x["id"] === "topical_banner";
        })
        ?.map((x) => {
          return x?.imageGridCards?.info;
        });
      const WOYMData = json?.data?.cards
        ?.map((x) => {
          return x?.card?.card;
        })
        ?.filter((x) => {
          return x["id"] === "whats_on_your_mind";
        })
        ?.map((x) => {
          //we have to get all the images in the whats on your mind with image grid
          return x?.imageGridCards?.info;
        });
      const topResListData = json?.data?.cards
        ?.map((x) => {
          return x?.card?.card;
        })
        ?.filter((x) => {
          return x["id"] === "top_brands_for_you";
        })
        ?.map((x) => {
          //we have to map restaurants for top list (whats on your mind, they are inside gridElements.infoWithStyle.restaurants)
          return x?.gridElements?.infoWithStyle?.restaurants;
        });
      const sortData = json?.data?.cards
        ?.map((x) => {
          return x?.card?.card;
        })
        ?.filter((x) => {
          return x.sortConfigs;
        })
        ?.map((x) => {
          return x.sortConfigs;
        });
      const resListData = json?.data?.cards
        ?.map((x) => {
          return x?.card?.card;
        })
        ?.filter((x) => {
          return x["id"] === "restaurant_grid_listing";
        })
        ?.map((x) => {
          return x?.gridElements?.infoWithStyle?.restaurants;
        });
      const appInstallLinksData = json?.data?.cards
        ?.map((x) => {
          return x?.card?.card;
        })
        ?.filter((x) => {
          return x["id"] === "app_install_links";
        });
      const footerCitiesData = json?.data?.cards
        ?.map((x) => {
          return x?.card?.card;
        })
        ?.filter((x) => {
          return x["id"] === "footer_content";
        })
        ?.map((x) => {
          return x.cities;
        });
      const bestPlacesData = json?.data?.cards
        ?.map((x) => {
          return x?.card?.card;
        })
        ?.filter((x) => {
          return x["title"] === "Best Places to Eat Across Cities";
        })
        ?.map((x) => {
          return x?.brands;
        });

      const bestCuiNearMeData = json?.data?.cards
        ?.map((x) => {
          return x?.card?.card;
        })
        ?.filter((x) => {
          return x["title"] === "Best Cuisines Near Me";
        })
        ?.map((x) => {
          return x?.brands;
        });
      const expResNearMeData = json?.data?.cards
        ?.map((x) => {
          return x?.card?.card;
        })
        .filter((x) => {
          return x["title"] === "Explore Every Restaurants Near Me";
        })
        ?.map((x) => {
          return x?.brands;
        });

      // setTopicalBanner(...topicalBannerData);
      setWOYM(...WOYMData);
      setTopResList(...topResListData);
      setSort(...sortData);
      setResList(...resListData);
      setFilteredResList(...resListData);
      setAppInstallLinks(...appInstallLinksData);
      setFooterCities(...footerCitiesData);
      setBestPlaces(...bestPlacesData);
      setBestCuiNearMe(...bestCuiNearMeData);
      setExpResNearMe(...expResNearMeData);
      setNotServicable(...notDeliverable);
    } catch (err) {
      console.log("Error : ", err);
    }
  }
  useEffect(() => {
    if (locDetails && locDetails[0]) {
      const newLatitude = locDetails[0].lat;
      const newCity = locDetails[0].district;
      const newLongitude = locDetails[0].lng;
      setLatitude(newLatitude);
      setCity(newCity);
      setLongitude(newLongitude);
      getRestaurants(newLatitude, newLongitude);
    }
  }, [locDetails]);
  return [
    // topicalBanner,
    WOYM,
    topResList,
    sort,
    resList,
    filteredResList,
    setFilteredResList,
    appInstallLinks,
    footerCities,
    bestPlaces,
    bestCuiNearMe,
    expResNearMe,
    notServicable,
  ];
};

export default useRestaurantData;
