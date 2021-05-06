'use strict';
const express = require('express');
const router = express.Router();
const {userProfile, mentorProfile} = require('../app/api/controllers/profiles');

router.get('/user', userProfile);
router.get('/mentor', mentorProfile);

module.exports = router;
