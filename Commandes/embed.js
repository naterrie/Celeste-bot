const { EmbedBuilder } = require('discord.js')

module.exports = {

    name: "embed",
    description: "Show an embed",
    permissions: "Aucune",
    dm: false,

    async run(bot, interaction) {

            const embed = new EmbedBuilder()
			.setColor(0xCA335c)
			.setTitle('Embed test')
			.setURL('https://discord.js.org')
			.setDescription('I\'m testing the embed')

        await interaction.reply({ embeds: [embed]})
    }
}