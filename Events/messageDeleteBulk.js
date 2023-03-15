const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const Discord = require("discord.js")

module.exports = async (bot, messages, channel) => {

    const channels = bot.channels.cache.get('1084914127258005574');
    console.log(`${messages}`)

    const embed = new EmbedBuilder()
    .setColor(0xCA335c)
    .setTitle(`Message delete`)
    .addFields(
        { name: "Send in", value : `${channel.guild.name}`, inline: true },
        { name: "content :", value : `${messages}`},
    )
    channels.send({embeds: [embed]})
}
