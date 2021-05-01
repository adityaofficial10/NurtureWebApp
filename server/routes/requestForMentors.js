'use strict';
const express = require('express');
const router = express.Router();
const mentorController = require('../app/api/controllers/mentors');

router.post('/mentors', mentorController.getRequests);
router.post('/events', mentorController.getScheduledEvents);
router.get('/mentor', mentorController.getById);

module.exports = router;
