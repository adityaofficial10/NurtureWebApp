const express = require('express');
const router = express.Router();
const slotController = require('../app/api/controllers/slots');

router.get('/', slotController.getAll);
router.post('/', slotController.create);
router.get('/:slotId', slotController.getById);
router.put('/:slotId', slotController.updateById);
router.delete('/:slotId', slotController.deleteById);

module.exports = router;