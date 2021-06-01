'use strict';
const express = require('express');
const router = express.Router();
const mentorController = require('../app/api/controllers/mentors');
const slotController = require('../app/api/controllers/slots');
const eventController = require('../app/api/controllers/events');
const sessionController = require('../app/api/controllers/sessions');

router.post('/slots', slotController.getSlotsMentorWise);
router.post('/event', eventController.getEventForStudent);
router.post('/mentorDetails', mentorController.getById);
router.post('/getSessions', sessionController.getSessionsForUsers);
router.post('/bookSession', sessionController.createSession);
router.post('/completeSession', sessionController.completeSession);
router.post('/cancel', eventController.cancelEngagement);

module.exports = router;
