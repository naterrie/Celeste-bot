const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const Discord = require("discord.js");
const  { REST } = require("@discordjs/rest");
const { Routes } = require("discord.js");

module.exports = async (bot, messages, channel) => {
    const channels = bot.channels.cache.get('1084914127258005574');

    if (messages.first().type === 6)
        return;
    try
    {
        let message = messages.first().content;
        const embed = new EmbedBuilder()
            .setColor(0xCA335c)
            .setTitle(`Message delete`)
            .addFields(
                { name: "Server", value : `${channel.guild.name}`, inline: true },
                { name: "Channel", value : `${channel.name}`, inline: true },
                { name: "Author", value : `${messages.first().author.username}#${messages.first().author.discriminator}`, inline: true },
                { name: "content :", value : `${message}`},
            );
        channels.send({embeds: [embed]});
    }
    catch (error)
    {
        return;
    }
};
