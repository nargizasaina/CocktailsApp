import axiosApi from "../../axiosApi";
import {put, takeEvery} from "redux-saga/effects";
import {addNotification} from "../actions/notifierActions";
import {
    createCocktailFailure,
    createCocktailRequest,
    createCocktailSuccess,
    deleteCocktailFailure,
    deleteCocktailRequest,
    deleteCocktailSuccess,
    fetchAllCocktailsFailure,
    fetchAllCocktailsRequest,
    fetchAllCocktailsSuccess,
    fetchCocktailFailure,
    fetchCocktailRequest,
    fetchCocktailSuccess,
    fetchMyCocktailsFailure,
    fetchMyCocktailsRequest,
    fetchMyCocktailsSuccess,
    publishCocktailFailure,
    publishCocktailRequest,
    publishCocktailSuccess
} from "../actions/cocktailsActions";
import {historyPush, historyReplace} from "../actions/historyActions";

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
        yield put(addNotification({message: 'Cocktail is created successfully!', variant: 'success'}));
        yield put(historyReplace('/'));
    } catch (e) {
        yield put(createCocktailFailure(e.response.data));
        yield put(addNotification({message: 'Create new Cocktail failed!', variant: 'error'}));
    }
}

export function* publishCocktail({payload: id}) {
    try {
        yield axiosApi.put('/cocktails/' + id + '/publish');
        yield put(publishCocktailSuccess());
        yield put(addNotification({message: 'Cocktail is published successfully!', variant: 'success'}));
        yield put(historyPush('/'));
    } catch (e) {
        yield put(publishCocktailFailure(e.response.data));
        yield put(addNotification({message: 'Publish Cocktail failed!', variant: 'error'}));
    }
}

export function* deleteCocktail({payload: id}) {
    try {
        yield axiosApi.delete('/cocktails/' + id);
        yield put(deleteCocktailSuccess());
        yield put(addNotification({message: 'Cocktail is deleted successfully!', variant: 'success'}));
        yield put(historyPush('/'));
    } catch (e) {
        yield put(deleteCocktailFailure(e.response.data));
        yield put(addNotification({message: 'Delete Cocktail failed!', variant: 'error'}));
    }
}

const cocktailSagas = [
    takeEvery(fetchAllCocktailsRequest, fetchAllCocktails),
    takeEvery(fetchCocktailRequest, fetchCocktail),
    takeEvery(fetchMyCocktailsRequest, fetchMyCocktails),
    takeEvery(createCocktailRequest, createCocktail),
    takeEvery(publishCocktailRequest, publishCocktail),
    takeEvery(deleteCocktailRequest, deleteCocktail),
];

export default cocktailSagas;

