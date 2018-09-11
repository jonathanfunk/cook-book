const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const keys = require('./../config/keys');
const jwt = require('jsonwebtoken');
const passport = require('passport');

//Load Users model
const User = require('./../models/User');

//Load Recipe model
const Recipe = require('./../models/Recipe');

// Load Input Validation
const validateRegisterInput = require('./../validation/register');
const validateLoginInput = require('./../validation/login');
const validateRecipeInput = require('./../validation/recipe');

//Test recipes endpoint
router.get('/recipes/test', async (req, res) => {
  await res.json({
    msg: 'Recipes works!'
  });
});

//Test users endpoint
router.get('/users/test', async (req, res) => {
  await res.json({
    msg: 'Users works!'
  });
});

// Register users
router.post('/users/register', async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const user = await User.findOne({ email: req.body.email });
  if (user) {
    errors.email = 'Email already exists';
    return res.status(400).json(errors);
  } else {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    await bcrypt.genSalt(10, async (err, salt) => {
      await bcrypt.hash(newUser.password, salt, async (err, hash) => {
        try {
          if (err) throw err;
          newUser.password = hash;
          newUser.save();
          res.json(user);
        } catch (err) {
          console.log(err);
        }
      });
    });
  }
});

// Login users
router.post('/users/login', async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email });
  if (!user) {
    errors.email = 'User not found';
    return res.status(404).json(errors);
  }
  // Check Password
  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    // User matched
    const payload = { id: user.id, name: user.name }; // Create JWT Payload

    // Sign Token
    jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
      res.json({
        success: true,
        token: 'Bearer ' + token
      });
    });
  } else {
    errors.password = 'Password incorrect';
    return res.status(400).json(errors);
  }
});

//Get Recipes
router.get('/recipes', async (req, res) => {
  try {
    const recipe = await Recipe.find(req.body);
    res.json(recipe);
  } catch (err) {
    res.status(404).json({ norecipesfound: 'No recipes found' });
  }
});

//Get Recipe by slug
router.get('/recipes/slug/:slug', async (req, res) => {
  const errors = {};
  try {
    const recipe = await Recipe.findOne({ slug: req.params.slug });
    if (!recipe) {
      errors.norecipe = 'This recipe does not exist';
      return res.status(404).json(errors);
    }
    res.json(recipe);
  } catch (err) {
    res.status(404).json({ norecipesfound: 'No recipes found' });
  }
});

//Get Recipe by id
router.get('/recipes/id/:id', async (req, res) => {
  const errors = {};
  try {
    const recipe = await Recipe.findOne({ id: req.params._id });
    if (!recipe) {
      errors.norecipe = 'This recipe does not exist';
      return res.status(404).json(errors);
    }
    res.json(recipe);
  } catch (err) {
    res.status(404).json({ norecipesfound: 'No recipes found' });
  }
});

//Create Recipe
router.post(
  '/recipes',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateRecipeInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newRecipe = new Recipe({
      name: req.body.name,
      ingredients: req.body.ingredients,
      directions: req.body.directions,
      user: req.user.id
    });
    newRecipe.save();
    res.json(newRecipe);
  }
);

module.exports = router;
