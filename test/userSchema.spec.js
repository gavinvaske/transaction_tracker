const chance = require('chance').Chance();
const User = require('../app/models/user');

describe('attributes are required', () => {
    let user;
    beforeEach(() => {
        user = {
            userName: chance.string(),
            password: chance.string()
        };
    });
    
    it('user name is required', () => {
        delete user.userName;
        validateSchema(user, false);
    });

    it('password is required', () => {
        delete user.password;
        validateSchema(user, false);
    });
});

function validateSchema(attributes, shouldValidate) {
    const transaction = new User(attributes);
    const error = transaction.validateSync();
    const isValid = !error;

    expect(isValid).toBe(shouldValidate);
}

