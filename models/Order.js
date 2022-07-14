const mongoose = require('mongoose');

const OrderScheme = new mongoose.Schema({
	name: {type: String, required: true },
  date: { type: Date, default: Date.now() },
  user_id: { type: String, required: true },
  product_id: { type: String, required: true },
  color: { type: String, required: true },
  size: { type: String, required: true },
  price: { type: Number, required: true },
  shipping_address: { type: String, required: true },
});

const Order = mongoose.model('Order', OrderScheme);

module.exports = Order;
