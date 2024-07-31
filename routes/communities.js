const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createCommunity, getPublicCommunities, joinCommunity, approveJoinRequest } = require('../controllers/communityController');

router.post('/', auth, createCommunity);
router.get('/public', getPublicCommunities);
router.post('/join/:id', auth, joinCommunity);
router.post('/approve/:id/:userId', auth, approveJoinRequest);

module.exports = router;