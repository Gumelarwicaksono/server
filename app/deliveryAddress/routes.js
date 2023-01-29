const router = require('express').Router();
const { store, update, destroy, index } = require('./controler');
const { police_check } = require('../../midellwers');

router.post('/delivery-addresses', police_check('create', 'DeliveryAddress'), store);
router.get('/delivery-addresses', police_check('view', 'DeliveryAddress'), index);

router.put('/delivery-addresses/:id', update);
router.delete('/delivery-addresses/:id', destroy);

module.exports = router;
