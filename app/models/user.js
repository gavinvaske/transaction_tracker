const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('user', userSchema);

module.exports = User;