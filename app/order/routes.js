const router = require('express').Router();
const { police_check } = require('../../midellwers');
const { store, index } = require('./controler');

router.post('/orders', police_check('create', 'Order'), store);
router.get('/orders', police_check('view', 'Order'), index);

module.exports = router;
