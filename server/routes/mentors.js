const express = require('express');
const router = express.Router();
const mentorController = require('../app/api/controllers/mentors');

router.post('/signup', mentorController.create);
router.post('/login', mentorController.login);
router.get('/getAll',mentorController.getMentors);
router.post('/mentor/slots',mentorController.getSlotsForMentor);

module.exports = router;