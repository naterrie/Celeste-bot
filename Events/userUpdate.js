const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const Discord = require("discord.js")

module.exports = async (bot, oldUser, newUser) => {

    const channel = bot.channels.cache.get('1084644193592422471');

    if (oldUser.avatar !== newUser.avatar)
    {
        const embed = new EmbedBuilder()
        .setColor(0xCA335c)
        .setTitle(`An user change his avatar!`)
        .addFields(
            { name: "Avatar", value : ` `},
        )
        .setImage(newUser.displayAvatarURL())
        channel.send({embeds: [embed]})
    }
    else if (oldUser.username !== newUser.username || oldUser.discriminator !== newUser.discriminator)
    {
        const embed = new EmbedBuilder()
        .setColor(0xCA335c)
        .setTitle(`An user change his username or tag !`)
        .setThumbnail(newUser.displayAvatarURL())
        .addFields(
            { name: "Username", value : `${oldUser.username} -> ${newUser.username}`},
            { name: "Tag", value : `#${oldUser.discriminator} -> #${newUser.discriminator}`},
        )
        channel.send({embeds: [embed]})
    }
    else
        return;
}
