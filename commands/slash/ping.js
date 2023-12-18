const { EmbedBuilder } = require('discord.js');

module.exports = {

	name: "ping",
	description: "Give the ping",
	permissions: "Aucune",
	dm: true,
	category: "Usefull",


	async run(bot, interaction)
	{
		interaction.reply({content : `Ping : ${bot.ws.ping}ms`});
	}
};
