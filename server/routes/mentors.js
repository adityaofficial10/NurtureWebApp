const express = require('express');
const router = express.Router();
const mentorController = require('../app/api/controllers/mentors');

router.post('/register', mentorController.create);
router.post('/authenticate', mentorController.authenticate);


module.exports = router;