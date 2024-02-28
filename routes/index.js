const express = require('express');
const { signup, login, currentUser, logout } = require('../controllers/auth.js');
const { gptResponse } = require('../controllers/chat.js');
const { requireSignin } = require('../middlewares/index.js');

const router = express.Router();
// auth
router.get('/current-user', requireSignin, currentUser);
router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
// chat
router.post('/gpt-response', gptResponse);

module.exports = router;