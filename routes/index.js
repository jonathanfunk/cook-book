const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
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

//Load Image Controller
const imageController = require('./../config/imageController');

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
    const avatar = gravatar.url(req.body.email, {
      s: '200',
      r: 'pg',
      d: 'mm'
    });

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      avatar,
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
    const payload = { id: user.id, name: user.name, avatar: user.avatar }; // Create JWT Payload

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
    const skipRecipes = parseInt(req.query.skip) || 0;
    const limitRecipes = parseInt(req.query.limit) || 0;
    const filterCategory = req.query.category;
    const recipe = await Recipe.find({
      category: { $in: filterCategory.split(', ') }
    })
      .sort({ created: -1 })
      .skip(skipRecipes)
      .limit(limitRecipes);
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

//Test upload
router.post(
  '/upload',
  imageController.resize,
  imageController.upload,
  (req, res) => {
    if (req.fileValidationError) {
      res.json(req.fileValidationError);
    }
    res.json(req.file.data.link);
  }
);

//Create Recipe
router.post(
  '/recipes',
  passport.authenticate('jwt', { session: false }),
  imageController.resize,
  imageController.upload,
  (req, res) => {
    const { errors, isValid } = validateRecipeInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    if (req.fileValidationError) {
      return res.status(400).json(req.fileValidationError);
    }
    const newRecipe = new Recipe({
      user: req.user.id,
      userName: req.user.name,
      userAvatar: req.user.avatar,
      name: req.body.name,
      category: req.body.category,
      ingredients: req.body.ingredients,
      image: req.file.data.link,
      directions: req.body.directions
    });
    newRecipe.save();
    res.json(newRecipe);
  }
);

//Update Recipe
router.post(
  '/recipes/update/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { errors, isValid } = validateRecipeInput(req.body);
      // Check Validation
      if (!isValid) {
        return res.status(400).json(errors);
      }
      const recipe = await Recipe.findOne({ _id: req.params.id });
      if (!recipe.user.equals(req.user._id)) {
        res.status(404).json({ nomatch: 'error' });
      }
      const updatedRecipe = await Recipe.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { upsert: true, new: true }
      ).exec();
      res.json(updatedRecipe);
    } catch (err) {
      res.status(404).json({ recipenotfound: 'Recipe not found' });
    }
  }
);

//Delete Recipe
router.delete(
  '/recipes/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const recipe = await Recipe.findOne({ _id: req.params.id });
      if (!recipe.user.equals(req.user._id)) {
        res.status(404).json({ nomatch: 'error' });
      }
      recipe.remove();
      res.json({ success: true });
    } catch (err) {
      res.status(404).json({ recipenotfound: 'Recipe not found' });
    }
  }
);

module.exports = router;
