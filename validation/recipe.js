const Validator = require('validator');
const { isEmpty } = require('lodash');

module.exports = function validateRecipeInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.ingredients = !isEmpty(data.ingredients) ? data.ingredients : '';
  data.directions = !isEmpty(data.directions) ? data.directions : '';

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  if (Validator.isEmpty(data.directions)) {
    errors.directions = 'Directions need to be filled out';
  }

  if (!data.ingredients.length) {
    errors.ingredients = 'You need at least one ingredient.';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
