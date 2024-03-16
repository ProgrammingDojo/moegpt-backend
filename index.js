const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const router = require('./routes/index');
const path = require('path');

const app = express();
mongoose.set('strictQuery', false);
mongoose
	.connect(process.env.DATABASE, {})
	.then(() => {
		console.log('DB connected');
	})
	.catch((err) => {
		console.log('DB CONNECTION ERROR', err);
	});

app.use(bodyParser.json({ limit: '25mb' }));
app.use(bodyParser.urlencoded({ limit: '25mb', extended: true }));
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(morgan('dev'));
app.use(cookieParser());
app.use('/api', router);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const port = process.env.PORT || 5555;

app.listen(port, () => {
	console.log(`app listening at Port: ${port}`);
});
