const Discord = require("discord.js")

module.exports = {

    name: "uwu",
    name: "uwu",
    description: "Répond uwu",
    permissions: Discord.PermissionFlagsBits.AttachFiles,
    dm: false,

    async run(bot, message) {
        await message.reply(`https://cdn.discordapp.com/attachments/840389339984822307/1073399517648527470/uwu.jpg`) 
    }
}