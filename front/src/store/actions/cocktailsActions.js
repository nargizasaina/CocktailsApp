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
    fetchMyCocktailsFailure,
    createCocktailRequest,
    createCocktailSuccess,
    createCocktailFailure,
    publishCocktailRequest,
    publishCocktailSuccess,
    publishCocktailFailure,
    deleteCocktailRequest,
    deleteCocktailSuccess,
    deleteCocktailFailure,
    rateCocktailRequest,
    rateCocktailSuccess,
    rateCocktailFailure
} = cocktailsSlices.actions;