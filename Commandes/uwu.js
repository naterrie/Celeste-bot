const { EmbedBuilder, AttachmentBuilder } = require('discord.js');

module.exports = {

    name: "uwu",
    description: "Répond uwu",
    permissions: "Aucune",
    dm: true,
    category: "Fun",

    async run(bot, interaction) {

    const file = new AttachmentBuilder('./other/uwu.jpg')

    const embed = new EmbedBuilder()
        .setColor(0xCA335c)
        .setImage('attachment://uwu.jpg')

    await interaction.reply({embeds: [embed], files: [file] }) 
    }

}