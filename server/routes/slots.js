const express = require('express');
const router = express.Router();
const slotController = require('../app/api/controllers/slots');

router.get('/', slotController.getAll);
router.post('/', slotController.create);
router.get('/:requestId', slotController.getById);
router.put('/:requestId', slotController.updateById);
router.delete('/:requestId', slotController.deleteById);

module.exports = router;