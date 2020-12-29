const chance = require('chance').Chance();
const Bank = require('../app/models/bank');

describe('fails validation', () => {
    it('should have a name defined', () => {
        const bank = {
            name: undefined
        };

        validateSchema(bank, false);
    });
});

describe('passes validation', () => {
    it('should pass when name is defined', () => {
        const bank = {
            name: chance.string()
        };

        validateSchema(bank, true);
    });
});

function validateSchema(attributes, shouldValidate) {
    const bank = new Bank(attributes);
    const error = bank.validateSync();
    const isValid = !error;

    expect(isValid).toBe(shouldValidate);
}