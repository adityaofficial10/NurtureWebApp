const express = require('express');
const router = express.Router();
const mentorController = require('../app/api/controllers/mentors');
const userController = require('../app/api/controllers/Users');

router.post('/mentors',mentorController.getRequests);
router.get('/events',mentorController.getScheduledEvents);

module.exports = router;