require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const database = require('./services/database');
const mongoose = require('mongoose');
const databaseConnection = mongoose.connection;

database.connectToDatabase(process.env.databaseURI);

const app = express();
const defaultPort = 3000;
const PORT = process.env.PORT || defaultPort;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: false}));
app.use(expressLayouts);

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/banks', require('./routes/banks'));

databaseConnection.on('error', (error) => {
    throw new Error(`Error connecting to the database ${error}`);
});

databaseConnection.once('open', function() {
    app.listen(PORT, () => {
        console.log(`Server started listening on PORT = ${PORT}`);
    });
});

