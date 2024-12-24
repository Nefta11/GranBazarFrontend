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
            const newState = { ...state, ...action.payload, session: true };
            saveValue("token", newState.token);
            return newState;
        },
        logOut: () => {
            deleteValue("token");
            return initState;
        },
    },
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
