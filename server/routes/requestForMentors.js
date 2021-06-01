'use strict';
const express = require('express');
const router = express.Router();
const mentorController = require('../app/api/controllers/mentors');
const sessionController = require('../app/api/controllers/sessions');

router.post('/events', mentorController.getScheduledEvents);
router.get('/mentor', mentorController.getById);
router.post('/sessions', sessionController.getSessionsForMentors);

module.exports = router;
