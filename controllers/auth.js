const User = require('../models/user');
const { hashPassword, comparePassword } = require('../utils/auth');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email }).exec();
		if (!user) return res.status(400).send('No user found');

		const match = await comparePassword(password, user.password);
		if (!match) return res.status(400).send('Wrong password');

		const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
			expiresIn: '7d',
		});
		user.password = undefined;
		res.cookie('token', token, {
			httpOnly: true,
			sameSite: 'None',
			secure: true,
		});
		res.json(user);
	} catch (err) {
		console.log(err);
		return res.status(400).send('Error. Try again.');
	}
};

const signup = async (req, res) => {
	try {
		const { email, password, username } = req.body;
		if (!password || password.length < 8)
			return res.status(400).send('Password is required and should be min 8 characters long');
		if (!username) {
			return res.status(400).send('Username must be valid');
		}
		if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			return res.status(400).send('Email must be valid');
		}
		let userExist = await User.findOne({ email }).exec();
		if (userExist) return res.status(400).send('Email is taken');
		const hashedPassword = await hashPassword(password);
		const user = new User({
			email,
			username,
			password: hashedPassword,
		});
		await user.save();
		console.log('saved user', user);
		return res.json({ ok: true });
	} catch (err) {
		console.log(err);
		return res.status(400).send('Error. Sign up failed.');
	}
};

const logout = async (req, res) => {
	try {
		res.clearCookie('token');
		return res.json({ ok: true });
	} catch (err) {
		console.log(err);
	}
};

const currentUser = async (req, res) => {
	try {
		await User.findById(req.auth._id).select('-password').exec();
		return res.json({ ok: true });
	} catch (err) {
		return res.sendStatus(400).send('Error happened when getting current user.');
	}
};

module.exports = {
	login,
	signup,
	logout,
	currentUser,
};
