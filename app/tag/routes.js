const router = require('express').Router();
const { store, index, update, destroy } = require('./controler');

router.get('/tag', index);
router.put('/tag/:id', update);
router.post('/tag', store);
router.delete('/tag/:id', destroy);

module.exports = router;
