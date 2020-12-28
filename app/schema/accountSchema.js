const joi = require('@hapi/joi');
const bankSchema = require('./bankSchema');

const accountSchema = joi.object({
    type: joi.string().valid('checking', 'savings', 'credit').required(),
    bank: bankSchema.required()
});

module.exports = accountSchema;