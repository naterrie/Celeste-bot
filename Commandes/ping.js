const Discord = require("discord.js")

module.exports = {

    name: "ping",
    description: "Affiche la latence",
    permissions: "Aucune",
    dm: true,

    async run(bot, message) {
        await message.reply(`Pong : ${bot.ws.ping} :ping_pong: `) 
    }
}