const express = require('express');
const router = express.Router();

router.get('/login', (request, response) => {
    response.render('login');
});

router.get('/register', (request, response) => {
    response.render('register');
  });

  router.get('/logout', (request, response) => {
    response.redirect('/users/login');
  });

  module.exports = router;