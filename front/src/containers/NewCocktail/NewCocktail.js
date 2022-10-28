import React from 'react';
import CocktailForm from "../../components/CocktailForm/CocktailForm";
import {Grid, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {createCocktailRequest} from "../../store/actions/cocktailsActions";

const NewCocktail = () => {
  const dispatch = useDispatch();
  const error = useSelector(state => state.cocktails.error);

  const onCocktailFormSubmit = cocktailData => {
    dispatch(createCocktailRequest(cocktailData));
  };
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h4" sx={{margin: '15px 0 15px 50px'}}>
          Add new cocktail
        </Typography>
      </Grid>
      <CocktailForm
        onSubmit={onCocktailFormSubmit}
        error={error}
      />
    </Grid>
  );
};

export default NewCocktail;