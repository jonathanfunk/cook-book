const express = require('express');
const router = express.Router();

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

module.exports = router;
