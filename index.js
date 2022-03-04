const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const url = process.env.MONGO_URI;

app.use('/assets', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(url, (err) => {
    if (err) console.log(err);
    else console.log(`Connected to Database successfully.`);
});

app.use('/', require('./routes/main'));

app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`);
});