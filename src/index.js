import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import store from "./store/store";
import App from "./App";
import { logIn } from "../src/features/authSlice";
import { Provider, useDispatch, useSelector } from "react-redux";

const RootComponent = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const verifyLogin = async () => {
      try {
        const tokenUser = localStorage.getItem("tokenUser");
        if (tokenUser) {
          const userData = JSON.parse(tokenUser);
          dispatch(logIn(userData));
        }
      } catch (error) {
        console.error("Error al verificar el login:", error);
      }
    };

    verifyLogin();

    if (token) {
      // console.log("Siuu Ya hay token y es :", token);
    } else {
      // console.log("No hay token Terrible");
    }
  }, [dispatch, token]);

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
