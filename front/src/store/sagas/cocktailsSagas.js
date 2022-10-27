import axiosApi from "../../axiosApi";
import {put, takeEvery} from "redux-saga/effects";
import {addNotification} from "../actions/notifyActions";
import {
    fetchAllCocktailsFailure,
    fetchAllCocktailsRequest,
    fetchAllCocktailsSuccess, fetchCocktailFailure, fetchCocktailRequest, fetchCocktailSuccess
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

export function* fetchCocktail({payload: id}) {
    try{
        const response = yield axiosApi('/cocktails/' + id);
        console.log(response);
        yield put(fetchCocktailSuccess(response.data));
    } catch (e) {
        yield put(fetchCocktailFailure(e.response.data));
        yield put(addNotification('Fetch Cocktail failed!', 'error'));
    }
}

const cocktailSagas = [
    takeEvery(fetchAllCocktailsRequest, fetchAllCocktails),
    takeEvery(fetchCocktailRequest, fetchCocktail)
];

export default cocktailSagas;

