const auth = require('../middleware/auth');
const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  if (!req.user.isAdmin || req.user.isAdmin === false)
    return res.status(400).send('Unauthorized Attempt.');

  const orders = await Order.find();
  res.send(orders);
});

router.get('/:user_id', auth, async (req, res) => {
  if (!(req.user._id === req.params.user_id))
    return res.status(400).send('Unauthorized Attempt.');

  const orders = await Order.find({ user_id: req.params.user_id });
  res.send(orders);
});

router.post('/', auth, async (req, res) => {
  let order = new Order({
    user_id: req.user._id,
	name: req.body.name,
    product_id: req.body.product_id,
    color: req.body.color,
    size: req.body.size,
    price: req.body.price,
    shipping_address: req.body.shipping_address,
  });

  order = await order.save();
  res.send(order);
});

router.delete('/:id', auth, async (req, res) => {
  let order = await Order.findOne({ _id: req.params.id });

  order = await order.remove();
  res.send(order);
});

module.exports = router;
