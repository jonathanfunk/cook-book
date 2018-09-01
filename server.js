const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const routes = require('./routes/index');
const db = require('./config/keys').mongoURI; //Database Config

const app = express();

//Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Connect to MongoDB
mongoose.connect(
  db,
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', err => {
  console.error(err.message);
});

//Passport middleware - handles logins
app.use(passport.initialize());
require('./config/passport')(passport);

//Passport config

//Initialize routes
app.use('/api', routes);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`App is running on port ${port}`));
