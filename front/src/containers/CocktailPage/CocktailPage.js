import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchCocktailRequest} from "../../store/actions/cocktailsActions";
import CocktailCard from "../../components/CocktailCard/CocktailCard";

const CocktailPage = ({match}) => {
    const dispatch = useDispatch();
    const cocktail = useSelector(state => state.cocktails.cocktail);
    const user = useSelector(state => state.users.user);

    useEffect(() => {
        dispatch(fetchCocktailRequest(match.params.id));
    }, [dispatch, match.params.id]);

    return (
        <CocktailCard
            cocktail={cocktail}
            user={user}
        />
    );
};

export default CocktailPage;