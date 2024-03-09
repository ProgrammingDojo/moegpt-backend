const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const { chatSchema } = require('./chat.js');

const chatsSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		name: {
			type: String,
			trim: true,
			required: true,
			max: 32,
		},
		chatsContent: {
			type: [chatSchema],
			default: [],
		},
	},
	{ timestamps: true }
);

module.exports = {
	Chats: mongoose.model('Chats', chatsSchema),
	chatsSchema,
};
