const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const path = require('path');
const scores = require('./routes/api/scores');
const port = process.env.PORT || 8080;
const app = express();
const db = require('./config/keys').mongoURI;

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.get('/mobile', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'mobile.html'));
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/scores', scores);

app.listen(port, () => console.log(`Server is running on port ${port}`));