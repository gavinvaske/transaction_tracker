const mongoose = require('mongoose');
const schema = mongoose.Schema;

const bankSchema = new schema({
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Bank = mongoose.model('Bank', bankSchema);

module.exports = Bank;