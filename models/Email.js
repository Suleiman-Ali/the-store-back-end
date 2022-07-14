const mongoose = require('mongoose');

const EmailScheme = new mongoose.Schema({
  date: { type: Date, default: Date.now() },
  user_id: { type: String, required: true },
  user_email: { type: String, required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
});

const Email = mongoose.model('Email', EmailScheme);

module.exports = Email;
