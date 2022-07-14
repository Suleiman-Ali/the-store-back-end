const auth = require('../middleware/auth');
const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

router.get('/', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

router.post('/', auth, async (req, res) => {
  if (!req.user.isAdmin || req.user.isAdmin === false)
    return res.status(400).send('Unauthorized Attempt.');

  let product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    available: req.body.available,
    colors: req.body.colors,
    sizes: req.body.sizes,
    pictures: req.body.pictures,
    brand_id: req.body.brand_id,
    category_id: req.body.category_id,
  });

  product = await product.save();
  res.send(product);
});

router.put('/:id', auth, async (req, res) => {
  if (!req.user.isAdmin || req.user.isAdmin === false)
    return res.status(400).send('Unauthorized Attempt.');

  let product = await Product.findOne({ _id: req.params.id });

  if (!product) return res.status(404).send('Not Found.');

  product.name = req.body.name;
  product.description = req.body.description;
  product.price = req.body.price;
  product.available = req.body.available;
  product.colors = req.body.colors;
  product.sizes = req.body.sizes;
  product.pictures = req.body.pictures;
  product.brand_id = req.body.brand_id;
  product.category_id = req.body.category_id;
	

  product = await product.save();
  res.send(product);
});

router.delete('/:id', auth, async (req, res) => {
  if (!req.user.isAdmin || req.user.isAdmin === false)
    return res.status(400).send('Unauthorized Attempt.');

  let product = await Product.findOne({ _id: req.params.id });

  if (!product) return res.status(404).send('Not Found.');

  product = await product.remove();
  res.send(product);
});

module.exports = router;
