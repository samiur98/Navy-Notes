require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const noteRoute = require('./routes/notes');
const app = express();

app.use(bodyParser.json());
app.use('/notes', noteRoute);

const port = 5000;

app.listen(process.env.PORT || port, () => {
    console.log(`Server is running on port ${port}`);
});