const express = require('express');
const newletterroute = require('./newsletter.route');
const brandroute = require('./brand.route');
const productroute = require('./product.route');
const cartroute = require('./cart.route');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));


router.use('/newsletter', newletterroute)
router.use('/brand', brandroute)
router.use('/product', productroute)
router.use('/cart', cartroute)

module.exports = router;
