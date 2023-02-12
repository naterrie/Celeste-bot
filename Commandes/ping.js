const Discord = require("discord.js")

module.exports = {

    name: "ping",
    description: "Affiche la latence",
    permissions: "Aucune",
    dm: true,

    async run(bot, interaction) {
        await interaction.reply({ content: `Pong : ${bot.ws.ping} :ping_pong: `, ephemeral: true }); 
    }
}