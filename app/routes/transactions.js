const express = require('express');
const Transaction = require('../models/transaction');

const router = express.Router();

// Create
router.post('/', (request, response) => {
    if (request.files) {
        const file = request.files.filename;
        const filename = file.name;
        const uploadDirectory = './app/uploads/';
        
        file.mv(uploadDirectory + filename, (error) => {
            if (error) {
                console.log(error);
                response.send('Uh oh, an error occurred.');
            } else {
                response.send('Upload completed successfully.');
            }
        });
    }
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