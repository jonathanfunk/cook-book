import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

const combinedReducers = combineReducers({
  auth: authReducer,
  errors: errorReducer
});

export default combinedReducers;
