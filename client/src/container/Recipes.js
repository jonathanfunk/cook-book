import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchRecipes,
  concatRecipes,
  deleteRecipe
} from './../redux/actions/recipeActions';
import PropTypes from 'prop-types';
import RecipeCard from './../components/RecipeCard';
import InfiniteScroll from 'react-infinite-scroll-component';

class Recipes extends Component {
  state = {
    recipes: [],
    limit: 6,
    skip: 0,
    category: 'drink,snack,breakfast,main,dessert',
    filterReset: true,
    hasMore: true
  };

  componentDidMount() {
    const { limit, skip, category } = this.state;
    const categoryParams = category.split(',');
    this.props.fetchRecipes(limit, skip, categoryParams);
    this.setState({ skip: skip + limit });
    console.log(this.state.hasMore);
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (nextProps.recipes.recipes) {
      return { recipes: nextProps.recipes.recipes };
    }
  }

  concatRecipes = () => {
    const { limit, skip, category } = this.state;
    const categoryParams = category.split(',');
    this.setState({ skip: skip + limit });
    this.props.concatRecipes(limit, skip, categoryParams);
    console.log(this.state.hasMore);
  };

  deleteRecipeClick = id => {
    this.props.deleteRecipe(id);
  };

  filterChange = e => {
    const item = e.target.value;
    this.setState({ category: item, skip: 0, limit: 6 }, () => {
      const { limit, skip, category } = this.state;
      this.setState({ skip: skip + limit });
      const categoryParams = category.split(',');
      this.props.fetchRecipes(limit, skip, categoryParams);
    });
  };

  render() {
    const { loading } = this.props.recipes;
    const { user } = this.props.auth;

    return (
      <section className="hero is-fullheight-with-navbar">
        <div className="hero-body recipe-list">
          <div className="container">
            <div className="control box">
              <label className="radio">
                <input
                  type="radio"
                  name="category"
                  value="drink,snack,breakfast,main,dessert"
                  onChange={this.filterChange}
                  checked={
                    this.state.category === 'drink,snack,breakfast,main,dessert'
                  }
                />
                All
              </label>
              <label className="radio">
                <input
                  type="radio"
                  name="category"
                  value="drink"
                  onChange={this.filterChange}
                  checked={this.state.category === 'drink'}
                />
                Drink
              </label>
              <label className="radio">
                <input
                  type="radio"
                  name="category"
                  value="breakfast"
                  onChange={this.filterChange}
                  checked={this.state.category === 'breakfast'}
                />
                Breakfast
              </label>
              <label className="radio">
                <input
                  type="radio"
                  name="category"
                  value="snack"
                  onChange={this.filterChange}
                  checked={this.state.category === 'snack'}
                />
                Snack
              </label>
              <label className="radio">
                <input
                  type="radio"
                  name="category"
                  value="main"
                  onChange={this.filterChange}
                  checked={this.state.category === 'main'}
                />
                Main
              </label>
              <label className="radio">
                <input
                  type="radio"
                  name="category"
                  value="desert"
                  onChange={this.filterChange}
                  checked={this.state.category === 'desert'}
                />
                Desert
              </label>
            </div>
            <InfiniteScroll
              className="columns is-multiline is-desktop"
              dataLength={this.state.recipes.length}
              next={this.concatRecipes}
              hasMore={this.state.hasMore}
              loader={loading ? <h4>Loading...</h4> : ''}
            >
              {this.state.recipes.map((recipe, i) => (
                <RecipeCard
                  key={i}
                  recipe={recipe}
                  userId={user.id}
                  deleteRecipeClick={this.deleteRecipeClick}
                />
              ))}
            </InfiniteScroll>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  recipes: state.recipe,
  errors: state.errors,
  auth: state.auth
});

Recipes.propTypes = {
  recipes: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  fetchRecipes: PropTypes.func.isRequired,
  deleteRecipe: PropTypes.func.isRequired,
  concatRecipes: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { fetchRecipes, deleteRecipe, concatRecipes }
)(Recipes);
