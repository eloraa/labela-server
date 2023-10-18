const express = require('express');
const newletterroute = require('./newsletter.route');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));


router.use('/newsletter', newletterroute)

module.exports = router;
