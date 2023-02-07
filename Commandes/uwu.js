const Discord = require("discord.js")

module.exports = {

    name: "uwu",
    name: "uwu",
    description: "Répond uwu",
    permissions: "Aucune",
    dm: false,
    options: [
        {
            type: "user",
            name: "membre",
            description: "user to kiss",
            required: true
        }
    ],

    
    async run(bot, message) {
        await message.reply(`kissed`) 
    }
}