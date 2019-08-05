import axios from 'axios';
import {
  GET_ERRORS,
  CLEAR_ERRORS,
  LOADING,
  GET_RECIPE,
  FETCH_RECIPES,
  CONCAT_RECIPES,
  DELETE_RECIPE,
  REQUEST_SENT,
  REQUEST_COMPLETE
} from './types';

//Create recipe
export const createRecipe = (
  recipeData,
  imageData,
  history
) => async dispatch => {
  try {
    //Request sent
    dispatch(requestSent());
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
    //Request complete
    dispatch(requestComplete());
  } catch (err) {
    //Request complete
    dispatch(requestComplete());
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

//Get recipe by Slug
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
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

//Fetch recipes
export const fetchRecipes = (limit, skip, category) => async dispatch => {
  try {
    dispatch(loading());
    const recipes = await axios.get(
      `/api/recipes?skip=${skip}&limit=${limit}&category=${category}`
    );
    dispatch({
      type: FETCH_RECIPES,
      payload: recipes.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

//Concat Recipes
export const concatRecipes = (limit, skip, category) => async dispatch => {
  try {
    dispatch(loading());
    const recipes = await axios.get(
      `/api/recipes?skip=${skip}&limit=${limit}&category=${category}`
    );
    dispatch({
      type: CONCAT_RECIPES,
      payload: recipes.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

//Delete recipe
export const deleteRecipe = id => async dispatch => {
  try {
    await axios.delete(`api/recipes/${id}`);
    dispatch({
      type: DELETE_RECIPE,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
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

//Request Sent
export const requestSent = () => {
  return {
    type: REQUEST_SENT
  };
};

//Request complete
export const requestComplete = () => {
  return {
    type: REQUEST_COMPLETE
  };
};
