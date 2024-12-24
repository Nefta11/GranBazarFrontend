import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';

// Configuración de la tienda de Redux
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
