import { createSlice } from '@reduxjs/toolkit';

const initState = {
    user: {
        id: null,
        name: "",
        type: null,
    },
    token: null,
    session: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: initState,
    reducers: {
        logIn: (state, action) => {
            const { id, name, type, token } = action.payload;
            state.user = { id, name, type };
            state.token = token;
            state.session = true;
        },
        logOut: () => initState,
    },
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
