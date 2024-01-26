import mongoose from 'mongoose';
const { Schema } = mongoose;

export const chatSchema = new Schema(
	{
		userMsg: {
			type: String,
			require: true,
		},
		gptMsg: {
			type: String,
			require: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.model('Chat', chatSchema);
