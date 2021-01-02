require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const User = require('./models/user');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const databaseConnection = mongoose.connection;
const database = require('./services/database');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

database.connectToDatabase(process.env.databaseURI);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(expressLayouts);

const defaultPort = 4000;
const PORT = process.env.AUTHORIZATION_SERVER_PORT || defaultPort;

app.get('/login', (request, response) => {
    response.render('login');
});

app.post('/login', async (request, response) => {
    User.findOne({userName: request.body.userName}, async (error, user) => {
        if (error) {
            const notFoundStatusCode = 400;
            return response.status(notFoundStatusCode).send('User not found');
        }
        try {
            const isCorrectPassword = await bcrypt.compare(request.body.password, user.password);

            if (isCorrectPassword) {
                const accessToken = generateAccessToken(user.toJSON());
                response.json({
                    accessToken: accessToken
                });
            } else {
                response.send('Invalid login credentials');
            }
        } catch (error) {
            console.log(`Login error: ${error}`);
            response.send('Error logging in user');
        }
    });
});

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
}

databaseConnection.on('error', (error) => {
    throw new Error(`Error connecting to the database ${error}`);
});

databaseConnection.once('open', function() {
    app.listen(PORT, () => {
        console.log(`Authorization Server started on PORT = ${PORT}`);
    });
});