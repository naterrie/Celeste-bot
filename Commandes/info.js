const Discord = require("discord.js")

module.exports = {

    name: "info",
    description: "Give information about the bot",
    permissions: "Aucune",
    dm: true,

    async run(bot, interaction) {
        await interaction.reply({ content: `Bonjour je suis ${client.user.username} \nJe suis un bot développé par ${bot.users.cache.get(bot.ownerID)}`, ephemeral: false}) 
    }
}