import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import jwt_decode from 'jwt-decode';
import setAuthToken from './helpers/setAuthToken';
import { setCurrentUser, logoutUser } from './redux/actions/authActions';

import './styles/App.scss';

import { Provider } from 'react-redux';
import store from './redux/store';

import Navigation from './container/Navigation';
import Landing from './container/Landing';
import Recipes from './container/Recipes';
import CreateRecipe from './container/CreateRecipe';
import SignUp from './container/SignUp';
import Login from './container/Login';

//Check for token
if (localStorage.jwtToken) {
  //Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //decode token & get user info & exp
  const decoded = jwt_decode(localStorage.jwtToken);
  //Set current user
  store.dispatch(setCurrentUser(decoded));
  //Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //Logout user
    store.dispatch(logoutUser());
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navigation />
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route path="/recipes" component={Recipes} />
              <Route path="/create-recipe" component={CreateRecipe} />
              <Route path="/sign-up" component={SignUp} />
              <Route path="/login" component={Login} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
