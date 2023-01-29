const router = require('express').Router();
const { show } = require('./controler');

router.get('/invoices/:order_id', show);

module.exports = router;
