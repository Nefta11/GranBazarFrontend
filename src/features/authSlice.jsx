import { createSlice } from '@reduxjs/toolkit';

// Estado inicial para autenticación
const initState = {
    id: null,
    type: null,
    session: false,
    token: null,
    name: "",
    user: null, // Añadir campo para los datos del usuario
};

// Slice de autenticación
export const authSlice = createSlice({
    name: 'auth',
    initialState: initState,
    reducers: {
        logIn: (state, action) => {
            const newState = { 
                ...state, 
                ...action.payload, 
                session: true,
                token: action.payload.token, 
                user: action.payload.user 
            };
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
