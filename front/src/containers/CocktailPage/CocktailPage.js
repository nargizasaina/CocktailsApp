import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchCocktailRequest, rateCocktailRequest} from "../../store/actions/cocktailsActions";
import CocktailCard from "../../components/CocktailCard/CocktailCard";
import StarRatings from "react-star-ratings/build/star-ratings";

const CocktailPage = ({match}) => {
    const dispatch = useDispatch();
    const cocktail = useSelector(state => state.cocktails.cocktail);
    const user = useSelector(state => state.users.user);
    const [rating, setRating] = useState(0);

    useEffect(() => {
        dispatch(fetchCocktailRequest(match.params.id));


    }, [dispatch, match.params.id]);

    useEffect(() => {
        if (cocktail && user) {
            const userRating = cocktail.ratings.find(rating => user._id === rating.user._id);
            if (userRating) {
                setRating(userRating.rating);
            } else {
                setRating(0);
            }
        }
    }, [cocktail, user, match.params.id]);

    const rateCocktailHandler = (rating) => {
        const userRating = cocktail.ratings.find(rating => user._id === rating.user._id);
        if (!userRating) {
            setRating(rating);
            const payload = {
                id: cocktail._id,
                rate: rating
            };

            dispatch(rateCocktailRequest({...payload}));
        }
    };



    const ratingBlock = (
      <StarRatings
        rating={rating}
        starDimension="40px"
        starSpacing="15px"
        starRatedColor="yellow"
        starEmptyColor="grey"
        changeRating={rateCocktailHandler}
      />
    )

    return (
        <CocktailCard
            cocktail={cocktail}
            rating={ratingBlock}
        />
    );
};

export default CocktailPage;