const express = require('express');
const router = express.Router();
const mentorController = require('../app/api/controllers/mentors');

router.post('/mentors',mentorController.getRequests);
router.get('/events',mentorController.getScheduledEvents);

module.exports = router;