const express = require('express');
const Transaction = require('../models/transaction');
const TransactionService = require('../services/transaction');
const {checkAuthenticated} = require('../services/authenticator');

const router = express.Router();

// Create
router.post('/', checkAuthenticated, (request, response) => {
    if (request.files) {
        const file = request.files.filename;
        const uploadDirectory = './app/uploads/';
        
        TransactionService.saveTransactions(file, uploadDirectory, response);
    }
});

// Read
router.get('/', checkAuthenticated, (request, response) => {
    Transaction.find((error, documents) => {
        if (error) {
            handleError(error, response);
        }
        response.render('transactions.ejs', {
            transactions: documents
        });
    });
});

router.get('/:id', checkAuthenticated, (request, response) => {
    const id = request.params.id;

    Transaction.findById(id, (error, document) => {
        if (error) {
            handleError(error, response);
        }
        response.send(document);
    });
});

// Update
router.put('/:id', checkAuthenticated, (request, response) => {
    response.send('TODO');
});

// Delete
router.delete('/:id', checkAuthenticated, (request, response) => {
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