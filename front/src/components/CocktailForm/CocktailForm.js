import React, {useEffect, useState} from 'react';
import {Button, Grid, TextareaAutosize} from "@mui/material";
import InputField from "../UI/Form/InputField/InputField";
import FileInput from "../UI/Form/FileInput/FileInput";
import CloseIcon from '@mui/icons-material/Close';

const CocktailForm = ({onSubmit, error}) => {
  const [ingredient, setIngredient] = useState([
    {title: '', amount: ''}
  ]);

  const [cocktailState, setCocktailState] = useState({
    name: '',
    ingredients: [],
    recipe: '',
    image: '',
  });

  const submitFormHandler = e => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(cocktailState).forEach(key => {
      formData.append(key, cocktailState[key]);
    });

    onSubmit(formData);
  };

  const inputChangeHandler = e => {
    const {name, value} = e.target;

    setCocktailState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  useEffect(() => {
    setCocktailState(prev => {
      return {...prev, ingredients: ingredient}
    });
    setIngredient(prev => {
      return [...prev]
    })
  }, [ingredient]);
  useEffect(() => {

  }, [ingredient]);

  const addIngredients = () => {
    setIngredient(prevState => [
      ...prevState,
        {title: '', amount: ''},
    ]);
  };

  const deleteIngredients = (index) => {
    ingredient.splice(index, 1);
  };

  const inputChangeHandlerIng = (e, index) => {
    const {name, value} = e.target;

    setIngredient(prev => {
      const ingCopy = {
        ...prev[index],
        [name]: value,
      }

      return prev.map((ing, i) => {
        if (index === i) {
          return ingCopy;
        }
        return ing;
      });
    });
  };

  const fileChangeHandler = e => {
    const name = e.target.name;
    const file = e.target.files[0];

    setCocktailState(prevState => ({...prevState, [name]: file}));
  };

  const getFieldError = fieldName => {
    try {
      return error.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };


  return (
    <Grid
      component="form"
      item
      onSubmit={submitFormHandler}
      container
      xs={9}
      textAlign="center"
      marginX="auto"
      spacing={2}
    >
      <InputField
        label="Name"
        onChange={inputChangeHandler}
        value={cocktailState.name}
        name="name"
        error={getFieldError('name')}
      />
      {ingredient.map((ing, index) => (
        <Grid
          container
          xs={12}
          spacing={2}
          item
          key={index}
        >
          <Grid item container xs={7}>
            <InputField
              xs={2}
              label="Title"
              onChange={e => inputChangeHandlerIng(e, index)}
              value={ing.title}
              name="title"
              error={getFieldError('title')}
            />
          </Grid>
          <Grid item container xs={4}>
            <InputField
              label="Amount"
              onChange={e => inputChangeHandlerIng(e, index)}
              value={ing.amount}
              name="amount"
              error={getFieldError('amount')}
            />
          </Grid>
          {ingredient.length > 1 ?
            <Grid item container xs={1}>
            <Button onClick={() => deleteIngredients(index)}><CloseIcon/></Button>
            </Grid> : null}
        </Grid>
      ))}

      <Grid item>
        <Button type="button" onClick={addIngredients}>Add ingredients</Button>
      </Grid>

      <Grid item xs={12}>
        <TextareaAutosize
          aria-label="Recipe textarea"
          name="recipe"
          value={cocktailState.recipe}
          minRows={10}
          onChange={inputChangeHandler}
          placeholder="Your recipe"
          style={{ width: '100%', padding: '10px', borderRadius: '5px' }}
        />
      </Grid>

      <Grid item>
        <FileInput
          label="Image"
          name="image"
          onChange={fileChangeHandler}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          sx={{background: 'linear-gradient(45deg, #ce4429 30%, #aace29 90%)'}}
          type='submit'
          variant='contained'
          // fullWidth
        >
          Create cocktail
        </Button>
        </Grid>
    </Grid>
  );
};

export default CocktailForm;