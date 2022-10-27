import axiosApi from "../../axiosApi";
import {put, takeEvery} from "redux-saga/effects";
import {addNotification} from "../actions/notifyActions";
import {
    fetchAllCocktailsFailure,
    fetchAllCocktailsRequest,
    fetchAllCocktailsSuccess
} from "../actions/cocktailsActions";

export function* fetchAllCocktails() {
    try{
        const response = yield axiosApi('/cocktails');
        yield put(fetchAllCocktailsSuccess(response.data));
    } catch (e) {
        yield put(fetchAllCocktailsFailure(e.response.data));
        yield put(addNotification('Fetch Cocktails failed!', 'error'));
    }
}

const cocktailSagas = [
    takeEvery(fetchAllCocktailsRequest, fetchAllCocktails)
];

export default cocktailSagas;

