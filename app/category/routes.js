const router = require('express').Router();
const { store, index, update, destroy } = require('./controler');

router.get('/categoryes', index);
router.put('/categoryes/:id', update);
router.post('/categoryes', store);
router.delete('/categoryes/:id', destroy);

module.exports = router;
