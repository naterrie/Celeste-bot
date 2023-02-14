const { EmbedBuilder, AttachmentBuilder } = require('discord.js');

module.exports = {

    name: "uwu",
    description: "Répond uwu",
    permissions: "Aucune",
    dm: false,
    category: "Fun",

    async run(bot, interaction, args) {

    const file = new AttachmentBuilder('./other/uwu.jpg')

    const embed = new EmbedBuilder()
        .setColor(0xCA335c)
        .setImage('attachment://uwu.jpg')

    await interaction.reply({embeds: [embed], files: [file] }) 
    }

}