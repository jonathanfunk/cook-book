import React, { Component } from 'react';
import { connect } from 'react-redux';
import InputGroup from './../components/InputFields/InputGroup';
import Checkbox from './../components/InputFields/Checkbox';
import IngredientField from './../components/InputFields/IngredientField';
import TextArea from './../components/InputFields/TextArea';
import Message from '../components/Message';
import categories from './../helpers/categories';
import { createRecipe } from './../redux/actions/recipeActions';

class CreateRecipe extends Component {
  state = {
    name: '',
    image: null,
    category: new Map(),
    ingredients: [{ item: '' }],
    directions: '',
    errors: {},
    userName: ''
  };

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.errors) {
      return { errors: nextProps.errors };
    }
  }

  onChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    });

  imageChange = e =>
    this.setState({
      image: e.target.files[0]
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
    const ingredients = removeEmptyIngredients.map(
      ingredient => ingredient.item
    );

    const imageData = this.state.image;

    const recipeData = {
      name: this.state.name,
      category,
      ingredients,
      directions: this.state.directions
    };
    this.props.createRecipe(recipeData, imageData);
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
    const { errors, name, category, ingredients, directions } = this.state;
    const { isAuthenticated } = this.props.auth;

    const createRecipeForm = (
      <div className="column is-8 is-offset-2">
        <h3 className="title has-text-grey">Create Recipe</h3>
        <p className="subtitle has-text-grey">Let's see what you got.</p>
        <form className="box" onSubmit={this.onSubmit}>
          <label className="label is-medium">Name</label>
          <InputGroup
            type="text"
            name="name"
            placeholder="Name of your recipe"
            value={name}
            onChange={this.onChange}
            icon="fa fa-food"
            error={errors.name}
          />
          <label className="label is-medium">Image</label>
          <InputGroup
            type="file"
            name="image"
            placeholder="Upload Image"
            onChange={this.imageChange}
            icon="fa fa-file-image"
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
                  checked={category.get(item.name)}
                  onChange={this.categoryChange}
                />
                <label htmlFor={item.name}>{item.label}</label>
              </div>
            ))}
          </div>
          <label className="label is-medium">Ingredients</label>
          {errors.ingredients && (
            <p class="help is-danger">{errors.ingredients}</p>
          )}
          {ingredients.map((ingredient, id) => (
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
            value={directions}
            onChange={this.onChange}
            error={errors.directions}
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
    );
    return (
      <section className="hero is-fullheight-with-navbar">
        <div className="hero-body">
          <div className="container has-text-centered">
            {isAuthenticated ? (
              createRecipeForm
            ) : (
              <Message
                title="You must be logged in to create a recipe!"
                subtitle="Sign up and let's see what you got"
                linkURL="/sign-up"
                linkText="Sign Up"
              />
            )}
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
