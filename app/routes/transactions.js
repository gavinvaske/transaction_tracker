const express = require('express');
const Transaction = require('../models/transaction');
const TransactionService = require('../services/transaction');
const {checkAuthenticated} = require('../services/authenticator');

const router = express.Router();

router.post('/', checkAuthenticated, (request, response) => {
    if (!request.files) {
        response.redirect('/users/dashboard');
    }

    const file = request.files.filename;
    const uploadDirectory = './app/uploads/';
    
    TransactionService.saveTransactions(file, uploadDirectory, response);

});

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

router.get('/download', checkAuthenticated, (request, response) => {
    Transaction.find((error, documents) => {
        if (error) {
            handleError(error, response);
        }
        var transactions = JSON.stringify(documents);
        var filename = 'transactions.json';
        var mimetype = 'application/json';

        response.setHeader('Content-Type', mimetype);
        response.setHeader('Content-disposition','attachment; filename=' + filename);
        response.send(transactions);
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

router.delete('/:id', checkAuthenticated, (request, response) => {
    const id = request.params.id;

    Transaction.findByIdAndDelete(id, (error, document) => {
        if (error){ 
            handleError(error, response);
        }
        response.send(document);
    });
});

router.post('/deleteAll', checkAuthenticated, async (request, response) => {
    console.log(`user = ${JSON.stringify(request.user)}`);
    await Transaction.deleteMany({}, (error) => {
        if (error) {
            handleError(error);
        }
        response.redirect('/users/dashboard');
    });
});

function handleError(error, response) {
    response.send(error.message);
}

module.exports = router;