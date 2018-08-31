const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/index');
const db = require('./config/keys').mongoURI; //Database Config

const app = express();

//Connect to MongoDB
mongoose.connect(
  db,
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', err => {
  console.error(err.message);
});

//Initialize routes
app.use('/api', routes);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`App is running on port ${port}`));
