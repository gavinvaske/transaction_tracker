const chance = require('chance').Chance();
const User = require('../app/models/user');

describe('attributes are required', () => {
    let user;
    beforeEach(() => {
        user = {
            email: chance.string(),
            password: chance.string(),
            name: chance.string()
        };
    });

    it('has valid attributes', () => {
        validateSchema(user, true);
    });
    
    it('email is required', () => {
        delete user.email;
        validateSchema(user, false);
    });

    it('password is required', () => {
        delete user.password;
        validateSchema(user, false);
    });

    it('name is required', () => {
        delete user.name;
        validateSchema(user, false);
    });
});

function validateSchema(attributes, shouldValidate) {
    const transaction = new User(attributes);
    const error = transaction.validateSync();
    const isValid = !error;

    expect(isValid).toBe(shouldValidate);
}

