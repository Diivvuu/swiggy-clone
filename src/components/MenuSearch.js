import {
  faLeftLong,
  faSearch,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import useRestaurantMenu from "../Hooks/useRestaurantMenu";
import { Link, useParams } from "react-router-dom";
import Item from "./Item"; // Import the Item component
import { useDispatch } from "react-redux";
import { addItems } from "../Utils/cartSlice";
import MyContext from "../Utils/MyContext";

const MenuSearch = () => {
  const { id } = useParams();
  const context = useContext(MyContext);
  const dispatch = useDispatch();
  const [resDetails, resOffers, resMenu] = useRestaurantMenu(id);
  const [searchText, setSearchText] = useState("");
  const [filteredSearchResList, setFilteredSearchResList] = useState([]);
  const handleSearch = () => {
    const filteredData = resMenu.map((list) => {
      return list?.itemCards?.filter((item) =>
        item?.card?.info?.name
          ?.toLowerCase()
          ?.includes(searchText?.toLowerCase())
      );
    });
    setFilteredSearchResList(filteredData);
    console.log(filteredData);
  };
  useEffect(() => {
    handleSearch();
  }, [searchText]);
  const handleResCartChange = () => {
    context.showResCartAlert(); // Corrected method name
  };

  const handleAddToCart = (item) => {
    // Implement the logic to add the item to the cart here
    dispatch(addItems(item));
    console.log("Adding item to cart:", item);
  };

  const handleRemoveFromCart = (itemId) => {
    // Implement the logic to remove the item from the cart here
    console.log("Removing item from cart:", itemId);
  };
  const handleBack = () => {};
  return (
    <div className="flex flex-col items-center justify-start w-[70%] pt-40 mx-auto">
      <div className="flex justify-between items-center w-full relative bg-[#f0f0f5]">
        <Link to={"/restaurant/" + id}>
          <div className="pl-3">
            <FontAwesomeIcon icon={faLeftLong} />
          </div>
        </Link>
        <input
          type="text"
          className="placeholder:text-black bg-[#f0f0f5] pl-12 py-3 w- placeholder:text-center rounded-xl focus:outline-none placeholder:font-bold"
          placeholder="Search for dishes here"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <div className="pr-3 flex items-center bg-[#f0f0f5]">
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
            {filteredSearchResList &&
              filteredSearchResList.map((itemList, index) => (
                <div key={index}>
                  {itemList.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      {/* Pass down functions to handle adding/removing items from the cart */}
                      <Item
                        {...item.card.info}
                        handleAddToCart={handleAddToCart}
                        handleRemoveFromCart={handleRemoveFromCart}
                      />
                    </div>
                  ))}
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default MenuSearch;
