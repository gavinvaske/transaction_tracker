const mongoose = require('mongoose');
const schema = mongoose.Schema;
const Account = require('./account');

const transactionSchema = new schema({
    description: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    source: {
        type: Account.schema,
        required: false
    },
    date: {
        type: Date,
        required: true
    },
    category: {
        type: String,
        lowercase: true,
        required: false
    }
}, {
    timestamps: true
});

const Transaction = mongoose.model('transaction', transactionSchema);

module.exports = Transaction;