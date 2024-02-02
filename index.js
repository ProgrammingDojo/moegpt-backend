import express from 'express';
import cookieParser from 'cookie-parser';
import { readdirSync } from 'fs';
import cors from 'cors';
import moogoose from 'mongoose';

require('dotenv').config();
const morgan = require('morgan');
const app = express();
moogoose
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

readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)));

const port = process.env.PORT || 5555;

app.listen(port, () => {
	console.log(`app listening at http://localhost:${port}`);
});
