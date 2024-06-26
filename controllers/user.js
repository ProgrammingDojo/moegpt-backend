const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/');
	},
	filename: function (req, file, cb) {
		cb(null, uuidv4() + '-' + file.fieldname + path.extname(file.originalname));
	},
});

multer({ storage: storage });

const uploadsDir = path.resolve(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
	fs.mkdirSync(uploadsDir);
}

const uploadAvatar = async (req, res) => {
	try {
		const { email } = req.body;
		if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			return res.status(400).send('Email must be valid');
		}
		let user = await User.findOne({ email }).exec();
		if (!user) return res.status(404).send('User does not exist');
		const imageData = req.body.image;
		const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
		const filename = `avatar-${uuidv4()}.png`;
		fs.writeFile(path.join(uploadsDir, filename), base64Data, 'base64', async (error) => {
			if (error) {
				return res.status(500).send({ message: 'Error saving the image', error });
			}
			const port = process.env.PORT || 5555;
			const pathImg = `http://localhost:${port}/uploads/${filename}`;
			if (user.avatar) {
				fs.unlink(path.join(uploadsDir, user.avatar.split('uploads/')[1]), (err) => {
					if (err) {
						return res
							.status(500)
							.send({ message: 'Error deleting the previous image', err });
					}
				});
			}
			user.avatar = pathImg;
			await user.save();
			res.json({ avatar: pathImg });
		});
	} catch (err) {
		console.log('error happened when trying to upload avatar image, Error Msg: ', err);
	}
};

module.exports = { uploadAvatar };
