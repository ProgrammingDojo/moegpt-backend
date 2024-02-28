const { expressjwt } = require('express-jwt');

const requireSignin = expressjwt({
	getToken: (req) => req.cookies.token,
	secret: process.env.JWT_SECRET,
	algorithms: ['HS256'],
});

module.exports = { requireSignin };
