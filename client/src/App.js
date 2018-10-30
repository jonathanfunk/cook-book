import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/App.scss';
import Navigation from './Container/Navigation';
import Landing from './Container/Landing';
import Recipes from './Container/Recipes';
import CreateRecipe from './Container/CreateRecipe';
import SignUp from './Container/SignUp';
import Login from './Container/Login';

class App extends Component {
  render() {
    return (
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
    );
  }
}

export default App;
