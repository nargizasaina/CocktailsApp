import cocktailsSlices from "../slices/cocktailsSlices";

export const {
    fetchAllCocktailsRequest,
    fetchAllCocktailsSuccess,
    fetchAllCocktailsFailure,
    fetchCocktailRequest,
    fetchCocktailSuccess,
    fetchCocktailFailure,
    fetchMyCocktailsRequest,
    fetchMyCocktailsSuccess,
    fetchMyCocktailsFailure
} = cocktailsSlices.actions;