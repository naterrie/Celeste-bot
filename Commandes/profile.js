const { EmbedBuilder } = require('discord.js')

module.exports = {

    name: "profile",
    description: "in dev",
    permissions: "Aucune",
    dm: true,

    async run(bot, interaction) {

        const embed = new EmbedBuilder()
			.setColor(0xCA335c)
            .setTitle(`What about you ?`)
            .setDescription(`<@${interaction.user.id}>`)
            .setThumbnail(interaction.user.displayAvatarURL())

            await interaction.reply({embeds: [embed]})
    }
}