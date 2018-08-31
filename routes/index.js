const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const keys = require('./../config/keys');
const jwt = require('jsonwebtoken');
const passport = require('passport');

//Load Users model
const User = require('./../models/User');

// Load Input Validation
const validateRegisterInput = require('./../validation/register');

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

module.exports = router;
