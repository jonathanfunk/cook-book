import React, { Component } from 'react';
import { connect } from 'react-redux';
import InputGroup from './../components/InputFields/InputGroup';
import Checkbox from './../components/InputFields/Checkbox';
import IngredientField from './../components/InputFields/IngredientField';
import TextArea from './../components/InputFields/TextArea';
import categories from './../helpers/categories';
import { createRecipe } from './../redux/actions/recipeActions';

class CreateRecipe extends Component {
  state = {
    name: '',
    category: new Map(),
    ingredients: [{ item: '' }],
    direction: '',
    errors: {}
  };

  onChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    });

  categoryChange = e => {
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState => ({
      category: prevState.category.set(item, isChecked)
    }));
  };

  ingredientNameChange = id => e => {
    const newIngredient = this.state.ingredients.map(
      (ingredient, ingredientId) => {
        if (id !== ingredientId) return ingredient;
        return { ...ingredient, item: e.target.value };
      }
    );
    this.setState({ ingredients: newIngredient });
  };

  onSubmit = e => {
    e.preventDefault();

    const category = Array.from(this.state.category).map(
      category => category[0]
    );

    const removeEmptyIngredients = this.state.ingredients.filter(
      ingredient => ingredient.item
    );
    console.log('Filtered Ingredients', removeEmptyIngredients);
    const ingredients = removeEmptyIngredients.map(
      ingredient => ingredient.item
    );

    const recipeData = {
      name: this.state.name,
      category,
      ingredients,
      directions: this.state.directions
    };
    console.log(recipeData);
    this.props.createRecipe(recipeData);
  };

  addIngredient = () => {
    this.setState({
      ingredients: this.state.ingredients.concat([{ item: '' }])
    });
  };

  removeIngredient = id => () => {
    this.setState({
      ingredients: this.state.ingredients.filter(
        (s, ingredientId) => id !== ingredientId
      )
    });
  };

  render() {
    return (
      <section className="hero is-fullheight-with-navbar">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="column is-8 is-offset-2">
              <h3 className="title has-text-grey">Create Recipe</h3>
              <p className="subtitle has-text-grey">Let's see what you got.</p>
              <form className="box" onSubmit={this.onSubmit}>
                <label className="label is-medium">Name</label>
                <InputGroup
                  type="text"
                  name="name"
                  placeholder="Name of your recipe"
                  value={this.state.name}
                  onChange={this.onChange}
                  icon="fa fa-lock"
                />
                <label className="label is-medium">Category</label>
                <div className="field">
                  {categories.map(item => (
                    <div
                      className="b-checkbox is-circular is-primary is-inline"
                      key={item.key}
                    >
                      <Checkbox
                        name={item.name}
                        checked={this.state.category.get(item.name)}
                        onChange={this.categoryChange}
                      />
                      <label htmlFor={item.name}>{item.label}</label>
                    </div>
                  ))}
                </div>
                <label className="label is-medium">Ingredients</label>
                {this.state.ingredients.map((ingredient, id) => (
                  <IngredientField
                    key={id}
                    type="text"
                    name="name"
                    value={ingredient.item}
                    onChange={this.ingredientNameChange(id)}
                    removeIngredient={this.removeIngredient(id)}
                  />
                ))}
                <div className="field">
                  <button
                    type="button"
                    onClick={this.addIngredient}
                    className="button is-info is-medium is-fullwidth"
                  >
                    + Add ingredient
                  </button>
                </div>
                <label className="label is-medium">Directions</label>
                <TextArea
                  name="directions"
                  placeholder="Directions"
                  value={this.state.directions}
                  onChange={this.onChange}
                />
                <div className="field">
                  <button
                    type="submit"
                    className="button is-block is-primary is-large is-fullwidth"
                  >
                    Add Recipe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createRecipe }
)(CreateRecipe);
