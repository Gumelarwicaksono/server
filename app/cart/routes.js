const router = require('express').Router();
const { update, index } = require('./controler');
const { police_check } = require('../../midellwers');

router.get('/carts', police_check('read', 'Cart'), index);

router.put('/carts', police_check('update', 'Cart'), update);

module.exports = router;
