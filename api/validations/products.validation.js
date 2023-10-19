const Joi = require("joi");
const { brands, types } = require("../../config/vars");

module.exports = {
    product: {
        body: {
            image: Joi.string().uri().required(),
            name: Joi.string().max(90).min(3).required(),
            brandName: Joi.string().valid(...brands).required(),
            type: Joi.string().valid(...types).required(),
            price: Joi.integer().max(99999999999999).required(),
            description: Joi.string().max(150).min(3).required(),
            rating: Joi.integer().max(5).required()
        },
    },
};
