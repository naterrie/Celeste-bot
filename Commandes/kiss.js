const Discord = require("discord.js")

module.exports = {

    name: "kiss",
    description: "kiss someone",
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
        await message.reply(`You've kissed someone`) 
    }
}