import axiosApi from "../../axiosApi";
import {put, takeEvery} from "redux-saga/effects";
import {addNotification} from "../actions/notifyActions";
import {
    createCocktailFailure, createCocktailRequest,
    fetchAllCocktailsFailure,
    fetchAllCocktailsRequest,
    fetchAllCocktailsSuccess,
    fetchCocktailFailure,
    fetchCocktailRequest,
    fetchCocktailSuccess,
    fetchMyCocktailsFailure, fetchMyCocktailsRequest,
    fetchMyCocktailsSuccess
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
        yield put(fetchCocktailSuccess(response.data));
    } catch (e) {
        yield put(fetchCocktailFailure(e.response.data));
        yield put(addNotification('Fetch Cocktail failed!', 'error'));
    }
}

export function* fetchMyCocktails() {
    try{
        const response = yield axiosApi('/cocktails?addedBy=user');
        console.log(response);
        yield put(fetchMyCocktailsSuccess(response.data));
    } catch (e) {
        yield put(fetchMyCocktailsFailure(e.response.data));
        yield put(addNotification('Fetch my Cocktails failed!', 'error'));
    }
}

export function* createCocktail({payload: cocktailData}) {
    console.log(cocktailData, 'DATA')
    try {
        yield axiosApi.post('/cocktails', cocktailData);
    } catch (e) {
        yield put(createCocktailFailure(e.response.data));
        yield put(addNotification('Create new Cocktail failed!', 'error'));
    }
}

const cocktailSagas = [
    takeEvery(fetchAllCocktailsRequest, fetchAllCocktails),
    takeEvery(fetchCocktailRequest, fetchCocktail),
    takeEvery(fetchMyCocktailsRequest, fetchMyCocktails),
    takeEvery(createCocktailRequest, createCocktail),
];

export default cocktailSagas;

