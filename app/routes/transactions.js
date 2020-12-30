const express = require('express');
const router = express.Router();

const Transaction = require('../models/transaction');

// Create
router.post('/', (request, response) => {
    const transaction = new Transaction(request.body);

    transaction.save((error, document) => {
        if (error) {
            handleError(error, response);
        }
        response.send(document);
    });
});

// Read
router.get('/', (request, response) => {
    Transaction.find((error, documents) => {
        if (error) {
            handleError(error, response);
        }
        response.send(documents);
    });
});
router.get('/:id', (request, response) => {
    const id = request.params.id;

    Transaction.findById(id, (error, document) => {
        if (error) {
            handleError(error, response);
        }
        response.send(document);
    });
});

// Update
router.put('/:id', (request, response) => {
    response.send('TODO');
});

// Delete 
router.delete('/:id', (request, response) => {
    const id = request.params.id;

    Transaction.findByIdAndDelete(id, (error, document) => {
        if (error){ 
            handleError(error, response);
        }
        response.send(document);
    });
});

function handleError(error, response) {
    response.send(error.message);
}

module.exports = router;