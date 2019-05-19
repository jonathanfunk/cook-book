import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRecipes, concatRecipes } from './../redux/actions/recipeActions';
import RecipeCard from './../components/RecipeCard';
import InfiniteScroll from 'react-infinite-scroll-component';

class Recipes extends Component {
  state = {
    recipes: [],
    limit: 6,
    skip: 0,
    hasMore: true
  };

  componentDidMount() {
    const { limit, skip } = this.state;
    this.props.fetchRecipes(limit, skip);
    this.setState({ skip: skip + limit });
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (nextProps.recipes.recipes) {
      return { recipes: nextProps.recipes.recipes };
    }
  }

  concatRecipes = () => {
    const { limit, skip } = this.state;
    this.setState({ skip: skip + limit });
    this.props.concatRecipes(limit, skip);
  };

  render() {
    const { loading } = this.props.recipes;
    const { user } = this.props.auth;

    return (
      <section className="hero is-fullheight-with-navbar">
        <div className="hero-body">
          <div className="container">
            <InfiniteScroll
              className="columns is-multiline is-mobile"
              dataLength={this.state.recipes.length}
              next={this.concatRecipes}
              hasMore={this.state.hasMore}
              loader={loading ? <h4>Loading...</h4> : ''}
            >
              {this.state.recipes.map((recipe, i) => (
                <RecipeCard key={i} recipe={recipe} user={user._id} />
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

export default connect(
  mapStateToProps,
  { fetchRecipes, concatRecipes }
)(Recipes);
