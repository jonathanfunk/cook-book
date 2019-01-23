import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import recipeReducer from './recipeReducer';

const combinedReducers = combineReducers({
  auth: authReducer,
  errors: errorReducer,
  recipe: recipeReducer
});

export default combinedReducers;
