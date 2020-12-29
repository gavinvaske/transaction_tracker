const transactionSchema = require('../app/schema/transactionSchema');
const chance = require('chance').Chance();

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

function validateSchema(transaction, shouldValidate) {
    const isValid = transactionSchema.validate(transaction).error === undefined;

    expect(isValid).toBe(shouldValidate);
}
