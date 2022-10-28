import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchCocktailRequest} from "../../store/actions/cocktailsActions";
import CocktailCard from "../../components/CocktailCard/CocktailCard";

const CocktailPage = ({match}) => {
    const dispatch = useDispatch();
    const cocktail = useSelector(state => state.cocktails.cocktail);

    useEffect(() => {
        dispatch(fetchCocktailRequest(match.params.id));
    }, [dispatch, match.params.id]);

    return (
        <CocktailCard
            cocktail={cocktail}
        />
    );
};

export default CocktailPage;