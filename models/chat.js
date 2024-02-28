const mongoose = require('mongoose');
const { Schema } = mongoose;

const chatSchema = new Schema(
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
module.exports = mongoose.model('Chat', chatSchema);
exports.chatSchema = chatSchema;
