const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const csrf = require('csurf');
require('dotenv').config();
const morgan = require('morgan');
const router = require('./routes/index');

const app = express();
const csrfProtection = csrf({ cookie: true });
mongoose.set('strictQuery', false);
mongoose
	.connect(process.env.DATABASE, {})
	.then(() => {
		console.log('DB connected');
	})
	.catch((err) => {
		console.log('DB CONNECTION ERROR', err);
	});

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(morgan('dev'));
app.use(cookieParser());
app.use('/api', router);
app.use(csrfProtection);
app.get('/api/csrf-token', (req, res) => {
	res.json({ csrfToken: req.csrfToken() });
});
const port = process.env.PORT || 5555;

app.listen(port, () => {
	console.log(`app listening at http://localhost:${port}`);
});
