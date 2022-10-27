import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchMyCocktailsRequest} from "../../store/actions/cocktailsActions";

const MyCocktails = () => {
    const dispatch = useDispatch();
    const cocktails = useSelector(state => state.cocktails.myCocktails);

    useEffect(() => {
        dispatch(fetchMyCocktailsRequest());
    }, [dispatch]);

    return (
        <div>
            
        </div>
    );
};

export default MyCocktails;