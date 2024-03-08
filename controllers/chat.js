const OpenAI = require('openai');
const { Chat } = require('../models/chat');
const { Chats } = require('../models/chats');

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

const gptResponse = async (req, res) => {
	try {
		const { message, chatsId, userId, name } = req.body;
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
		const gptMsg = getResponse.choices[0].message.content;
		const chats = await Chats.findOne({ chats: chatsId }).exec();
		if (!chats) {
			const newChats = new Chats({
				userId,
				chatsContent: [],
				name,
			});
			const savedChats = await newChats.save();

			const newChat = new Chat({
				chatsId: newChats._id,
				userMsg: message,
				gptMsg,
			});
			const savedChat = await newChat.save();

			savedChats.chatsContent.push(savedChat);
			await savedChats.save();
		} else {
			const newChat = new Chat({
				chatsId,
				userMsg: message,
				gptMsg,
			});
			const savedChat = await newChat.save();
			chats.chatsContent.push(savedChat);
			await chats.save();
		}

		return res.json(gptMsg);
	} catch (err) {
		console.log(err);
		return res
			.status(400)
			.send('Error when getting response from GPT-3.5-turbo. Check controller/chat.js file.');
	}
};

const chats = async (req, res) => {
	const userId = req.auth._id;
	try {
		const chatsRecords = await Chats.find({
			userId,
		}).exec();
		return res.json(chatsRecords);
	} catch (err) {
		return res.status(400).send('Error when getting chats, check chats.js in controller');
	}
};

module.exports = { gptResponse, chats };
