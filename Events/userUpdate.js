const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const Discord = require("discord.js")

module.exports = async (bot, oldUser, newUser) => {

    const channel = bot.channels.cache.get('1084644193592422471');

    const embed = new EmbedBuilder()
    .setColor(0xCA335c)
    .setTitle(`An user change !`)
    .addFields(
        { name: "Old username", value : `${oldUser.username}`, inline: true },
        { name: "New username", value : `${newUser.username}`, inline: true},
        { name: "Old tag", value : `#${oldUser.discriminator}`, inline: true },
        { name: "New tag", value : `#${newUser.discriminator}`, inline: true },
        { name: "New Avatar", value : ` `},
    )
    .setImage(newUser.displayAvatarURL())
    channel.send({embeds: [embed]})
}
