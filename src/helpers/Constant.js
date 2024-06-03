export const shimmer_display_count = 8;
export const GET_LOCATION_API_URL =
  "https://india-pincode-with-latitude-and-longitude.p.rapidapi.com/api/v1/pincode/";
export const apiKey = "3e4e471433mshb90d2fd16ca0a7ep12ca07jsnf69a5e6732d7";
export const swiggyAPI = (lat, lng) => {
  return `https://foodfire.onrender.com/api/restaurants?lat=${lat}&lng=${lng}&page_type=DESKTOP_WEB_LISTING`;
};
export const IMG_CDN_URL =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/";

export const CDN_URL =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";

export const MENU_API =
  "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9715987&lng=77.5945627&restaurantId=";
export const ITEM_API =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/";
// export const LOGO_URL =
//   'https://png.pngtree.com/png-vector/20230217/ourmid/pngtree-food-logo-design-for-restaurant-and-business-png-image_6604922.png';
export const WOYM_CARD_IMG_CDN_URL =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/";
export const RES_CARD_IMG_CDN_URL =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";
export const APP_IMG_CDN_URL =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/";
export const swiggySearchAPI = (lat, lng) => {
  return `https://www.swiggy.com/dapi/landing/PRE_SEARCH?lat=${lat}&lng=${lng}`;
};

export const footer_content = [
  {
    id: "100",
    title: "Company",
    data: [
      "About",
      "Careers",
      "Team",
      "Chef-2-Door One",
      "Chef-2-Door Instamart",
      "Chef-2-Door Genie",
    ],
  },
  {
    id: "101",
    title: "Contact Us",
    data: ["Help & Support", "Partner with us", "Ride with us"],
  },
  {
    id: "102",
    title: "Legal",
    data: [
      "Terms & Conditions",
      "Cookie Policy",
      "Privacy Policy",
      "Investor Relations",
    ],
  },
];
