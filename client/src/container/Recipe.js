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
                    <div className="media">
                      <h1 className="title">{recipe.name}</h1>
                      <div class="tags are-medium">
                        {recipe.category.map((categoryItem, i) => {
                          return (
                            <span
                              key={i}
                              class="tag is-rounded is-white- is-primary is-medium"
                            >
                              {categoryItem}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    <div className="content">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                      <a href="#">#css</a> <a href="#">#responsive</a>
                      <br />
                      <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                    </div>
                  </div>
                </div>
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
