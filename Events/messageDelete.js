const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const Discord = require("discord.js")
const  { REST } = require("@discordjs/rest")
const { Routes } = require("discord.js");

module.exports = async (bot, message) => {
    const channel = bot.channels.cache.get('1084914127258005574');

    if (message.author.bot === true || message.type === 6 || message.channelId === "461606547064356864")
        return
    try
    {
        let link = message.attachments.first().url
        channel.send(`**Message with an attachment deleted** !\n__Send in__ : ${message.guild.name}\n__Channel__ : ${message.channel.name}\n__Send by__${message.author.username}#${message.author.discriminator}\n__Content__ : ${message.content}\n__Attachments__ : ${link}`)
    } catch (err)
    {
        const embed = new EmbedBuilder()
        .setColor(0xCA335c)
        .setTitle(`Message delete`)
        .addFields(
        { name: "Send by :", value : `${message.author.username}#${message.author.discriminator}`, inline: true },
        { name: "Server :", value : `${message.guild.name}`, inline: true },
        { name: "Channel :", value : `${message.channel.name}`, inline: true },
        { name: "content :", value : `${message.content}`},
        )
        channel.send({embeds: [embed]})
    }
}
