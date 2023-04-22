const Discord = require("discord.js");
const { EmbedBuilder } = require('discord.js');

module.exports = {

	name: "sendmsg",
    description: "Send a message with the bot",
    permissions: "Aucune",
    dm: false,
    category: "useless",
	options: [
        {
			type: "string",
			name: "message",
			description: "the message to send",
			required: true
        }
    ],

	async run(bot, interaction, args)
	{
		const channelmessage = bot.channels.cache.get(interaction.channelId);
		const channellog = bot.channels.cache.get('1099131492128526376');
		let message = interaction.options.getString("message");

		const embed = new EmbedBuilder()
			.setColor(0xCA335c)
			.setTitle(`Message envoyé par le bot !`)
			.addFields(
				{ name: "User", value : `${interaction.user.username}#${interaction.user.discriminator}`, inline: true },
				{ name : "Guild", value : `${interaction.guild.name}`, inline : true },
				{ name : "Channel", value : `<#${interaction.channelId}>`, inline : true },
				{ name: "Contenu", value : `${message}`},
					)
			.setTimestamp();
		interaction.reply({content :"Message envoyé !", ephemeral : true});
		channelmessage.send(`${message}`);
		channellog.send({embeds: [embed]});
	}
};
