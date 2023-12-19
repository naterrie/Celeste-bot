const Discord = require("discord.js");

module.exports = async (bot, message) => {
	let content = message.content;
	const prefix = ";";

	if (message.author.bot)
		return;

	if (content.startsWith(prefix)) {
		content = content.slice(prefix.length).trim();
		let commandFile = (`../commands/message/${content}.js`);

		try {
			let command = require(commandFile);
			await command.run(bot, message);
		} catch (error) {
			return ;
		}
	}
};
