import axios from 'axios';
import setAuthToken from './../../helpers/setAuthToken';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import jwt_decode from 'jwt-decode';

//Login - Get user token
export const loginUser = userData => async dispatch => {
  try {
    const results = await axios.post('/api/users/login', userData);
    //Save to localstorage
    const { token } = results.data;
    //Set token to localstorage
    localStorage.setItem('jwtToken', token);
    //Set token to Auth header
    setAuthToken(token);
    //Decode token to get user data
    const decoded = jwt_decode(token);
    //Set current user
    dispatch(setCurrentUser(decoded));
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

//Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
