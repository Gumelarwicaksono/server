const router = require('express').Router();
const { store, index, update, destroy } = require('./controler');
const { police_check } = require('../../midellwers');

router.get('/categories', index);
router.put('/categories/:id', police_check('update', 'Category'), update);
router.post('/categories', police_check('create', 'Category'), store);
router.delete('/categories/:id', police_check('delete', 'Category'), destroy);

module.exports = router;
