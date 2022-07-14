const mongoose = require('mongoose');

const CartScheme = new mongoose.Schema({
  user_id: { type: String, required: true },
  products: {
    type: [
      {
        product_id: String,
        name: String,
        price: Number,
        size: String,
        color: String,
        picture: String,
      },
    ],
  },
});

const Cart = mongoose.model('Cart', CartScheme);

module.exports = Cart;
