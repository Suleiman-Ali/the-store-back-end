const mongoose = require('mongoose');

const ProductScheme = new mongoose.Schema({
  date: { type: Date, default: Date.now() },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  available: { type: Boolean, required: true },
  colors: { type: [String], required: true },
  sizes: { type: [String], required: true },
  pictures: { type: [String], required: true },
  brand_id: { type: String, required: true },
  category_id: { type: String, required: true }
});

const Product = mongoose.model('Product', ProductScheme);
module.exports = Product;
