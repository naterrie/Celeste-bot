const Discord = require("discord.js")

module.exports = {

    name: "owo",
    description: "Répond owo",
    permissions: "Aucune",
    dm: true,
    category: "Fun",

    async run(bot, interaction ) {
        await interaction.reply({content : "OWO"})
        console.log(interaction.user)
    }
}
