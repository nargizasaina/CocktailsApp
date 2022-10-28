import axiosApi from "../../axiosApi";
import {put, takeEvery} from "redux-saga/effects";
import {addNotification} from "../actions/notifierActions";
import {
    createCocktailFailure, createCocktailRequest, createCocktailSuccess,
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
        yield put(addNotification({message: 'Fetch Cocktails failed!', variant: 'error'}));
    }
}

export function* fetchCocktail({payload: id}) {
    try{
        const response = yield axiosApi('/cocktails/' + id);
        yield put(fetchCocktailSuccess(response.data));
    } catch (e) {
        yield put(fetchCocktailFailure(e.response.data));
        yield put(addNotification({message: 'Fetch Cocktail failed!', variant: 'error'}));
    }
}

export function* fetchMyCocktails() {
    try{
        const response = yield axiosApi('/cocktails/my_cocktails');
        console.log(response);
        yield put(fetchMyCocktailsSuccess(response.data));
    } catch (e) {
        yield put(fetchMyCocktailsFailure(e.response.data));
        yield put(addNotification({message: 'Fetch my Cocktails failed!', variant: 'error'}));
    }
}

export function* createCocktail({payload: cocktailData}) {
    console.log(cocktailData, 'DATA')
    try {
        yield axiosApi.post('/cocktails', cocktailData);
        yield put(createCocktailSuccess());
    } catch (e) {
        yield put(createCocktailFailure(e.response.data));
        yield put(addNotification({message: 'Create new Cocktail failed!', variant: 'error'}));
    }
}

const cocktailSagas = [
    takeEvery(fetchAllCocktailsRequest, fetchAllCocktails),
    takeEvery(fetchCocktailRequest, fetchCocktail),
    takeEvery(fetchMyCocktailsRequest, fetchMyCocktails),
    takeEvery(createCocktailRequest, createCocktail),
];

export default cocktailSagas;

