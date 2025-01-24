import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store/store";
import App from "./App";
import { logIn } from "../src/features/authSlice";

// Función reutilizable para cargar datos desde localStorage
const loadAuthDataFromStorage = () => {
  try {
    const authData = localStorage.getItem("authData");
    return authData ? JSON.parse(authData) : null;
  } catch (error) {
    console.error("Error leyendo authData de localStorage:", error);
    return null;
  }
};

const RootComponent = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token); // Solo seleccionamos el token

  // Cargar datos de autenticación al montar el componente
  useEffect(() => {
    const authData = loadAuthDataFromStorage();
    if (authData) {
      dispatch(logIn(authData));
      console.log("Datos cargados desde localStorage:", authData);
    } else {
      console.log("No se encontraron datos en localStorage");
    }
  }, [dispatch]);

  // Verificar el token y realizar acciones condicionales
  useEffect(() => {
    if (token) {
      console.log("Siuu Ya hay token y es:", token);
    } else {
      console.log("No hay token. Terrible.");
    }
  }, [token]);

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
