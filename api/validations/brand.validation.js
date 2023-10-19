const Joi = require("joi");
const { brands } = require("../../config/vars");

module.exports = {
    brand: {
        params: {
            brandName: Joi.string().valid(...brands).insensitive().required()
        }
    },
};
