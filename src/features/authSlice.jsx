import { createSlice } from "@reduxjs/toolkit";

// Estado inicial para autenticación
const initState = {
    id: null,
    type: null,
    session: false,
    token: null,
    name: "",
    email: "",
};

// Slice de autenticación
export const authSlice = createSlice({
    name: "auth",
    initialState: initState,
    reducers: {
        logIn: (state, action) => {
            const { id, type, token, name, email } = action.payload || {};
            state.id = id || state.id;
            state.type = type || state.type;
            state.session = true;
            state.token = token;
            state.name = name;
            state.email = email;
        },
        logOut: () => {
            return initState; // Restaura el estado inicial
        },
    },
});

// Exportar las acciones y el reducer
export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
