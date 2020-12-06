const express = require('express');
const router = express.Router();
const requestController = require('../app/api/controllers/requests');

router.get('/', requestController.getAll);
router.post('/', requestController.create);
router.get('/:requestId', requestController.getById);
router.put('/:requestId', requestController.updateById);
router.delete('/:requestId', requestController.deleteById);

module.exports = router;