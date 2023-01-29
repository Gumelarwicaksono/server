const { police_check } = require('../../midellwers');
const { store, update, destroy, index } = require('./controler');
const router = require('express').Router();

router.post('/delivery-addresses', police_check('create', 'DeliveryAddress'), store);
router.put('/delivery-addresses/:id', update);
router.delete('/delivery-addresses/:id', destroy);
router.get('/delivery-addresses', police_check('view', 'DeliveryAddress'), index);

module.exports = router;
