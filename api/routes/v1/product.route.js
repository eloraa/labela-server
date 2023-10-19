const express = require("express");
const controller = require("../../controllers/product.controller");
const validate = require("express-validation");
const { product } = require("../../validations/product.validation");

const router = express.Router();

router
    .route("/:id")

    .get(validate(product), controller.get);

router
    .route("/add")

    .post(validate(product), controller.add);

module.exports = router;
