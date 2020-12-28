const joi = require('@hapi/joi');
const accountSchema = require('./accountSchema');

const transactionSchema = joi.object({
    description: joi.string().required(),
    amount: joi.number().required(),
    source: accountSchema.required()
});

module.exports = transactionSchema;