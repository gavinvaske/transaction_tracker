const chance = require('chance').Chance();
const Transaction = require('../app/models/transaction');

let transaction;

describe('fails validation', () => {
    beforeEach(() => {
        transaction = {
            description: chance.string(),
            amount: chance.floating(),
            source: {
                type: 'checking',
                bank: {
                    name: chance.string()
                }
            }
        };
    });

    it('should fail when object is empty', () => {
        transaction = {};

        validateSchema(transaction, false);
    });

    it('should have a source defined', () => {
        delete transaction.source;

        validateSchema(transaction, false);
    });

    it('should have an amount defined', () => {
        delete transaction.amount;

        validateSchema(transaction, false);
    });

    it('should have an description defined', () => {
        delete transaction.description;

        validateSchema(transaction, false);
    });
});

function validateSchema(attributes, shouldValidate) {
    const transaction = new Transaction(attributes);
    const error = transaction.validateSync();
    const isValid = !error;

    expect(isValid).toBe(shouldValidate);
}
