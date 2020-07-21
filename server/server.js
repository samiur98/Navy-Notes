require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const noteRoute = require('./routes/notes');
const userRoute = require('./routes/users');
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/notes', noteRoute);
app.use('/users', userRoute);

const port = 5000;

app.listen(process.env.PORT || port, () => {
    console.log(`Server is running on port ${port}`);
});