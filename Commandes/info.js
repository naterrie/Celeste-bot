const { EmbedBuilder } = require('discord.js')

module.exports = {

    name: "info",
    description: "Give information about the bot",
    permissions: "Aucune",
    dm: true,

    async run(bot, interaction) {

        const embed = new EmbedBuilder()
			.setColor(0xCA335c)
            .setTitle(`titre`)
            .setDescription(`<@${bot.user.id}>`)
            .setThumbnail(bot.user.displayAvatarURL())

            await interaction.reply({embeds: [embed]})
    }
}