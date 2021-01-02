const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Create
router.post('/', async (request, response) => {
    try {
        const saltComplexity = 10;
        const hashedPassword = await bcrypt.hash(request.body.password, saltComplexity);
        const userParameters = {
            userName: request.body.userName,
            password: hashedPassword
        };
        const newUser = new User(userParameters);

        newUser.save((error, document) => {
            if (error) {
                handleError(error, response);
            }
            const successCode = 200;
            response.status(successCode).send(document);
        });
    } catch (error) {
        const errorCode = 500;
        console.log(`Error while creating user | ${error}`);
        response.status(errorCode).send('Error: Unable to create user');
    }
});

// Read
router.get('/', (request, response) => {
    User.find((error, documents) => {
        if (error) {
            handleError(error, response);
        }
        response.send(documents);
    });
});

router.delete('/:id', (request, response) => {
    const id = request.params.id;

    User.findByIdAndDelete(id, (error, document) => {
        if (error){ 
            handleError(error, response);
        }
        response.send(document);
    });
});

router.get('/register', (request, response) => {
    response.render('register');
});

function handleError(error, response) {
    const errorCode = 500;
    response.status(errorCode).send(error.message);
}

router.get('/dashboard', authenticateAuthorizationToken, (request, response) => {
    response.send(`This is /users/dashboard for user ${JSON.stringify(request.user)}`);
});

function authenticateAuthorizationToken(request, response, next) {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        const unauthorizedStatusCode = 401;
        return response.status(unauthorizedStatusCode).send('No token provided in request');
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if (error) {
            const forbiddenStatusCode = 403;
            return response.status(forbiddenStatusCode).send('Your token is expired or invalid');
        }
        request.user = user;
        next();
    });
}

module.exports = router;