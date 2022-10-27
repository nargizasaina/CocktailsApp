import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Box, Button, Card, CardContent, CardMedia, Typography} from "@mui/material";
import {fetchCocktailRequest} from "../../store/actions/cocktailsActions";

const CocktailPage = ({match}) => {
    const dispatch = useDispatch();
    const cocktail = useSelector(state => state.cocktails.cocktail);
    const user = useSelector(state => state.users.user);

    useEffect(() => {
        dispatch(fetchCocktailRequest(match.params.id));
    }, [dispatch]);

    return ((user?.role === 'user' && cocktail?.publish) || user?.role === 'admin') && (
        <Box maxWidth="700px" margin="0 auto">
            <Card>
                <Box sx={{ display: 'flex' }}>
                    <CardMedia
                        component="img"
                        sx={{ width: 250 }}
                        image={cocktail.image}
                        alt="Cocktail"
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5">
                                <strong>{cocktail.title}</strong>
                            </Typography>
                            <Typography variant="subtitle1" color="text.primary" component="div" marginTop="10px">
                                <b>Ingredients</b>
                            </Typography>
                            <ul style={{padding: '0 20px', fontSize: '14px', margin:0}}>
                                {cocktail.ingredients.map(ing => (
                                    <li key={ing._id}>
                                        {ing.title}: {ing.amount}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Box>
                </Box>
                <Box padding="5px">
                    <Typography variant="subtitle1" color="text.primary" component="div" marginTop="10px">
                        <b>Recipe</b>
                    </Typography>
                    <p style={{fontSize: '14px', margin: 0}}>
                        {cocktail.recipe}
                    </p>
                    <Typography variant="subtitle1" color="text.primary" component="div" marginTop="10px">
                        <b>
                            Rating: {cocktail.ratings.reduce((prev, curr) => (prev.rating + curr.rating) / cocktail.ratings.length)}
                        </b> ({cocktail.ratings.length} votes)
                    </Typography>
                </Box>
                {user?.role === 'admin' &&
                    <>
                        <Button type="button">Publish</Button>
                        <Button type="button">Delete</Button>
                    </>
                }
            </Card>
        </Box>
    );
};

export default CocktailPage;