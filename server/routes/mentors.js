const express = require('express');
const router = express.Router();
const mentorController = require('../app/api/controllers/mentors');

router.post('/signup', mentorController.create);
router.post('/login', mentorController.login);

module.exports = router;