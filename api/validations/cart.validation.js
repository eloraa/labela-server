const Joi = require("joi");
const { brands, types } = require("../../config/vars");

module.exports = {
    carts: {
        body: {
            productId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
            quantity: Joi.number().min(1).max(9999).integer().required(),
            method: Joi.string().valid(...['inc', 'set']),
        },
        params: {
          uid: Joi.required(),
        },
        deleteProduct: {
            productId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required()
        }
    },
};
