const { EmbedBuilder } = require('discord.js')

module.exports = {

    name: "botinfo",
    description: "Give information about the bot",
    permissions: "Aucune",
    dm: true,
    category: "Usefull",

    async run(bot, interaction) {

        const embed = new EmbedBuilder()
			.setColor(0xCA335c)
            .setTitle(`What about me ?`)
            .setDescription(`<@${bot.user.id}>`)
            .setThumbnail(bot.user.displayAvatarURL())
            .addFields(
                { name: 'Who i am ?', value: `Hi, i am ${bot.user.username} just a simple bot developped by <@${bot.ownerID}>`, inline: true },
                { name: "Ping", value: `My ping is : ${bot.ws.ping}`, inline: true },
                { name: "Creation date", value: `${bot.user.createdAt}`, inline: true },
            )
            .setTimestamp()
            await interaction.reply({embeds: [embed]})
    }
}