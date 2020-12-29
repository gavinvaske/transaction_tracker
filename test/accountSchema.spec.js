const accountSchema = require('../app/schema/accountSchema');
const chance = require('chance').Chance();

describe('passes validation', () => {
    let account;

    beforeEach(() => {
        account = {
            type: 'checking',
            bank: {
                name: 'bank ABC'
            }
        };
    });

    it('should succeed when required attributes are defined', () => {
        validateSchema(account, true);
    });
});

describe('fails validation', () => {
    let account;

    beforeEach(() => {
        account = {
            type: 'checking',
            bank: {
                name: chance.string()
            }
        };
    });

    it('should fail when bank is not defined', () => {
        delete account.bank;

        validateSchema(account, false);
    });

    it('should fail when type is not an accepted value', () => {
        account.type = chance.string();

        validateSchema(account, false);
    });

});

function validateSchema(account, shouldValidate) {
    const isValid = accountSchema.validate(account).error === undefined;

    expect(isValid).toBe(shouldValidate);
}