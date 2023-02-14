const Discord = require("discord.js")
const loadSlashCommands = require("../Loaders/loadSlashCommands")

module.exports = async bot => {

    await loadSlashCommands(bot)
    console.log(`Tout marche, ${bot.user.tag} online !`)
} 