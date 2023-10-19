const express = require("express");
const controller = require("../../controllers/brand.controller");
const validate = require('express-validation');
const { brand } = require("../../validations/brand.validation");

const router = express.Router();

router
    .route("/")

    .get(controller.get)

router
    .route("/:brandName")

    .get(validate(brand), controller.list);

module.exports = router;
