import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema(
	{
		username: {
			type: String,
			trim: true,
			required: true,
		},
		email: {
			type: String,
			trim: true,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			min: 6,
			max: 32,
		},
		avatar: {
			type: String,
			default: '/avatar.png',
		},
		role: {
			type: [String],
			default: ['Subscriber'],
			enum: ['Subscriber', 'Paid', 'Admin'],
		},
		passwordResetCode: {
			data: String,
			default: '',
		},
	},
	{ timestamps: true }
);

export default mongoose.model('User', userSchema);
