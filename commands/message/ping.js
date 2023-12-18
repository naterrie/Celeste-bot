const { EmbedBuilder } = require('discord.js');

module.exports = {
	async run(bot, interaction)
	{
		  interaction.reply({content : `Ping : ${bot.ws.ping}ms`});
	}
};
