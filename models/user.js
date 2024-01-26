import mongoose from 'mongoose';
const { Schema } = mongoose;
import { chatSchema } from './chat.js';

const userSchema = new Schema(
	{
		username: {
			type: String,
			trim: true,
			required: false,
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
			min: 8,
			max: 32,
		},
		avatar: {
			type: String,
			default: '',
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
		chatRecords: {
			type: Array,
			default: [chatSchema],
		},
	},
	{ timestamps: true }
);

export default mongoose.model('User', userSchema);
