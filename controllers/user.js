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

const upload = multer({ storage: storage });

const uploadsDir = path.resolve(__dirname, '..', 'uploads');
console.log(uploadsDir);
if (!fs.existsSync(uploadsDir)) {
	fs.mkdirSync(uploadsDir);
}

const uploadProfile = async (req, res) => {
	try {
		const imageData = req.body.image;
		const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
		const filename = `profile-${uuidv4()}.png`;
		fs.writeFile(path.join(uploadsDir, filename), base64Data, 'base64', (error) => {
			if (error) {
				return res.status(500).send({ message: 'Error saving the image', error });
			}
			res.send({ message: 'Image uploaded successfully', url: `/uploads/${filename}` });
		});
	} catch (err) {
		console.log('error happened when trying to upload profile image, Error Msg: ', err);
	}
};

module.exports = { uploadProfile };
