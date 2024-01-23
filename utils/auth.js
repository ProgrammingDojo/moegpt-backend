import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
	try {
		const salt = await bcrypt.genSalt(12);
		return await bcrypt.hash(password, salt);
	} catch (error) {
		console.log('Error happened when hash password ' + error);
	}
};

export const comparePassword = async (password, hashed) => {
	try {
		return await bcrypt.compare(password, hashed);
	} catch (error) {
		console.log(error);
	}
};
