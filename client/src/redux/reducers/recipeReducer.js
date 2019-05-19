import {
  LOADING,
  GET_RECIPE,
  FETCH_RECIPES,
  CONCAT_RECIPES,
  DELETE_RECIPE,
  GET_ERRORS
} from './../actions/types';

const initialState = {
  recipes: [],
  recipe: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_RECIPE:
      return {
        ...state,
        recipe: action.payload,
        loading: false
      };
    case FETCH_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        loading: false
      };
    case CONCAT_RECIPES:
      return {
        ...state,
        recipes: state.recipes.concat(action.payload),
        loading: false
      };
    case DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter(recipe => recipe._id !== action.payload)
      };
    case GET_ERRORS:
      return {
        loading: false
      };
    default:
      return state;
  }
}
