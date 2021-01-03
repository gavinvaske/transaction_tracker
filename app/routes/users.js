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
            email: request.body.email,
            password: hashedPassword
        };
        const newUser = new User(userParameters);

        const userExists = User.findOne({email: request.body.email});

        if (userExists) {
            return response.send('Email already exists');
        }

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

router.get('/login', (request, response) => {
    response.render('login.ejs');
});

router.get('/register', (request, response) => {
    response.render('register.ejs');
});

router.post('/register', async (request, response) => {
    try {
        const saltComplexity = 10;
        const hashedPassword = await bcrypt.hash(request.body.password, saltComplexity);
        const userParameters = {
            name: request.body.name.toLowerCase(),
            email: request.body.email.toLowerCase(),
            password: hashedPassword
        };
        const newUser = new User(userParameters);

        // eslint-disable-next-line no-magic-numbers
        const doesUserExist = User.count({email: request.body.email}) > 0;

        if (doesUserExist) {
            return response.render('register', {
                error: 'email already exists'
            });
        }

        newUser.save((error) => {
            if (error) {
                response.render('register');
            }
            response.render('login');
        });
    } catch (error) {
        console.log(`Error creating user: ${error}`);
        response.render('register');
    }
});

router.post('/login', async (request, response) => {
    console.log(`request => ${JSON.stringify(request.body)} | ${JSON.stringify(request.params)}`);

    const options = {};
    const query = {email: request.body.email.toLowerCase()};
    console.log(`query => ${JSON.stringify(query)}`);
    const user = await User.findOne(query, options);

    if (!user) {
        response.render('login', {
            error: 'Email does not exist'
        });
    }

    try {
        const isCorrectPassword = await bcrypt.compare(request.body.password, user.password);

        if (isCorrectPassword) {
            response.render('dashboard', {
                user: user
            });
        } else {
            response.render('login', {
                error: 'Password is invalid'
            });
        }
    } catch (error) {
        response.render('login', {
            error: 'Error occurred, please try again'
        });
    }
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