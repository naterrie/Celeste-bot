const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const Discord = require("discord.js")
const  { REST } = require("@discordjs/rest")
const { Routes } = require("discord.js");

module.exports = async (bot, oldMessage, newMessage, channel) => {

    const channels = bot.channels.cache.get('1085602452755185734');

    if (oldMessage.content === newMessage.content)
        return;

	const embed = new EmbedBuilder()
    .setColor(0xCA335c)
    .setTitle(`Message edited`)
    .addFields(
        { name: "Send by :", value : `${newMessage.author.username}#${newMessage.author.discriminator}`, inline: true },
        { name: "link to the message :", value : `https://discordapp.com/channels/${oldMessage.guildId}/${oldMessage.channelId}/${oldMessage.id}`, inline: true },
        { name: "Old content :", value : `${oldMessage.content}`},
		{ name: "New content :", value : `${newMessage.content}`},
		)
    channels.send({embeds: [embed]}
        )
}
