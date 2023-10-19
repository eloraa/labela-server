const Joi = require("joi");
const { brands, types } = require("../../config/vars");

module.exports = {
    product: {
        body: {
            image: Joi.string().uri().required(),
            name: Joi.string().max(90).min(3).required(),
            brandName: Joi.string().valid(...brands).required(),
            type: Joi.string().max(20).required(),
            price: Joi.number().max(99999999999999).required(),
            description: Joi.string().max(150).min(3).required(),
            rating: Joi.number().max(5).required()
        },
    },
};
