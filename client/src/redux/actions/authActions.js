import axios from 'axios';
import setAuthToken from './../../helpers/setAuthToken';
import {
  GET_ERRORS,
  CLEAR_ERRORS,
  SET_CURRENT_USER,
  REQUEST_SENT,
  REQUEST_COMPLETE
} from './types';
import jwt_decode from 'jwt-decode';

//Register User
export const signUpUser = userData => async dispatch => {
  try {
    //Request sent
    dispatch(requestSent());
    await axios.post('/api/users/register', userData);
    const { email, password } = userData;
    const loginData = {
      email,
      password
    };
    dispatch(loginUser(loginData));
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

//Login
export const loginUser = userData => async dispatch => {
  try {
    //Request sent
    dispatch(requestSent());
    const results = await axios.post('/api/users/login', userData);
    //Save to localstorage
    const { token } = results.data;
    //Set token to localstorage
    localStorage.setItem('jwtToken', token);
    //Set token to Auth header
    setAuthToken(token);
    //Decode token to get user data
    const decoded = jwt_decode(token);
    //Clear out any errors
    dispatch(clearErrors());
    //Set current user
    dispatch(setCurrentUser(decoded));
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

//Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

//Log user out
export const logoutUser = () => dispatch => {
  //Remove token from localStorage
  localStorage.removeItem('jwtToken');
  //Remove auth header for future requests
  setAuthToken(false);
  //Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

//Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
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
