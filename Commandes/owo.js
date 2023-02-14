const Discord = require("discord.js")

module.exports = {

    name: "owo",
    description: "Répond owo",
    permissions: "Aucune",
    dm: false,
    category: "Fun",

    async run(bot, message ) {
        await message.reply("OWO"); 
    }
}
