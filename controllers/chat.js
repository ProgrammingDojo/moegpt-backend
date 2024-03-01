const OpenAI = require('openai');
const { Chat } = require('../models/chat');
const { Chats } = require('../models/chats');
const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

const gptResponse = async (req, res) => {
	try {
		const { message, chatsId, userId } = req.body;
		console.log(req.body);
		const getResponse = await openai.chat.completions.create({
			model: 'gpt-3.5-turbo',
			messages: [
				{
					role: 'system',
					content: 'You are a helpful assistant.',
				},
				{
					role: 'user',
					content: message,
				},
			],
		});
		const chats = await Chats.findOne({ chats: chatsId }).exec();
		if (!chats) {
			const newChats = new Chats({
				userId,
				chatsContent: [],
				name: message.slice(0, 15),
			});
			await newChats.save();

			const newChat = new Chat({
				chatsId: newChats._id,
				userMsg: message,
				gptMsg: getResponse.choices[0].message.content,
			});
			await newChat.save();

			newChats.chatsContent.push(newChat);
			await newChats.save();
		} else {
			const newChat = new Chat({
				chatsId,
				userMsg: message,
				gptMsg: getResponse.choices[0].message.content,
			});
			await newChat.save();
			chats.chatsContent.push(newChat);
			await chats.save();
		}

		return res.json(getResponse.choices[0].message.content);
	} catch (err) {
		console.log(err);
		return res
			.status(400)
			.send('Error when getting response from GPT-3.5-turbo. Check controller/chat.js file.');
	}
};

module.exports = { gptResponse };
