const auth = require('../middleware/auth');
const express = require('express');
const Brand = require('../models/Brand');
const router = express.Router();

router.get('/', async (req, res) => {
  const brands = await Brand.find();
  res.send(brands);
});

router.post('/', auth, async (req, res) => {
  if (!req.user.isAdmin || req.user.isAdmin === false)
    return res.status(400).send('Unauthorized Attempt.');

  let brand = new Brand({
    name: req.body.name,
  });
  brand = await brand.save();
  res.send(brand);
});

router.delete('/:id', auth, async (req, res) => {
  if (!req.user.isAdmin || req.user.isAdmin === false)
    return res.status(400).send('Unauthorized Attempt.');

  let brand = await Brand.findOne({ _id: req.params.id });

  if (!brand) return res.status(404).send('Not Found.');

  brand = await brand.remove();
  res.send(brand);
});

module.exports = router;
