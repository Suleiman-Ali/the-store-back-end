const mongoose = require('mongoose');

const BrandScheme = new mongoose.Schema({
  name: { type: String, required: true },
});

const Brand = mongoose.model('Brand', BrandScheme);

module.exports = Brand;
