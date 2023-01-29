const router = require('express').Router();
const multer = require('multer');
const os = require('os');
const { store, index, update, destroy } = require('./controler');
const { police_check } = require('../../midellwers');

router.get('/products', index);
router.put('/products/:id', multer({ dest: os.tmpdir() }).single('image'), police_check('update', 'product'), update);
router.post('/products', multer({ dest: os.tmpdir() }).single('image'), police_check('create', 'product'), store);
router.delete('/products/:id', police_check('delete', 'product'), destroy);

module.exports = router;
