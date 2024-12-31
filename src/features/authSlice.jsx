import { createSlice } from '@reduxjs/toolkit';

const initState = {
    user: {
        id: null,
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        birthday: "",
    },
    token: null,
    session: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: initState,
    reducers: {
        logIn: (state, action) => {
            const { id, first_name, last_name, email, phone, birthday, token } = action.payload;
            state.user = { id, firstName: first_name, lastName: last_name, email, phone, birthday };
            state.token = token;
            state.session = true;
        },
        logOut: () => initState,
    },
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
