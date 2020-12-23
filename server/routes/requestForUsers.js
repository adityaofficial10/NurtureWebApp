const express = require('express');
const router = express.Router();
const mentorController = require('../app/api/controllers/mentors');
const userController = require('../app/api/controllers/Users');
const slotController = require('../app/api/controllers/slots');
const eventController = require('../app/api/controllers/events');

router.get('/slots',slotController.getSlotsMentorWise);
router.post('/event',eventController.getEventForStudent);
router.post('/mentorDetails',mentorController.getById);

module.exports = router;
