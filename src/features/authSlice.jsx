import { createSlice } from '@reduxjs/toolkit';

// Estado inicial para autenticación
const initState = {
    id: null,
    type: null,
    session: false,
    token: null,
    name: "",
};

// Slice de autenticación
export const authSlice = createSlice({
    name: 'auth',
    initialState: initState,
    reducers: {
        logIn: (state, action) => {
            const newState = { ...state, ...action.payload, session: true };
            return newState;
        },
        logOut: () => {
            return initState; // Restaura el estado inicial
        },
    },
});

// Exportar las acciones
export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
