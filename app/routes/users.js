const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const passport = require('passport');
const {checkAuthenticated, checkNotAuthenticated} = require('../services/authenticator');

router.get('/login', checkNotAuthenticated, (request, response) => {
    response.render('login.ejs');
});

router.get('/register', checkNotAuthenticated, (request, response) => {
    response.render('register.ejs');
});

router.post('/register', checkNotAuthenticated, async (request, response) => {
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

router.get('/dashboard', checkAuthenticated, (request, response) => {
    response.render('dashboard.ejs', {
        user: request.user
    });
});

router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/users/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
}));

router.get('/logout', checkAuthenticated, (request, response) => {
    request.logOut();
    response.redirect('/users/login');
});

module.exports = router;