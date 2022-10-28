import {createSlice} from "@reduxjs/toolkit";

const name = 'users';

export const initialState = {
    user: null,
    loading: false,
    error: null
};

const usersSlice = createSlice({
    name,
    initialState,
    reducers: {
        loginRequest(state) {
            state.loading = true;
            state.error = null;
        },
        loginSuccess(state, {payload: user}) {
            state.loading = false;
            state.user = user;
        },
        loginFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },

        googleLoginRequest(state) {
            state.loading = true;
            state.error = null;
        },
        facebookLoginRequest(state) {
            state.loading = true;
            state.error = null;
        },

        logoutRequest(state) {
            state.user = null;
        },
    }
});

export default usersSlice;