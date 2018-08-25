const express = require('express');

const app = express();

app.get('/', (req, res) => res.send('The app is working!'));

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`App is running on port ${port}`));
