import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRecipes, concatRecipes } from './../redux/actions/recipeActions';
import InfiniteScroll from 'react-infinite-scroll-component';

class Recipes extends Component {
  state = {
    recipes: [],
    limit: 1,
    skip: 0
  };

  componentDidMount() {
    const { limit, skip } = this.state;
    this.props.fetchRecipes(limit, skip);
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (nextProps.recipes) {
      console.log(state.recipes);
      return { recipes: nextProps.recipes };
    }
  }

  concatRecipes = () => {
    const { limit } = this.state;
    this.setState({ skip: this.state.skip + limit });
    this.props.concatRecipes(limit, this.state.skip);
    console.log('Fetching', this.state);
  };

  render() {
    return (
      <section className="hero is-fullheight-with-navbar">
        <div className="hero-body">
          <div className="container has-text-centered">
            <InfiniteScroll
              dataLength={this.state.recipes.length}
              next={this.concatRecipes}
              hasMore={true}
              loader={<h4>Loading...</h4>}
            >
              {this.state.recipes.map(recipe => (
                <div
                  style={{ height: '200vh', background: 'pink' }}
                  key={recipe._id}
                >
                  {recipe.name}
                </div>
              ))}
            </InfiniteScroll>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  recipes: state.recipe.recipes,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { fetchRecipes, concatRecipes }
)(Recipes);
