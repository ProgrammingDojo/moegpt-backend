const OpenAI = require('openai');

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

const gptResponse = async (req, res) => {
	try {
		const { message } = req.body;
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

		return res.json(getResponse.choices[0].message.content);
	} catch (err) {
		console.log(err);
		return res.status(400).send('Error. Try again.');
	}
};

module.exports = { gptResponse };
