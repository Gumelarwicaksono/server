const router = require('express').Router();
const { police_check } = require('../../midellwers');
const { store, index, update, destroy, showTagByCategory } = require('./controler');

router.get('/tags', index);
router.get('/tags/:category', showTagByCategory);
router.put('/tags/:id', police_check('update', 'Tag'), update);
router.post('/tags', police_check('create', 'Tag'), store);
router.delete('/tags/:id', police_check('delete', 'Tag'), destroy);

module.exports = router;
