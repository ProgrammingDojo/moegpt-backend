const mongoose = require('mongoose');
const { Schema } = mongoose;

const chatSchema = new Schema(
	{
		chatsId: {
			type: Schema.Types.ObjectId,
			ref: 'Chats',
		},
		userMsg: {
			type: String,
			trim: true,
			required: true,
		},
		gptMsg: {
			type: String,
			trim: true,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = {
	Chat: mongoose.model('Chat', chatSchema),
	chatSchema,
};
