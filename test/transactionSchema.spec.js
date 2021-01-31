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
            },
            category: 'food and drink'
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

    it('should convert category to lowercase', () => {
        transaction.category = 'I AM UPPER';

        const transactionModel = new Transaction(transaction);

        expect(transactionModel.category).toBe(transaction.category.toLowerCase());
    });
});

describe('passes validation', () => {
    it('should not require a category to be defined', () => {
        delete transaction.category;
        
        validateSchema(transaction, true);
    });
});

function validateSchema(attributes, shouldValidate) {
    const transaction = new Transaction(attributes);
    const error = transaction.validateSync();
    const isValid = !error;

    expect(isValid).toBe(shouldValidate);
}
