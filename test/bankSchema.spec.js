const chance = require('chance').Chance();
const bankSchema = require('../app/schema/bankSchema');

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

function validateSchema(bank, shouldValidate) {
    const isValid = bankSchema.validate(bank).error === undefined;

    expect(isValid).toBe(shouldValidate);
}