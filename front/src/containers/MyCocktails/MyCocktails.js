import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchMyCocktailsRequest} from "../../store/actions/cocktailsActions";
import CocktailCard from "../../components/CocktailCard/CocktailCard";

const MyCocktails = () => {
    const dispatch = useDispatch();
    const cocktails = useSelector(state => state.cocktails.myCocktails);

    useEffect(() => {
        dispatch(fetchMyCocktailsRequest());
    }, [dispatch]);

    return cocktails.map(cocktail => (
            <CocktailCard
                key={cocktail._id}
                cocktail={cocktail}
            />
    ));
};

export default MyCocktails;