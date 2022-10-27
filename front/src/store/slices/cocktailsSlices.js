import {createSlice} from "@reduxjs/toolkit";

const name = 'cocktails';

const cocktailsSlice = createSlice({
    name,
    initialState : {
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

    }
});

export default cocktailsSlice;