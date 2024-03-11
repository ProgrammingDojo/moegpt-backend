const express = require('express');
const { signup, login, currentUser, logout } = require('../controllers/auth.js');
const {
	createNewTopic,
	getAllChats,
	getTopic,
	addNewChat,
	updateTopicName,
	deleteTopic,
} = require('../controllers/chat.js');
const { uploadAvatar } = require('../controllers/user.js');
const { requireSignin } = require('../middlewares/index.js');

const router = express.Router();
// auth
router.get('/current-user', requireSignin, currentUser);
router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
// chat
router.post('/create-new-topic', createNewTopic);
router.post('/add-new-chat', addNewChat);
router.get('/chats', requireSignin, getAllChats);
router.get('/chats/:id', requireSignin, getTopic);
router.post('/update-topic-name', updateTopicName);
router.delete('/delete-topic', deleteTopic);
// user
router.post('/upload-avatar', uploadAvatar);

module.exports = router;
