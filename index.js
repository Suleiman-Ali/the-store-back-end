const helmet = require('helmet');
const compression = require('compression');
const config = require('config');
const express = require('express');
const mongoose = require('mongoose');
const Products = require('./routes/Products');
const Categories = require('./routes/Categories');
const Brands = require('./routes/Brands');
const Carts = require('./routes/Carts');
const Emails = require('./routes/Emails');
const Orders = require('./routes/Orders');
const Users = require('./routes/Users');
const Auth = require('./routes/Auth');

if (!config.get('jwtPrivatekey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

const app = express();

mongoose
  .connect(config.get('db'))
  .then(() => console.log('Connected to MongoDB..'))
  .catch(() => console.log('Error Concreting to MongoDB..'));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(express.json());
app.use('/api/brands', Brands);
app.use('/api/categories', Categories);
app.use('/api/emails', Emails);
app.use('/api/products', Products);
app.use('/api/carts', Carts);
app.use('/api/orders', Orders);
app.use('/api/users', Users);
app.use('/api/auth', Auth);
app.use(helmet());
app.use(compression());

const PORT = process.env.PORT || 27017;
app.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT}..`));
