const OpenAI = require('openai');
const { Chat } = require('../models/chat');
const { Chats } = require('../models/chats');

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

const createNewTopic = async (req, res) => {
	try {
		const { message, userId } = req.body;
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
		const newTopic = new Chats({
			userId,
			chatsContent: [],
			name: message.slice(0, 30),
		});
		const savedTopic = await newTopic.save();
		const newChat = new Chat({
			chatsId: savedTopic._id,
			userMsg: message,
			gptMsg,
		});
		const savedChat = await newChat.save();
		savedTopic.chatsContent.push(savedChat);
		await savedTopic.save();
		return res.json({ id: savedTopic._id });
	} catch (err) {
		console.log(err);
		return res
			.status(400)
			.send('Error when getting response from GPT-3.5-turbo. Check controller/chat.js file.');
	}
};

const addNewChat = async (req, res) => {
	try {
		const { message, chatsId } = req.body;
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
		const topic = await Chats.findOne({ _id: chatsId }).exec();
		const newChat = new Chat({
			chatsId,
			userMsg: message,
			gptMsg,
		});
		const savedChat = await newChat.save();
		topic.chatsContent.push(savedChat);
		const savedTopic = await topic.save();
		return res.json(savedTopic);
	} catch (err) {
		console.log(err);
		return res
			.status(400)
			.send('Error when getting response from GPT-3.5-turbo. Check controller/chat.js file.');
	}
};

const getAllChats = async (req, res) => {
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

const getTopic = async (req, res) => {
	const chatsId = req.params.id;
	try {
		const chats = await Chats.findOne({ _id: chatsId }).exec();
		return res.json(chats);
	} catch (err) {
		return res.status(400).send('Error when getting topic, check chats.js in controller');
	}
};

module.exports = { createNewTopic, getAllChats, getTopic, addNewChat };
