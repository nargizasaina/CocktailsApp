import React, {useEffect} from 'react';
import {Box, Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllCocktailsRequest} from "../../store/actions/cocktailsActions";
import {Link} from "react-router-dom";
import Spinner from "../../components/UI/Spinner/Spinner";
import {apiUrl} from "../../config";

const CocktailBuilder = () => {
    const dispatch = useDispatch();
    const cocktails = useSelector(state => state.cocktails.allCocktails);
    const loading = useSelector(state => state.cocktails.loading);
    const user = useSelector(state => state.users.user);

    useEffect(() => {
        dispatch(fetchAllCocktailsRequest());
    }, [dispatch]);

    return (
        loading
            ? <Spinner/>
            : <Box display="flex" justifyContent="space-evenly" flexWrap="wrap">
                {cocktails && cocktails.length > 1
                ? cocktails.map(cocktail => (
                    (((user?.role === 'user' && cocktail.publish) || user?.role === 'admin') &&
                        <Card sx={{width: 250, margin: '5px'}} key={cocktail._id}>
                            <CardActionArea component={Link} to={'/cocktails/' + cocktail._id}>
                                <CardMedia
                                    component="img"
                                    height="240"
                                    image={apiUrl + '/' + cocktail.image}
                                    alt="cocktail"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {cocktail.title}
                                    </Typography>
                                    {user?.role === 'admin' && !cocktail.publish &&
                                        <Typography sx={{fontSize: 12}} variant="body2" color="text.secondary">
                                            Unpublished yet!
                                        </Typography>
                                    }
                                </CardContent>
                            </CardActionArea>
                        </Card>)
                ))
                : <h2>There are no any cocktails. Please add...</h2>}
            </Box>
    );
};

export default CocktailBuilder;