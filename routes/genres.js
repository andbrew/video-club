const express = require('express');
const controller = require('../controllers/genres.js');

const router = express.Router();

router.get('/', controller.list);
router.get('/:id', controller.index);
router.post('/', controller.create);
router.put('/:id', controller.replace);
router.patch('/:id', controller.edit);
router.delete('/:id', controller.destroy);

module.exports = router;
