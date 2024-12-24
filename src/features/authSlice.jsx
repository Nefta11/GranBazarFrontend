import { createSlice } from '@reduxjs/toolkit';
const initState = {
    id: null,
    type: null,
    session: false,
    token: null,
    name: "",
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: initState,
    reducers: {
        logIn: (state, action) => {
            return { ...state, ...action.payload, session: true };
        },
        logOut: () => {
            return initState;
        },
    },
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
