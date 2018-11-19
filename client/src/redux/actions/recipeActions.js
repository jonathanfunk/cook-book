import axios from 'axios';
import { GET_ERRORS, CLEAR_ERRORS } from './types';

//Create Profile
export const createRecipe = recipeData => async dispatch => {
  try {
    await axios.post('/api/recipes', recipeData);
    //Cear out any errors
    dispatch(clearErrors());
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
