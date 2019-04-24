import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRecipeBySlug } from './../redux/actions/recipeActions';
import Message from '../components/Message';

class Recipe extends Component {
  componentDidMount() {
    if (this.props.match.params.slug) {
      this.props.getRecipeBySlug(this.props.match.params.slug);
    }
  }

  render() {
    const { recipe, loading } = this.props.recipe;
    const errors = this.props.errors.norecipe;

    let recipeContent;
    if (recipe === null || loading) {
      recipeContent = (
        <div className="pageloader is-active has-background-primary">
          <span className="title">Loading</span>
        </div>
      );
    } else if (errors) {
      recipeContent = (
        <Message
          title={`Error!`}
          subtitle={errors}
          linkURL="/recipes"
          linkText="Find other recipes"
        />
      );
    } else {
      recipeContent = (
        <div className="column is-8 is-offset-2">
          <div className="card">
            <div className="card-image">
              <figure className="image is-16by9">
                <img
                  src={
                    recipe.image
                      ? `/images/${recipe.image}`
                      : `/images/landing-hero.jpg`
                  }
                  alt={recipe.name}
                />
              </figure>
            </div>
            <div className="card-content">
              <h1 className="title is-size-1">{recipe.name}</h1>
              <div className="media">
                <div className="media-left">
                  <figure className="image is-24x24">
                    <img
                      className="is-rounded"
                      src={recipe.userAvatar}
                      alt={recipe.userName}
                    />
                  </figure>
                </div>
                <div className="media-content">
                  <p className="subtitle is-6">
                    Posted by {recipe.userName} on {recipe.created}
                  </p>
                </div>
              </div>
              <div className="content">
                <div className="tags are-medium">
                  {recipe.category[0].split(',').map((categoryItem, i) => {
                    return (
                      <span
                        key={i}
                        className="tag is-rounded is-white- is-primary is-medium"
                      >
                        {categoryItem}
                      </span>
                    );
                  })}
                </div>
                <h3 className="label is-medium">Ingredients</h3>
                <table className="table is-striped is-hoverable is-fullwidth">
                  <tbody>
                    {recipe.ingredients[0].split(',').map((ingredient, i) => {
                      return (
                        <tr key={i}>
                          <td>{ingredient}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <h3 className="label is-medium">Directions</h3>
                {recipe.directions}
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <section className="hero is-fullheight-with-navbar">
        <div className="hero-body">
          <div className="container">{recipeContent} </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  recipe: state.recipe,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getRecipeBySlug }
)(Recipe);
