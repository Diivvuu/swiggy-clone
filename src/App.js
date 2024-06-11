// App.js
import React from "react";
import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import Header from "./components/Header";
import store from "./Utils/store";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Search from "./components/Search";
import Help from "./components/Help";
import SignIn from "./components/SignIn";
import Cart from "./components/Cart";
import Clone from "./components/Clone";
import RestaurantMenu from "./components/RestaurantMenu";
import MenuSearch from "./components/MenuSearch";
const AppLayout = () => {
  return (
    <Provider store={store}>
      <Header />
      <Outlet />
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "contact", // Use relative path for nested routes
        element: <Contact />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "help",
        element: <Help />,
      },

      {
        path: "profile",
        element: <SignIn />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "restaurant/:id",
        element: <RestaurantMenu />,
      },
      {
        path: "menusearch/:id",
        element: <MenuSearch />,
      },
    ],
  },
]);

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={appRouter} />
    </Provider>
  );
};

export default App;
