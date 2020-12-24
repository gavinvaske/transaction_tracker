const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
    response.render('welcome', {
        transaction_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat'
    });
});

module.exports = router;