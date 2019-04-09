const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('slugs');

const recipeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  userName: {
    type: String
  },
  userAvatar: {
    type: String
  },
  name: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  },
  image: {
    type: String
  },
  slug: String,
  category: {
    type: [String]
  },
  ingredients: {
    type: [String]
  },
  directions: {
    type: String
  }
});

// Generate the slug
recipeSchema.pre('save', function(next) {
  this.slug = slug(this.name);
  next();
});

module.exports = mongoose.model('Recipe', recipeSchema);
