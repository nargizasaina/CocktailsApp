import usersSlice from "../slices/usersSlices";

export const {
    loginRequest,
    loginSuccess,
    loginFailure,
    facebookLoginRequest,
    googleLoginRequest,
    logoutRequest
} = usersSlice.actions;