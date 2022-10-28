import React from 'react';
import {Box, Button, Card, CardContent, CardMedia, Typography} from "@mui/material";
import {useSelector} from "react-redux";

const CocktailCard = (props) => {
    const user = useSelector(state => state.users.user);

    return props.cocktail && (
        <Box maxWidth="700px" margin="0 auto">
            <Card>
                <Box sx={{ display: 'flex' }}>
                    <CardMedia
                        component="img"
                        sx={{ width: 250 }}
                        image={props.cocktail.image}
                        alt="Cocktail"
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5">
                                <strong>{props.cocktail.title}</strong>
                            </Typography>
                            <Typography variant="subtitle1" color="text.primary" component="div" marginTop="10px">
                                <b>Ingredients</b>
                            </Typography>
                            <ul style={{padding: '0 20px', fontSize: '14px', margin:0}}>
                                {props.cocktail.ingredients.map(ing => (
                                    <li key={ing._id}>
                                        {ing.title}: {ing.amount}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Box>
                    {user?.role === 'admin' &&
                        <Box alignSelf="flex-start" marginLeft="auto" marginRight="5px">
                            {!props.cocktail.publish &&
                                <>
                                    <Typography variant="subtitle1" color="text.secondary" component="div" marginTop="10px">
                                        Unpublished!
                                    </Typography>
                                    <Button fullWidth type="button" color="success" variant="contained" >Publish</Button>
                                </>
                            }
                            <Box marginTop="15px">
                                <Button fullWidth type="button" color="error" variant="contained">Delete</Button>
                            </Box>
                        </Box>
                    }
                </Box>
                <Box padding="5px">
                    <Typography variant="subtitle1" color="text.primary" component="div" marginTop="10px">
                        <b>Recipe</b>
                    </Typography>
                    <p style={{fontSize: '14px', margin: 0}}>
                        {props.cocktail.recipe}
                    </p>
                    <Typography variant="subtitle1" color="text.primary" component="div" marginTop="10px">
                        <b>
                            Rating: {props.cocktail.ratings.reduce((prev, curr) => (prev.rating + curr.rating) / props.cocktail.ratings.length)}
                        </b> ({props.cocktail.ratings.length} votes)
                    </Typography>
                </Box>
            </Card>
        </Box>
    );
};

export default CocktailCard;