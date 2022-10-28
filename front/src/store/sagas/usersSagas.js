import axiosApi from "../../axiosApi";
import {put, takeEvery} from "redux-saga/effects";
import {
    facebookLoginRequest,
    googleLoginRequest,
    loginFailure, loginRequest,
    loginSuccess,
    logoutRequest
} from "../actions/usersActions";
import {addNotification} from "../actions/notifierActions";
import {historyPush} from "../actions/historyActions";

export function* loginUserSaga({payload: userData}) {
    try {
        const response = yield axiosApi.post('/users/sessions', userData);
        yield put(loginSuccess(response.data.user));
        yield put(addNotification({message: 'Login successful!', variant: 'success'}));
        yield put(historyPush('/'));
    } catch (e) {
        yield put(loginFailure(e.response.data));
    }
}

export function* facebookLoginUserSaga({payload: userData}) {
    try{
        const response = yield axiosApi.post('/users/facebookLogin', userData);
        yield put(loginSuccess(response.data.user));
        yield put(addNotification({message: 'Facebook Login Successful', variant: 'success'}));
        yield put(historyPush('/'));
    } catch (e) {
        yield put(loginFailure(e.response.data));
    }
}

export function* googleLoginUserSaga({payload: userData}) {
    try{
        console.log(userData);
        const response = yield axiosApi.post('/users/googleLogin', {token: userData.tokenId});
        yield put(loginSuccess(response.data.user));
        yield put(addNotification({message: 'Google Login Successful', variant: 'success'}));
        yield put(historyPush('/'));
    } catch (e) {
        yield put(loginFailure(e.response.data));
    }
}

export function* logoutUser(getState) {
    try{
        const token = getState().users.user.token;
        const headers = {'Authorization': token};
        yield axiosApi.delete('/users/sessions', {headers});
        yield put(historyPush('/login'));
    } catch (e) {
    }
}

const userSagas = [
    takeEvery(loginRequest, loginUserSaga),
    takeEvery(facebookLoginRequest, facebookLoginUserSaga),
    takeEvery(googleLoginRequest, googleLoginUserSaga),
    takeEvery(logoutRequest, logoutUser)
];

export default userSagas;