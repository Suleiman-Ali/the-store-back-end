const mongoose = require('mongoose');

const CategoryScheme = new mongoose.Schema({
  name: { type: String, required: true },
});

const Category = mongoose.model('Category', CategoryScheme);

module.exports = Category;
