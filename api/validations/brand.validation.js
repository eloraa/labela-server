const Joi = require("joi");
const { brands } = require("../../config/vars");

module.exports = {
    brand: {
        params: {
            brand: Joi.string().valid(...brands).required()
        }
    },
};
