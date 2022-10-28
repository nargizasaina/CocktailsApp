import {all} from 'redux-saga/effects';
import history from "../history";
import userSagas from "./sagas/usersSagas";
import cocktailSagas from "./sagas/cocktailsSagas";
import historySagas from "./sagas/historySagas";
import notifierSagas from "./sagas/notifierSagas";

export default function* rootSagas(){
    yield all([
        ...userSagas,
        ...cocktailSagas,
        ...historySagas(history),
        ...notifierSagas
    ])
}