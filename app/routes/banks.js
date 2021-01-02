const express = require('express');
const router = express.Router();

const Bank = require('../models/bank');

// Create
router.post('/', (request, response) => {
    const bank = new Bank(request.body);

    bank.save((error, document) => {
        if (error) {
            handleError(error, response);
        }
        response.send(document);
    });
});

// Read
router.get('/', (request, response) => {
    Bank.find((error, documents) => {
        if (error) {
            handleError(error, response);
        }
        response.send(documents);
    });
});
router.get('/:id', (request, response) => {
    const id = request.params.id;

    Bank.findById(id, (error, document) => {
        if (error) {
            handleError(error, response);
        }
        response.send(document);
    });
});

// Update
router.put('/:id', (request, response) => {
    const id = request.params.id;

    Bank.findById(id, function (error, document) {
        if (error) {
            handleError(error, response);
        }
        
        document.name = request.body.name;

        document.save((error, document) => {
            if (error) {
                handleError(error, response);
            }
            response.send(document);
        });
    });
});

// Delete 
router.delete('/:id', (request, response) => {
    const id = request.params.id;

    Bank.findByIdAndDelete(id, (error, document) => {
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