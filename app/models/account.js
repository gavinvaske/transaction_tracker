const mongoose = require('mongoose');
const schema = mongoose.Schema;
const Bank = require('./bank');

const accountSchema = new schema({
    bank: {
        type: Bank.schema,
        required: true
    },
    type: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Account = mongoose.model('account', accountSchema);

module.exports = Account;