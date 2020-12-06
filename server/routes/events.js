const express = require('express');
const router = express.Router();
const eventController = require('../app/api/controllers/events');

router.get('/', eventController.getAll);
router.post('/', eventController.create);
router.get('/:eventId', eventController.getById);
router.put('/:eventId', eventController.updateById);
router.delete('/:eventId', eventController.deleteById);

module.exports = router;