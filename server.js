const express = require('express');
const BodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
var cors = require('cors');
const knex = require('knex');
const register = require('./Controller/register');
const Sign = require('./Controller/signin');
const profile = require('./Controller/profile');
const image = require('./Controller/image');
const Dotenv = require('dotenv');

Dotenv.config();

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
});

const app = express();
app.get('/', (req, res) => {
  res.send('Oh hi, Server running');
});

app.use(cors());
app.use(BodyParser.json());

app.post('/signin', (req, res) => {
  Sign.signinHandler(req, res, db, bcrypt);
});

app.post('/register', (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.post('/profile/:id', (req, res) => {
  profile.profileHandler(req, res, db, bcrypt);
});

app.put('/image', (req, res) => {
  image.imageHandler(req, res, db);
});

app.post('/imageURL', (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
