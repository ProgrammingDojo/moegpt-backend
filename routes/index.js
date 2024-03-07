const express = require('express');
const { signup, login, currentUser, logout } = require('../controllers/auth.js');
const { gptResponse, chats } = require('../controllers/chat.js');
const { uploadAvatar } = require('../controllers/user.js');
const { requireSignin } = require('../middlewares/index.js');

const router = express.Router();
// auth
router.get('/current-user', requireSignin, currentUser);
router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
// chat
router.post('/gpt-response', gptResponse);
router.get('/chats', requireSignin, chats);
// user
router.post('/upload-avatar', uploadAvatar);

module.exports = router;
