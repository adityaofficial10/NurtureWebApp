'use strict';
const express = require('express');
const router = express.Router();
const adminController = require('../app/api/controllers/admins');
const sessionController = require('../app/api/controllers/sessions');

router.post('/logout', adminController.logout);
router.post('/login', adminController.login);
router.post('/sessionCount', sessionController.getSessionCountForMentors);

module.exports = router;
