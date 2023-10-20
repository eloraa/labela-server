const express = require("express");
const controller = require("../../controllers/cart.controller");
const validate = require("express-validation");
const { pick } = require("lodash");
const { carts } = require("../../validations/cart.validation");

const router = express.Router();

router
    .route("/:uid")

    .get(validate(pick(carts, "params")), controller.list);

router
    .route("/:uid")

    .post(validate(carts), controller.add);

router
    .route("/:uid")

    .delete(validate(pick(carts, 'deleteProduct')), controller.delete);

module.exports = router;
