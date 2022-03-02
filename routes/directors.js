const express = require('express');
const controller = require('../controllers/directors.js');

const router = express.Router();

router.get('/', controller.list);
router.get('/:id', controller.index);
router.post('/', controller.create);
router.put('/:id', controller.replace);
router.patch('/:id', controller.edit);
router.delete('/', controller.destroy);

module.exports = router;
