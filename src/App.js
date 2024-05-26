import React from "react";
import Header from "./components/Header";
import { Provider } from "react-redux";
import store from "./Utils/store";
import LocationSearch from "./components/LocationSearch";

function App() {
  return (
    <Provider store={store}>
      <Header />
    </Provider>
  );
}

export default App;
