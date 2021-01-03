const User = require('../models/user');

async function getUserByEmail(email) {
    return await User.findOne({
        email: email
    });
}

async function deleteUserById(id) {
    await User.findByIdAndDelete(id);
}

module.exports = {
    getUserByEmail, 
    deleteUserById
};