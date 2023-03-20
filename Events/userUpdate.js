const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const Discord = require("discord.js")

module.exports = async (bot, oldUser, newUser) => {

    const channel = bot.channels.cache.get('1084644193592422471');

    const embed = new EmbedBuilder()
    .setColor(0xCA335c)
    .setTitle(`An user change !`)
    .addFields(
        { name: "Username", value : `${oldUser.username} -> ${newUser.username}`},
        { name: "Tag", value : `#${oldUser.discriminator} -> #${newUser.discriminator}`},
        { name: "Avatar", value : ` `},
    )
    .setImage(newUser.displayAvatarURL())
    channel.send({embeds: [embed]})
}
