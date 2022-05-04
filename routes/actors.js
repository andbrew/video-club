const express = require('express');
const controller = require('../controllers/actors.js');

const router = express.Router();

router.get('/add', controller.add);
router.get('/update/:id', controller.update);
router.get('/:page?', controller.list);
router.get('/show/:id', controller.index);
router.post('/', controller.create);
router.put('/update/:id', controller.replace);
router.patch('/:id', controller.edit);
router.delete('/:id', controller.destroy);

module.exports = router;
