'use strict';
const express = require('express');
const router = express.Router();
const adminController = require('../app/api/controllers/admins');

router.post('/logout', adminController.logout);
router.post('/login', adminController.login);

module.exports = router;
