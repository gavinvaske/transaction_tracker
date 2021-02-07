const csv = require('csv-parser');
const fs = require('fs');
const Transaction = require('../models/transaction');

function saveTransactions(file, uploadDirectory, response) {
    const filePath = uploadDirectory + file.name;

    file.mv(filePath, (error) => {
        if (error) {
            response.send('Uh oh, an error occurred.');
        } else {
            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (row) => {
                    saveTransaction(row);
                    console.log(row);
                }).on('end', () => {
                    response.send('CSV file successfully processed');
                });
        }
    });
}

function saveTransaction(attributes) {
    const transaction = new Transaction(attributes);
    transaction.save((error) => {
        if (error) {
            console.log(error);
        } else {
            console.log('transaction saved successfully!');
        }
    });
}
module.exports = {
    saveTransactions
};