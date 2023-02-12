const Discord = require("discord.js")

module.exports = {

    name: "owo",
    name: "owo",
    description: "Répond owo",
    permissions: "Aucune",
    dm: false,

    async run(bot, interaction) {
        await interaction.reply({ content: `OwO`, ephemeral: true }); 
    }
}
