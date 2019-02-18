import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import requestReducer from './requestReducer';
import recipeReducer from './recipeReducer';

const combinedReducers = combineReducers({
  auth: authReducer,
  errors: errorReducer,
  requesting: requestReducer,
  recipe: recipeReducer
});

export default combinedReducers;
