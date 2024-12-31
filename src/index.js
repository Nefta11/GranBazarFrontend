import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store/store";
import App from "./App";
import { logIn } from "../src/features/authSlice";

const RootComponent = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth); // Obtén el estado de autenticación

  useEffect(() => {
    const authData = localStorage.getItem("tokenUser");
    if (authData) {
      const parsedData = JSON.parse(authData);
      dispatch(logIn(parsedData));
      console.log("parsedData", parsedData);
    }
  }, [dispatch]);

  // Verificación del token y logging
  const token = auth.token;

  useEffect(() => {
    if (token) {
      console.log("Siuu Ya hay token y es :", token);
    } else {
      console.log("No hay token Terrible");
    }
  }, [token]); // Se ejecuta cada vez que el token cambia

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
