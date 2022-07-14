const auth = require('../middleware/auth');
const express = require('express');
const Email = require('../models/Email');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  if (!req.user.isAdmin || req.user.isAdmin === false)
    return res.status(400).send('Unauthorized Attempt.');

  const emails = await Email.find();
  res.send(emails);
});

router.post('/', auth, async (req, res) => {
  let email = new Email({
    user_id: req.user._id,
    user_email: req.user.email,
    title: req.body.title,
    message: req.body.message,
  });

  email = await email.save();
  res.send(email);
});

module.exports = router;
