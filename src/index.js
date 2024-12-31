import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import store from "./store/store";
import App from "./App";
import { logIn } from "../src/features/authSlice";
import { Provider, useDispatch } from "react-redux";

const RootComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const authData = localStorage.getItem("authData");
    if (authData) {
      const parsedData = JSON.parse(authData);
      dispatch(logIn(parsedData));
      console.log("parsedData", parsedData);
    }
  }, [dispatch]);

  return <App />;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RootComponent />
    </Provider>
  </React.StrictMode>
);
