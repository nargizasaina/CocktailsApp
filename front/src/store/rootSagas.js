import {all} from 'redux-saga/effects';
import userSagas from "./sagas/usersSagas";
import cocktailSagas from "./sagas/cocktailsSagas";

export default function* rootSagas(){
    yield all([
        ...userSagas,
        ...cocktailSagas
    ])
}