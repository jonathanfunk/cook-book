import React, { Component, Fragment } from 'react';
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
      recipeContent = (
        <div className="pageloader is-active has-background-primary">
          <span className="title">Loading</span>
        </div>
      );
    } else {
      recipeContent = (
        <section className="hero is-fullheight-with-navbar">
          <div className="hero-body">
            <div className="container">
              <div className="column is-8 is-offset-2 box">
                <figure className="image is-4by3">
                  <img
                    src="https://bulma.io/images/placeholders/1280x960.png"
                    alt="Placehonlder"
                  />
                </figure>
                <h3 className="title has-text-grey">{recipe.name}</h3>
              </div>
            </div>
          </div>
        </section>
      );
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
