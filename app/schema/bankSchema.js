const joi = require('@hapi/joi');

const bankSchema = joi.object({
    name: joi.string().required()
});

module.exports = bankSchema;