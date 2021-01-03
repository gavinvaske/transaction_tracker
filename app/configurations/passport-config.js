const localStrategy = require('passport-local').Strategy;
const userService = require('../services/user');
const bcrypt = require('bcrypt');
const User = require('../models/user');

async function authenticateUser(email, password, done) {
    const user = await userService.getUserByEmail(email.toLowerCase());

    if (!user) {
        return done(null, false, {
            message: 'No user with that email'
        });
    }
    try {
        const isCorrectPassword = await bcrypt.compare(password, user.password);

        if (isCorrectPassword) {
            return done(null, user);
        } else {
            return done(null, false, {
                message: 'password is incorrect'
            });
        }
    } catch (error) {
        return done(error);
    }
}

function deserializeUser(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
}

function serializeUser(user, done) {
    done(null, user.id);
}

function initialize(passport) {
    passport.use(new localStrategy({
        usernameField: 'email',
        password: 'password'
    }, authenticateUser));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
}

module.exports = initialize;