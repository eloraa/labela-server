const express = require("express");
const controller = require("../../controllers/product.controller");
const validate = require("express-validation");
const { product } = require("../../validations/product.validation");
const { pick } = require("lodash");

const router = express.Router();

router
    .route("/")

    .get(controller.list);


router
    .route("/latest")

    .get(controller.latest);

router
    .route("/:id")

    .get(validate(pick(product, "params")), controller.get);

router
    .route("/add")

    .post(validate(pick(product, "body")), controller.add);

router
    .route("/:id")

    .patch(validate(product), controller.update);


module.exports = router;
