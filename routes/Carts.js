const auth = require('../middleware/auth');
const express = require('express');
const Cart = require('../models/Cart');
const router = express.Router();

router.get('/:user_id', auth, async (req, res) => {
  const cart = await Cart.findOne({ user_id: req.params.user_id });
  res.send(cart);
});

router.post('/', auth, async (req, res) => {
  if (req.user.isAdmin || req.user.isAdmin === true)
    return res.status(400).send('Unauthorized Attempt.');

  let cart = new Cart({
    user_id: req.user._id,
    products: [],
  });

  cart = await cart.save();
  res.send(cart);
});

router.put('/', auth, async (req, res) => {
  let cart = await Cart.findOne({ user_id: req.user._id });

  if (!cart) return res.status(404).send('Not Found.');

  cart.products = req.body.products;
  cart = await cart.save();
  res.send(cart);
});

module.exports = router;
