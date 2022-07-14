const auth = require('../middleware/auth');
const express = require('express');
const Category = require('../models/Category');
const router = express.Router();

router.get('/', async (req, res) => {
  const categories = await Category.find();
  res.send(categories);
});

router.post('/', auth, async (req, res) => {
  if (!req.user.isAdmin || req.user.isAdmin === false)
    return res.status(400).send('Unauthorized Attempt.');

  let category = new Category({
    name: req.body.name,
  });
  category = await category.save();
  res.send(category);
});

router.delete('/:id', auth, async (req, res) => {
  if (!req.user.isAdmin || req.user.isAdmin === false)
    return res.status(400).send('Unauthorized Attempt.');

  let category = await Category.findOne({ _id: req.params.id });

  if (!category) return res.status(404).send('Not Found.');

  category = await category.remove();
  res.send(category);
});

module.exports = router;
