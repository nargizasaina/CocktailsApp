import usersSlice from "../slices/usersSlices";

export const {
    facebookLoginRequest,
    googleLoginRequest,
    loginSuccess,
    loginFailure,
    logoutRequest
} = usersSlice.actions;