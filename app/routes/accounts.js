const express = require('express');
const router = express.Router();

const Account = require('../models/account');

// Create
router.post('/', (request, response) => {
    const account = new Account(request.body);

    account.save((error, document) => {
        if (error) {
            handleError(error, response);
        }
        response.send(document);
    });
});

// Read
router.get('/', (request, response) => {
    Account.find((error, documents) => {
        if (error) {
            handleError(error, response);
        }
        response.send(documents);
    });
});
router.get('/:id', (request, response) => {
    const id = request.params.id;

    Account.findById(id, (error, document) => {
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

    Account.findByIdAndDelete(id, (error, document) => {
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