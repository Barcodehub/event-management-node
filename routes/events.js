const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createEvent, getEvents } = require('../controllers/eventController');

router.post('/:communityId', auth, createEvent);
router.get('/:communityId', auth, getEvents);

module.exports = router;