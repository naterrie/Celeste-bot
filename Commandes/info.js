const { EmbedBuilder } = require('discord.js')

module.exports = {

    name: "info",
    description: "in dev",
    permissions: "Aucune",
    dm: true,

    async run(bot, interaction) {

        const embed = new EmbedBuilder()
			.setColor(0xCA335c)
            .setTitle(`What about me ?`)
            .setDescription(`<@${bot.user.id}>`)
            .setThumbnail(bot.user.displayAvatarURL())
            .addFields({ name: 'Who i am ?', value: `Hi, i am ${bot.user.username} just a simple bot developped by <@${bot.ownerID}>`})
            .addFields(
                { name: "Ping", value: `My ping is : ${bot.ws.ping}`},
                { name: "Creation date", value: `${bot.user.createdAt}`}
            )
            .setTimestamp()

            await interaction.reply({embeds: [embed]})
    }
}