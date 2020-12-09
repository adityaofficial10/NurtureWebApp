const express = require('express');
const router = express.Router();
const mentorController = require('../app/api/controllers/mentors');

router.post('/mentors',mentorController.getRequests);

module.exports = router;