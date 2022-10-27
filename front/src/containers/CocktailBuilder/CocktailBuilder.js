import React, {useEffect} from 'react';
import {Box, Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllCocktailsRequest} from "../../store/actions/cocktailsActions";
import {Link} from "react-router-dom";

const CocktailBuilder = () => {
    const dispatch = useDispatch();
    const cocktails = useSelector(state => state.cocktails.allCocktails);
    const user = useSelector(state => state.users.user);

    useEffect(() => {
        dispatch(fetchAllCocktailsRequest());
    }, [dispatch]);

    return (
        <Box display="flex" justifyContent="space-evenly">
            {cocktails.map(cocktail => (
                (((user?.role === 'user' && cocktail.publish) || user?.role === 'admin') &&
                <Card sx={{ maxWidth: 255, margin: '5px' }} key={cocktail._id}>
                    <CardActionArea component={Link} to={'/cocktails/' + cocktail._id}>
                        <CardMedia
                            component="img"
                            height="240"
                            image={cocktail.image}
                            alt="cocktail"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {cocktail.title}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    {user?.role === 'admin' && !cocktail.publish &&
                        <Typography sx={{ fontSize: 12 }} variant="body2" color="text.secondary">
                            Unpublished!
                        </Typography>
                    }
                </Card> )
            ))}
        </Box>
    );
};

export default CocktailBuilder;