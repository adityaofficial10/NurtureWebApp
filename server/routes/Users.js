const express = require('express');
const router = express.Router();
const userController = require('../app/api/controllers/Users');

router.post('/signup', userController.create);
router.post('/login', userController.login);
router.post('/events',userController.seeOptedEvents);

module.exports = router;