const chance = require('chance').Chance();
const AccountModel = require('../app/models/account');

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

    it('should fail when type is not defined', () => {
        delete account.type;

        validateSchema(account, false);
    });

});

function validateSchema(attributes, shouldValidate) {
    const account = new AccountModel(attributes);
    const error = account.validateSync();
    const isValid = !error;

    expect(isValid).toBe(shouldValidate);
}