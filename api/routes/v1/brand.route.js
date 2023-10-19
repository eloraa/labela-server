const express = require('express');
const controller = require('../../controllers/brand.controller');

const router = express.Router();

router
  .route('/')

  .get(controller.get)



module.exports = router;
