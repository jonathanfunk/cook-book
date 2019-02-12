import axios from 'axios';
import { GET_ERRORS, CLEAR_ERRORS, LOADING, GET_RECIPE } from './types';

//Create Recipe
export const createRecipe = (
  recipeData,
  imageData,
  history
) => async dispatch => {
  try {
    const { name, slug, category, ingredients, directions } = recipeData;
    const formData = new FormData();
    formData.append('name', name);
    formData.append('recipe-image', imageData);
    formData.append('category', category);
    formData.append('ingredients', ingredients);
    formData.append('directions', directions);

    await axios.post('/api/recipes', formData);
    await history.push(`/recipe/${slug}`);
    //Cear out any errors
    dispatch(clearErrors());
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

//Get Recipe by Slug
export const getRecipeBySlug = slug => async dispatch => {
  try {
    dispatch(loading());
    const recipe = await axios.get(`/api/recipes/slug/${slug}`);
    dispatch({
      type: GET_RECIPE,
      payload: recipe.data
    });
  } catch (err) {
    dispatch({
      type: GET_RECIPE,
      payload: null
    });
  }
};

//Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

//Loading
export const loading = () => {
  return {
    type: LOADING
  };
};