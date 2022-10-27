import {createSlice} from "@reduxjs/toolkit";

const name = 'cocktails';

const cocktailsSlice = createSlice({
    name,
    initialState : {
        cocktail: null,
        allCocktails: [],
        myCocktails: [],
        loading: false,
        error: null
    },
    reducers: {
        fetchAllCocktailsRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchAllCocktailsSuccess(state, {payload: cocktails}) {
            state.loading = false;
            state.allCocktails = cocktails;
        },
        fetchAllCocktailsFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },

        fetchMyCocktailsRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchMyCocktailsSuccess(state, {payload: cocktails}) {
            state.loading = false;
            state.myCocktails = cocktails;
        },
        fetchMyCocktailsFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },

        fetchCocktailRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchCocktailSuccess(state, {payload: cocktail}) {
            state.loading = false;
            state.cocktail = cocktail;
        },
        fetchCocktailFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },

    }
});

export default cocktailsSlice;