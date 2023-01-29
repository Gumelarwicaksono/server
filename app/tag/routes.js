const router = require('express').Router();
const { store, index, update, destroy } = require('./controler');
const { police_check } = require('../../midellwers');

router.get('/tags', index);
router.put('/tags/:id', police_check('update', 'Tag'), update);
router.post('/tags', police_check('create', 'Tag'), store);
router.delete('/tags/:id', police_check('delete', 'Tag'), destroy);

module.exports = router;
