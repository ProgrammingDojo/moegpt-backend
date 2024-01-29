import express from 'express';
import { signup, login, currentUser } from '../controllers/auth';
import { requireSignin } from '../middlewares';

const router = express.Router();

router.get('/current-user', requireSignin, currentUser);
router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
