import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRecipeBySlug } from './../redux/actions/recipeActions';

class Recipe extends Component {
  componentDidMount() {
    if (this.props.match.params.slug) {
      this.props.getRecipeBySlug(this.props.match.params.slug);
    }
  }

  render() {
    const { recipe, loading } = this.props.recipe;
    let recipeContent;
    if (recipe === null || loading) {
      recipeContent = <h1>Loading...</h1>;
    } else {
      recipeContent = <h1>{recipe.name}</h1>;
    }
    return <div>{recipeContent}</div>;
  }
}

const mapStateToProps = state => ({
  recipe: state.recipe
});

export default connect(
  mapStateToProps,
  { getRecipeBySlug }
)(Recipe);
