const Joi = require("joi");
const { brands, types } = require("../../config/vars");

module.exports = {
    carts: {
        body: {
            productId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
            quantity: Joi.number().min(1).max(9999).integer().required()
        },
        params: {
          uid: Joi.required(),
        }
    },
};
