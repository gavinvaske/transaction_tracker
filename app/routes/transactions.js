const express = require('express');
const router = express.Router();

const Transaction = require('../models/transaction');

// Create
router.post('/', (request, response) => {
    response.send('TODO');
});

// Read
router.get('/', (request, response) => {
    response.send('TODO');
});
router.get('/:id', (request, response) => {
    response.send('TODO');
});

// Update
router.put('/:id', (request, response) => {
    response.send('TODO');
});

// Delete 
router.delete('/:id', (request, response) => {
    response.send('TODO');
});

module.exports = router;