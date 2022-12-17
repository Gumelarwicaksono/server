const router = require('express').Router();
const multer = require('multer');
const os = require('os');
const { store, index, update, destroy } = require('./controler');

router.get('/products', index);
router.put('/products/:id', multer({ dest: os.tmpdir() }).single('image'), update);
router.post('/products', multer({ dest: os.tmpdir() }).single('image'), store);
router.delete('/products/:id', destroy);

module.exports = router;
