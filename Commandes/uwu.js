const Discord = require("discord.js")

module.exports = {

    name: "uwu",
    name: "uwu",
    description: "Répond uwu",
    permissions: Discord.PermissionFlagsBits.AttachFiles,
    dm: false,

    async run(bot, interaction) {
        await interaction.reply({content: `https://cdn.discordapp.com/attachments/840389339984822307/1073399517648527470/uwu.jpg`, ehemeral: false}) 
    }
}