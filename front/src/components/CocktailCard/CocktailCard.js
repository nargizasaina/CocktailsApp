import React from 'react';
import {Box, Button, Card, CardContent, CardMedia, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {deleteCocktailRequest, publishCocktailRequest} from "../../store/actions/cocktailsActions";
import Spinner from "../UI/Spinner/Spinner";
import {apiUrl} from "../../config";

const CocktailCard = ({cocktail, rating}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);
    const loading = useSelector(state => state.cocktails.loading);

    const onPublish = id => {
        dispatch(publishCocktailRequest(id));
    };

    const onDelete = id => {
        dispatch(deleteCocktailRequest(id));
    };

    return loading
            ? <Spinner/>
            : cocktail && (
            <Box maxWidth="700px" margin="0 auto 10px">
                <Card>
                    <Box sx={{ display: 'flex'}}>
                        <CardMedia
                            component="img"
                            sx={{ width: 250 }}
                            image={apiUrl + '/' + cocktail.image}
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
                        {user?.role === 'admin' &&
                            <Box alignSelf="flex-start" marginLeft="auto" marginRight="5px">
                                {!cocktail.publish &&
                                    <>
                                        <Typography variant="subtitle1" color="text.secondary" component="div" marginTop="10px">
                                            Unpublished!
                                        </Typography>
                                        <Button
                                            fullWidth
                                            type="button"
                                            color="success"
                                            variant="contained"
                                            onClick={() => onPublish(cocktail._id)}
                                        >
                                            Publish
                                        </Button>
                                    </>
                                }
                                <Box marginTop="15px">
                                    <Button
                                        fullWidth
                                        type="button"
                                        color="error"
                                        variant="contained"
                                        onClick={() => onDelete(cocktail._id)}
                                    >
                                        Delete
                                    </Button>
                                </Box>
                            </Box>
                        }
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
                            Rating: {cocktail.ratings.length > 0 &&
                              Math.floor(
                                cocktail.ratings.reduce((prev, curr) => (prev + curr.rating), 0) / cocktail.ratings.length * 100
                              ) / 100}
                            </b> ({cocktail.ratings.length} votes)
                        </Typography>
                        <Typography variant="subtitle1" color="text.primary" component="div" marginTop="10px">
                            <b>Your rating:</b>
                            <div>
                                {rating}
                            </div>

                        </Typography>
                        {user?.role === 'admin' &&
                            <Typography variant="subtitle1" color="text.secondary" component="div" marginTop="10px">
                                Cocktail was added by: {cocktail.addedBy.displayName}
                            </Typography>
                        }
                    </Box>
                </Card>
            </Box>
    );
};

export default CocktailCard;