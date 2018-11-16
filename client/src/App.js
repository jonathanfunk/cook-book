import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/App.scss';

import { Provider } from 'react-redux';
import store from './redux/store';

import Navigation from './container/Navigation';
import Landing from './container/Landing';
import Recipes from './container/Recipes';
import CreateRecipe from './container/CreateRecipe';
import SignUp from './container/SignUp';
import Login from './container/Login';

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
